import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./api-routes";
//import { prisma } from "@/prisma/prisma-client";

export const search = async (query: string): Promise<Product[]> => {
    const { data } = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params: { query }});
    return data;
}

/* export const getProducts = async () => {
    try {
        const products = await prisma.category.findMany({
            include: {
                products: {
                    include: {
                        productVariations: true,
                        ingredients: true,
                    }
                }
            }
        });  
        //console.log(arrGoods);
        return products;
    } catch (error) {
        console.log(error);
    }
} */