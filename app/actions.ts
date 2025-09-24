'use server';

import { PendingPaymentForOrder, TCheckoutFormSchema } from "@/components/shared";
import { createPayment } from "@/lib";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";


export async function createOrder(data: TCheckoutFormSchema ) {
    console.log(data);

   try {
        const cookieStore = cookies();
        const cartToken = (await cookieStore).get('cartToken')?.value;

        // Если токен корзины не нашлся, то возвращаем ошибку.
        if (!cartToken) {
            throw new Error('Cart token not found');
        }
        // Поиск корзины по токену.
        const userCart = await prisma.cart.findFirst({
            where: {
                token: cartToken,
            },
            include: {
                user: true,
                cartProductVariations: {
                    include: {
                        productVariation: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    },
                },
            },

        });
        // Если корзина не нашлась, то возвращаем ошибку.
        if (!userCart) {
            throw new Error('Cart not found');
        }
        // Если корзина пуста, то возвращаем ошибку.
        if ( userCart?.totalAmount === 0 ) {
            throw new Error('Cart is empty');
        }
        // Создание заказа.
        const order = await prisma.order.create({
                data: {
                    token: cartToken,
                    fullName: data.firstName + ' ' + data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    comment: data.comment,
                    totalAmount: userCart.totalAmount,
                    status: OrderStatus.PENDING,
                    listProductsCart: JSON.stringify(userCart.cartProductVariations),
                }
        });
        // Обнуление суммы заказа корзины пользователя по id корзины.
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            }
        });
        // Удаление всех продуктов из корзины пользователя.
        await prisma.cartProductVariation.deleteMany({
            where: {
                cartId: userCart.id,
            }
        });
        // Возвращаем ссылку на страницу оплаты.
        
        //console.log(data.email);

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата Заказ #' + order.id,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            }
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;
        console.log(paymentUrl);

        await sendEmail(data.email, 'Super Pizza / Оплатите заказ #' + order.id, PendingPaymentForOrder({ 
            orderId: order.id, 
            totalAmount: order.totalAmount,
            paymentUrl,
            })
        );    

        return paymentUrl;

   } catch (error) {
        console.log('[Created order] Server Error', error);
        //throw new Error('[Created order] Server Error');
        return null;
   }
}