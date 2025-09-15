import { updateCartTotalAmount } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = ( await req.json() ) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
        return NextResponse.json({error: 'Cart token not found'});
    }
    // Поиск товара в корзине по id.
    const cartItem = await prisma.cartProductVariation.findFirst({
        where: {
            id: Number(id),
        }
    });
    // Если поиск не удался, возвращаем ошибку.
    if (!cartItem) {
        return NextResponse.json({error: 'Cart item not found'});
    }

    // Здесь функция будет дожидаться выполнения асинхронной функции.
    await prisma.cartProductVariation.update({
        where: {
            id: Number(id),
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({error: 'Cart token not found'});
        }

        const cartItem = await prisma.cartProductVariation.findFirst({
            where: {
                id: Number(id),
            }
        });

        // Если поиск не удался, возвращаем ошибку.
        if (!cartItem) {
            return NextResponse.json({error: 'Cart item not found'});
        }
        // Функция DELETE дожидается удаления корзины по id.
        await prisma.cartProductVariation.delete({
            where: {
                id: Number(id),
            },
        });

        // После удаления корзины, нужно будет обновить информацию о корзине
        const updateUserCart = await updateCartTotalAmount(token);
        // и вернуть информацию о состоянии корзины клиенту.
        return NextResponse.json(updateUserCart);

    } catch (error) {
        console.log('[CART DELETE] Server Error', error);
        return NextResponse.json({message: 'Не удалось удалить корзину'}, { status: 500 });
    }
}