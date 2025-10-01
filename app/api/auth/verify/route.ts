import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userCode = req.nextUrl.searchParams.get('code');

        if (!userCode) {
            return NextResponse.json({error: 'Код не найден'}, { status: 400 });
        }

        const verificationCode = await prisma.verificationCode.findFirst({
                where: {
                    code: userCode,
                },
            }
        );

        if (!verificationCode) {
            return NextResponse.json({error: 'Код не найден'}, { status: 400 });
        }

        await prisma.user.update({
            where: {
                id: verificationCode.userId || undefined,
            },
            data: {
                verified: new Date(),
            },
        });

        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id,
            },
        });

        return NextResponse.redirect(new URL('/?verified', req.url));
        
    } catch (error) {
        console.log('[GET /api/auth/verify] Error', error);
    }
    
    
    
}