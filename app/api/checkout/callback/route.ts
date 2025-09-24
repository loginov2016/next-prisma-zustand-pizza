import { IPaymentCallbackData } from "@/@types/yookassa";
import { SuccessPaymentForOrder } from "@/components/shared";
import { sendEmail } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { TCartItemDTO } from "@/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as IPaymentCallbackData;

        const order = await prisma.order.findFirst(
            {
                where: {
                    id: +data.object.metadata.order_id,
                },
            }
        );

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const isSucceeded = data.object.status === 'succeeded';

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status:  isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
            },
        });

        const cartItems = JSON.parse(order?.listProductsCart as unknown as string) as TCartItemDTO[];

        if (isSucceeded) {
            await sendEmail(
                order.email, 
                'Super Pizza / Ваш заказ успешно оплачен', 
                SuccessPaymentForOrder({ 
                    orderId: order.id, 
                    totalAmount: order.totalAmount, 
                    cartItems, 
                })
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log('[CHECKOUT CALLBACK POST] Error: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}