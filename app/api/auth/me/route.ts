import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getUserSession();

        if (!user) {
            return NextResponse.json({message: 'Вы не авторизованы'}, { status: 401 });
        }

        const userData = await prisma.user.findFirst({
            where: {
                id: Number(user.id),
            },
            select: {
                fullName: true,
                email: true,
                password: false,
            }
        });

        return NextResponse.json(userData);

    } catch (error) {
        console.error('[Me] Server Error', error);
        return NextResponse.json({message: '[USER_GET] Server Error'}, { status: 500 });
    }
}