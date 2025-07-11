import { categories } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'Вася Пупкин',
                email: 'pupkin_vasya@mail.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: 'Дима Сидоров',
                email: 'sidorov_dima@gmail.com',
                password: hashSync('222222', 10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: 'Саша Романов',
                email: 'romanov_sasha@yandex.com',
                password: hashSync('333333', 10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    });

    await prisma.category.createMany({
        data: categories
    });
}

async function down() {
    //await prisma.$executeRaw`GRANT SELECT ON ${table_name} TO PUBLIC;`
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}


async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.log(e);
    }
}

main().then( async () => {
    await prisma.$disconnect();
} ).catch( async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
} );