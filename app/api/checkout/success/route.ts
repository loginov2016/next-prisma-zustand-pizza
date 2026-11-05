import { getUserOrder } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const order = await getUserOrder();
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        //console.log(order);
        return NextResponse.json(order);
    } catch (error) {
        console.log('[CHECKOUT SUCCESS POST] Error: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}