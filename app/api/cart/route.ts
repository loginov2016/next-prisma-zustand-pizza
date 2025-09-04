import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

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
        console.log(error);
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