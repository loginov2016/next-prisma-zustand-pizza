import { Cart, CartProductVariation, Ingredient, Product, ProductVariation } from "@prisma/client";

export type TCartItemDTO = CartProductVariation & {
    productVariation: ProductVariation & {
        product: Product;
    };
    ingredients: Ingredient[]
}

export interface ICartDTO extends Cart {
    cartProductVariations: TCartItemDTO[];
}

export interface ICreateCartProductVariationValues {
    productVariationId: number;
    ingredients?: number[];
}