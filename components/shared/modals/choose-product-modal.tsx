'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { notFound, useRouter } from 'next/navigation';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TProductWithOptions } from '@/@types/prisma';
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