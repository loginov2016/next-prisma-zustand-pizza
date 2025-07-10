import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

/* export function GET() {
    return NextResponse.json({
        users: ['user1' , 'user2', 'user3'],
    });
} */

export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    const user = await prisma.user.create({
        data
    });

    return NextResponse.json(user);
}