import { IPaymentCallbackData } from "@/@types/yookassa";
import { SuccessPaymentForOrder } from "@/components/shared";
import { CanceledPaymentForOrder } from "@/components/shared/email-templates";
import { sendEmail } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { TCartItemDTO } from "@/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as IPaymentCallbackData;

        if (!data) {
            return NextResponse.json({ error: 'Data not found' }, { status: 404 });
        }

        console.log('[REQUEST POST DATA]: ', data);

        const order = await prisma.order.findFirst(
            {
                where: {
                    id: Number(data.object.metadata.order_id),
                },
            }
        );

        //console.log('[CHECKOUT CALLBACK POST] Order: ', order);

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const isSucceeded = data.object.status === 'succeeded';

        console.log({isSucceeded});

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
            // Письмо об успешной оплате
            await sendEmail(
                order.email, 
                `Super Pizza / Ваш заказ #${order.id} успешно оплачен ✅`,
                SuccessPaymentForOrder({ 
                    orderId: order.id, 
                    totalAmount: order.totalAmount, 
                    cartItems, 
                })
            );
        } else {
            // Письмо об отмены оплаты
            await sendEmail(
                order.email, 
                `Super Pizza / Ваш заказ #${order.id} отменён ❌`, 
                CanceledPaymentForOrder({ 
                    orderId: order.id, 
                    totalAmount: order.totalAmount, 
                })
            );
        }
        
        return NextResponse.json({ ok: true });

    } catch (error) {
        console.log('[CHECKOUT CALLBACK POST] Error: ', error);
        return NextResponse.json({ error: 'CHECKOUT CALLBACK POST' }, { status: 500 });
    }
}