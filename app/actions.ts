'use server';

import { PaymentForOrderTemplate, TCheckoutFormSchema } from "@/components/shared";
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
        // Обнуление суммы заказа корзины пользователя по id.
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
        
        console.log(data.email);

        await sendEmail(data.email, 'Super Pizza / Оплатите заказ #' + order.id, PaymentForOrderTemplate({ 
            orderId: order.id, 
            totalAmount: order.totalAmount,
            paymentUrl: 'https://resend.com/docs/send-with-nextjs',
            })
        );    

        return `http://localhost:3000/checkout/${cartToken}`;

   } catch (error) {
        console.log('[Created order] Server Error', error);
        return null;
   }
}