import { prisma } from "@/prisma/prisma-client";

export interface IGetSearchParams {
    query?: string;
    sortBy?: string;
    pizzaSizes: string;
    pizzaTypes: string;
    ingredients: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzasByFilteringOptions = async (params: IGetSearchParams) => {
    const { query, sortBy, pizzaSizes, pizzaTypes, ingredients, priceFrom, priceTo } = params;
    //console.log({query, sortBy, pizzaSizes, pizzaTypes, ingredients, priceFrom, priceTo});
    const arrPizzaSizes    = pizzaSizes?.split(',').map(Number);
    const arrPizzaTypes    = pizzaTypes?.split(',').map(Number);
    const arrIngredientIds = ingredients?.split(',').map(Number);
    const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(priceTo)   || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc',
                },
                where: {
                    ingredients: arrIngredientIds?.length > 0 ? {
                        some: {
                            id: {
                                in: arrIngredientIds
                            }
                        }
                    } : undefined,
                    productVariations: {
                        some: {
                            size: {
                                in: arrPizzaSizes?.length > 0 ? arrPizzaSizes : undefined,
                            },
                            pizzaType: {
                                in: arrPizzaTypes?.length > 0 ? arrPizzaTypes : undefined,
                            },
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            }
                        }
                    },
                },
                include: {
                    ingredients: true,
                    productVariations: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                            price: 'asc',
                        },
                    },
                }
            }

        }
      });

    return categories;

} 