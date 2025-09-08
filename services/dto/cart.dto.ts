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

/* data: {
    cartProductVariations: [
        0: {
            cartId: 1
            id: 1
            productVariation: {id: 1, price: 388, size: 20, pizzaType: 1, productId: 18, …}
            ingredients: (3) [{…}, {…}, {…}]
            productVariationId: 1
            quantity: 2
            createdAt: "2025-07-21T09:21:48.647Z"
            updatedAt: "2025-07-21T09:21:48.647Z"
        }
    ]
    id: 1
    token: "111111"
    totalAmount: 650
    createdAt: "2025-07-21T09:21:48.642Z"
    updatedAt: "2025-07-21T09:21:48.642Z"
    userId: 1
}
*/