import { prisma } from "@/prisma/prisma-client";
import { getCartItemTotalPrice } from "./get-cart-item-total-price";


export const updateCartTotalAmount = async (token: string) => {
    // Найти корзину по токену пользователя.
    const userCart = await prisma.cart.findFirst({
            where: {
                token,
            },
            include: {
                cartProductVariations: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productVariation: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    }
                }
            }
        });

    // Проверка, если нет корзины.
    if (!userCart) {
        return;
    }

    // Общая стоимость всех товаров в корзине.
    const totalAmount = userCart?.cartProductVariations.reduce( (acc, item) => {
        // console.log('updateCartTotalAmount', { item })
        return acc + getCartItemTotalPrice(item);
    }, 0 );

    // Обновить корзину, и потом верни всё что есть в корзине.
    return await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount,
        },
        include: {
            cartProductVariations: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productVariation: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                }
            }
        }
    });
}