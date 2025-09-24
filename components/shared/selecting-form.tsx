'use client';

import { useCartStore } from "@/store";
import { ChoosePizzaForm } from "./choose-pizza-form"
import { ChooseProductForm } from "./choose-product-form"
import toast from "react-hot-toast";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TProductWithOptions } from "@/@types/prisma";

interface ISelectingFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement >{
    product: TProductWithOptions;
    onCloseModalWindow?: () => void;
}

export const SelectingForm: React.FC<ISelectingFormProps> = ({ product, onCloseModalWindow, className }) => {
    //const router = useRouter();
    const addCartItem               = useCartStore( state => state.addCartItem);
    const loading                   = useCartStore( state => state.loading);
    const isPizzaForm               = product.categoryId === 1;
    const firstProductVariationItem = product.productVariations[0];

    /**
     * @description
     * Adds a product to the cart, given product variation ID and optional ingredients IDs.
     * If product variation ID is not provided, the first product variation in the product's list is used.
     * 
     * @param {number} [currentProductVariationId] - Product variation ID to be added to cart.
     * @param {number[]} [ingredients] - Ingredient IDs to be added to the product variation.
     */
    const onSubmitAddProductsToCart = async (currentProductVariationId?: number, ingredients?: number[]) => {
        const itemId = currentProductVariationId ?? firstProductVariationItem.id;
        await addCartItem({
            productVariationId: itemId,
            ingredients,
        }).then(() => {
            toast.success(`${product.name} добавлен в корзину`);
            onCloseModalWindow?.();
        }).catch((err) => {
            toast.error(`Произошла ошибка при добавлении ${product.name} в корзину`);
            console.log(err);
        });
    }
    
    return isPizzaForm ? (
        <ChoosePizzaForm
            name={product.name}
            imageUrl={product.imageUrl} 
            size={30} 
            ingredients={product.ingredients} 
            productVariations={product.productVariations}
            onSubmitAddProductsToCart={onSubmitAddProductsToCart}
            loading={loading}
        />
    ) : (
        <ChooseProductForm
            name={product.name}
            imageUrl={product.imageUrl}
            price={firstProductVariationItem.price}
            onSubmitAddProductsToCart={onSubmitAddProductsToCart}
            loading={loading}
        />
    )
}