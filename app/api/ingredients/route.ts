import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
   console.log('Сработала ф-ия GET маршрута api/ingredients');
   const ingredients = await prisma.ingredient.findMany();
   //console.log(ingredients); 
   return NextResponse.json(ingredients);
}

export async function POST() { 
   
}