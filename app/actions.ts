'use server';

import { PendingPaymentForOrder, TCheckoutFormSchema } from "@/components/shared";
import { VerificationUser } from "@/components/shared/email-templates";
import { authOptions } from "@/constants";
import { createPayment } from "@/lib";
import { getUserSession } from "@/lib/get-user-session";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import { getServerSession } from "next-auth";
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


export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if ( !currentUser ) {
            throw new Error('Пользователь не найден!');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });
        
    } catch (error) {
        console.error('[Update user info] Server Error', error);
        throw new Error('[Update user info] Server Error');
    }
}

export async function deleteUserInfo(currentPassword: string) {
    try {
        const currentUser = await getUserSession();

        if ( !currentUser ) {
            throw new Error('Пользователь не найден!');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        });

        if ( !findUser ) {
            throw new Error('Пользователь в Базе данных не найден!');
        }

        if ( !compareSync(currentPassword, findUser.password) ) {
            throw new Error('Неверный пароль!');
        }

        await prisma.user.delete({
            where: {
                id: Number(currentUser.id),
            },
        });
        
    } catch (error) {
        console.error('[Update user info] Server Error', error);
        throw new Error('[Delete user info] Server Error');
    }
}

export async function currentUserSession() {
    try {
        const currentUser = await getServerSession(authOptions);
        return currentUser;
    } catch (error) {
        console.error('[Current session] Server Error', error);
        throw new Error('[Current session] Server Error');
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        })

        if ( findUser ) {
            if ( !findUser.verified ) {
                throw new Error('Почта не подтвержена!');
            }

            throw new Error('Пользователь с такой почтой уже зарегистрирован!');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                userId: createdUser.id,
                code,
            },
        });

        await sendEmail(createdUser.email, 'Super Pizza / 📝 Подтвердение регистрации', VerificationUser({code}));

    } catch (error) {
        console.error('[Register user] Server Error', error);
        throw new Error('[Register user] Server Error');
    }
}