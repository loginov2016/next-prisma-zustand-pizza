import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

interface IIngredient {
    id: number;
    name: string;
    price: number;
    imageUrl: string; 
}

const filterIngredients = (ingredients: IIngredient[], arrData: number[]): IIngredient[] => {
    return arrData.map( value => {
                    return ingredients.filter( obj => obj.id === value )[0];
                } 
            );
}

const generateProductVariation = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductVariationUncheckedCreateInput
};

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

    await prisma.ingredient.createMany({
        data: ingredients
    });

    await prisma.product.createMany({
        data: products
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Пепперони фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Чоризо фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    const pizza4 = await prisma.product.create({
        data: {
            name: 'Овощи и грибы',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/0198bf29e76179b88bdbf2ec5527bba3.avif',
            categoryId: 1,
            ingredients: {
                connect: filterIngredients(ingredients, [6, 11, 15, 12, 16, 2, 14]),
            },
        },
    });

    const pizza5 = await prisma.product.create({
        data: {
            name: 'Карбонара',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/0198bf2b03447079941f2d5ac6e986a9.avif',
            categoryId: 1,
            ingredients: {
                connect: filterIngredients(ingredients, [3, 2, 11, 9, 13]),
            },
        },
    });

    const pizza6 = await prisma.product.create({
        data: {
            name: 'Бургер-Пицца',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/0198bf3fab7976678d811111bb2e8cb9.avif',
            categoryId: 1,
            ingredients: {
                connect: filterIngredients(ingredients, [7, 10, 15, 2, 12]),
            },
        },
    });

    await prisma.productVariation.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductVariation({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductVariation({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductVariation({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            // Пицца "Сырная"
            generateProductVariation({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductVariation({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductVariation({ productId: pizza2.id, pizzaType: 1, size: 40 }),
            generateProductVariation({ productId: pizza2.id, pizzaType: 2, size: 20 }),
            generateProductVariation({ productId: pizza2.id, pizzaType: 2, size: 30 }),
            generateProductVariation({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            // Пицца "Чоризо фреш"
            generateProductVariation({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductVariation({ productId: pizza3.id, pizzaType: 2, size: 30 }),
            generateProductVariation({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            // Пицца "Овощи и грибы"
            generateProductVariation({ productId: pizza4.id, pizzaType: 1, size: 20 }),
            generateProductVariation({ productId: pizza4.id, pizzaType: 1, size: 30 }),
            generateProductVariation({ productId: pizza4.id, pizzaType: 2, size: 40 }),

            // Пицца "Карбонара"
            generateProductVariation({ productId: pizza5.id, pizzaType: 1, size: 20 }),
            generateProductVariation({ productId: pizza5.id, pizzaType: 1, size: 30 }),
            generateProductVariation({ productId: pizza5.id, pizzaType: 1, size: 40 }),
            generateProductVariation({ productId: pizza5.id, pizzaType: 2, size: 20 }),
            generateProductVariation({ productId: pizza5.id, pizzaType: 2, size: 40 }),

            // Пицца "Бургер-Пицца"
            generateProductVariation({ productId: pizza6.id, pizzaType: 1, size: 20 }),
            generateProductVariation({ productId: pizza6.id, pizzaType: 1, size: 30 }),
            generateProductVariation({ productId: pizza6.id, pizzaType: 2, size: 30 }),
            generateProductVariation({ productId: pizza6.id, pizzaType: 2, size: 40 }),

            // Остальные продукты
            generateProductVariation({ productId: 1 }),
            generateProductVariation({ productId: 2 }),
            generateProductVariation({ productId: 3 }),
            generateProductVariation({ productId: 4 }),
            generateProductVariation({ productId: 5 }),
            generateProductVariation({ productId: 6 }),
            generateProductVariation({ productId: 7 }),
            generateProductVariation({ productId: 8 }),
            generateProductVariation({ productId: 9 }),
            generateProductVariation({ productId: 10 }),
            generateProductVariation({ productId: 11 }),
            generateProductVariation({ productId: 12 }),
            generateProductVariation({ productId: 13 }),
            generateProductVariation({ productId: 14 }),
            generateProductVariation({ productId: 15 }),
            generateProductVariation({ productId: 16 }),
            generateProductVariation({ productId: 17 }),
        ]
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '111111'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '222222'
            },
        ],
    });

    await prisma.cartProductVariation.create({
        data: 
            {
                productVariationId: 1,
                cartId: 1,
                quantity: 2,
                ingredients: {
                    connect: [{id: 1}, {id: 2}, {id: 3}]
                }
            },
    });

    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
            },
        ],
    });
}

async function down() {
    //await prisma.$executeRaw`GRANT SELECT ON ${table_name} TO PUBLIC;`
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartProductVariation" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
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