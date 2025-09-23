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

/* 

{
  "id": 1,
  "userId": 1,
  "token": "111111",
  "totalAmount": 0,
  "createdAt": "2025-07-21T09:21:48.642Z",
  "updatedAt": "2025-07-21T09:21:48.642Z",
  "cartProductVariations": [
    {
      "id": 1,
      "cartId": 1,
      "productVariationId": 1,
      "quantity": 2,
      "createdAt": "2025-07-21T09:21:48.647Z",
      "updatedAt": "2025-07-21T09:21:48.647Z",
      "productVariation": {
        "id": 1,
        "price": 388,
        "size": 20,
        "pizzaType": 1,
        "productId": 18,
        "product": {
          "id": 18,
          "name": "Пепперони фреш",
          "imageUrl": "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
          "categoryId": 1,
          "createdAt": "2025-07-21T09:21:48.606Z",
          "updatedAt": "2025-07-21T09:21:48.606Z"
        }
      },
      "ingredients": [
        {
          "id": 1,
          "name": "Сырный бортик",
          "price": 179,
          "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
          "createdAt": "2025-07-21T09:21:48.592Z",
          "updatedAt": "2025-07-21T09:21:48.592Z"
        },
        {
          "id": 2,
          "name": "Сливочная моцарелла",
          "price": 79,
          "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
          "createdAt": "2025-07-21T09:21:48.592Z",
          "updatedAt": "2025-07-21T09:21:48.592Z"
        },
        {
          "id": 3,
          "name": "Сыры чеддер и пармезан",
          "price": 79,
          "imageUrl": "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
          "createdAt": "2025-07-21T09:21:48.592Z",
          "updatedAt": "2025-07-21T09:21:48.592Z"
        }
      ]
    }
  ]
}

*/