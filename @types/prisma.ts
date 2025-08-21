import { Category, Ingredient, Product, ProductVariation } from "@prisma/client";

export type TProductWithOptions = Product & {
    productVariations: ProductVariation[];
    ingredients: Ingredient[];
} 

export type TCategory = Category & {
    products: TProductWithOptions[];
};