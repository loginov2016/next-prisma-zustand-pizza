'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ChooseProductForm } from '../choose-product-form';
import { TProductWithOptions } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';


interface IChooseProductModalProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    product: TProductWithOptions;
}

export const ChooseProductModal: React.FC<IChooseProductModalProps> = ({ product, className }) => {
    const router = useRouter();
    const isPizzaForm = product.categoryId === 1;

    return (
        <Dialog open={Boolean(product)} onOpenChange={ () => router.back()  } >
            <DialogContent className={cn('p-0 !w-[1060px] !max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
                {
                    isPizzaForm ? (
                        <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} size={30} />
                    ) : (
                        <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
                    )
                }
            </DialogContent>
        </Dialog>
    );
}

