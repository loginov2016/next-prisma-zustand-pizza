import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart, updateCartTotalAmount } from "@/lib";
import { ICreateCartProductVariationValues } from "@/services/dto/cart.dto";

export async function GET(req: NextRequest) {

    try {
        //const userId = 1;
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({totalAmount: 0, cartItems: []});
        }
        
        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    }
                ]
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
        })

        return NextResponse.json(userCart);
    } catch (error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({message: 'Не удалось получить корзину!'}, {status: 500});
    }

}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;
    
    // Если токен в куках не найден, то он будет создан.
    if (!token) {
      token = crypto.randomUUID();
    }

    // В userCart в любом случае вернется корзина, или найденная в БД или вновь созданная
    const userCart = await findOrCreateCart(token);

    const data = ( await req.json() ) as ICreateCartProductVariationValues;

    // Поиск в корзине вариации продукта со всеми ингредиентами.
    const findCartItem = await prisma.cartProductVariation.findFirst({
      where: {
        cartId: userCart?.id,
        productVariationId: data.productVariationId,
        ingredients: { 
          every: {
            id: { 
              in: data.ingredients
            }
          } 
        }
      },
    });

    // Если продукт с нужными вариациями в корзине нашелся, то обновляем корзину с новым значением: quantity + 1
    if ( findCartItem ) {
      await prisma.cartProductVariation.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      });
    } else {
      await prisma.cartProductVariation.create({
        data: {
          cartId: userCart.id,
          productVariationId: data.productVariationId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        }
      });
    }

      // Теперь нужно обновить корзину - посчитав общую стоимость всех продуктов в корзине, и вернуть её.
      const updateUserCart = await updateCartTotalAmount(token);
      const response = NextResponse.json(updateUserCart);
      // Вшиваем в ответ токен корзины.
      response.cookies.set('cartToken', token);

      return response;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({message: 'Не удалось создать корзину!'}, {status: 500});
  }
}