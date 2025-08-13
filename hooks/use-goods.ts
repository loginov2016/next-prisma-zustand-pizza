import { prisma } from "@/prisma/prisma-client";
import { getProducts } from "@/services/products";
import { Category, Ingredient, Product, ProductVariation } from "@prisma/client";
import { useEffect, useState } from "react";


/* interface IProducts extends Product {
    productVariations: ProductVariation[];
    ingredients: Ingredient[];
} */

/* interface IGoods extends Category {
    products: TProducts[];
} */

type TProducts = {
    productVariations: ProductVariation[];
    ingredients: Ingredient[];
} & Product

type TGoods = {
    products: TProducts[];
} & Category;

export const useGoods = () => {
    const [goods, setGoods] = useState<TGoods[] | false>([]);
    
    useEffect( () => {
        async function fetchProducts() {
            const products = await getProducts();
            setGoods(products);
        }

        fetchProducts();
        
    }, [] );

    return goods;
};