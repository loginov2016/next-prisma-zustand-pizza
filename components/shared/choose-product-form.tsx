import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

export interface IChooseProductFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    name: string;
    loading?: boolean;
    imageUrl: string;
    price: number;
    onSubmitAddProductsToCart: VoidFunction;
}

export const ChooseProductForm: React.FC<IChooseProductFormProps> = ({
    name,
    loading,
    imageUrl,
    price,
    onSubmitAddProductsToCart,
    className,
}) => {

    return (
    <div className={cn('flex flex-1', className)}>
        <ProductImage name={name} imageUrl={imageUrl} />

        <div className="flex flex-col justify-between w-[490px] bg-[#f8f7f6] p-7">
            <Title 
                className="font-extrabold mb-1"
                text={name}
                size={'md'} 
            />

            <Button
                className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
                loading={loading}
                onClick={() => onSubmitAddProductsToCart()}
            >
                Добавить в корзину за {price} ₽
            </Button>
        </div>
    </div>
    );
}

