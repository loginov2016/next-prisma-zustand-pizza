import { updateCartTotalAmount } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id  = Number(params.id);
    const data = ( await req.json() ) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
        return NextResponse.json({error: 'Cart token not found'});
    }

    const cartItem = await prisma.cartProductVariation.findFirst({
        where: {
            id,
        }
    });

    if (!cartItem) {
        return NextResponse.json({error: 'Cart item not found'});
    }

    await prisma.cartProductVariation.update({
        where: {
            id,
        },
        data: {
            quantity: data.quantity
        },
    });

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);

  } catch (error) {
    console.log('[CART PATCH] Server Error', error);
    return NextResponse.json({message: 'Не удалось обновить корзину'}, { status: 500 });
  }
}