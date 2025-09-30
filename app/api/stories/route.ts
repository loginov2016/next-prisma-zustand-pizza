import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";


export async function GET() {
    const stories = await prisma.story.findMany({
        include: {
            storyItems: true,
        },
    });
    
    return NextResponse.json(stories);
}