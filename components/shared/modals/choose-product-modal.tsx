'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ChooseProductForm } from '../choose-product-form';
import { TProductWithOptions } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/store';
import { ICreateCartProductVariationValues } from '@/services/dto/cart.dto';


interface IChooseProductModalProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    product: TProductWithOptions;
}

export const ChooseProductModal: React.FC<IChooseProductModalProps> = ({ product, className }) => {
    const router = useRouter();
    console.log('[ChooseProductModal] productVariations', product.productVariations);
    const firstProductVariationItem = product.productVariations[0];
    const isPizzaForm = product.categoryId === 1;
    const addCartItem = useCartStore( state => state.addCartItem);

    const onAddProduct = () => {
        addCartItem({
            productVariationId: firstProductVariationItem.id,
        });
    }

    const onAddPizza = (currentProductVariationId: number, ingredients: number[]) => {
        addCartItem({
            productVariationId: currentProductVariationId,
            ingredients,
        });
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={ () => router.back()  } >
            <DialogContent className={cn('p-0 !w-[1060px] !max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                {
                    isPizzaForm ? (
                        <ChoosePizzaForm
                            name={product.name}
                            imageUrl={product.imageUrl} 
                            size={30} 
                            ingredients={product.ingredients} 
                            productVariations={product.productVariations}
                            onSubmitAddProductsToCart={onAddPizza}
                        />
                    ) : (
                        <ChooseProductForm
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={firstProductVariationItem.price}
                            onSubmitAddProductsToCart={onAddProduct}
                        />
                    )
                }
            </DialogContent>
        </Dialog>
    );
}

