'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { notFound, useRouter } from 'next/navigation';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ChooseProductForm } from '../choose-product-form';
import { TProductWithOptions } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/store';
import { ICreateCartProductVariationValues } from '@/services/dto/cart.dto';
import toast from 'react-hot-toast';
import { SelectingForm } from '../selecting-form';


interface IChooseProductModalProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    product: TProductWithOptions;
}

export const ChooseProductModal: React.FC<IChooseProductModalProps> = ({ product, className }) => {
    const router = useRouter();
    //console.log('[ChooseProductModal] productVariations', product.productVariations);
    
    if (!product) {
        return notFound();
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={ () => router.back()  } >
            <DialogContent className={cn('p-0 !w-[1060px] !max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                <SelectingForm product={product} onCloseModalWindow={ () => router.back() } />
            </DialogContent>
        </Dialog>
    );
}

/* 
    const onSubmitAddProductsToCart = async (currentProductVariationId?: number, ingredients?: number[]) => {
        try {
            const itemId = currentProductVariationId ?? firstProductVariationItem.id;
            await addCartItem({
                productVariationId: itemId,
                ingredients,
            });
            toast.success(`${product.name} добавлен в корзину`);
            router.back();
        } catch (error) {
            toast.error(`Произошла ошибка при добавлении ${product.name} в корзину`);
            console.log(error);
        }
    } 
*/

/* 

{
    isPizzaForm ? (
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

*/