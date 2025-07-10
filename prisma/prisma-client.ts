/* 
    * Была проблема, когда PrismaClient возвращал тип any, когда из файла
    * schema.prisma из generator client убрал строку output = "../lib/generated/prisma",
    * после чего в терминале набрал: npx prisma generate, то всё заработало!
*/
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
