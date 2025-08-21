import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

interface IChooseProductFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    name: string;
    imageUrl: string;
    onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<IChooseProductFormProps> = ({
    name,
    imageUrl,
    onClickAdd,
    className,
}) => {
    const textDetails = '30 см, традиционное тесто 30';
    const totalPrice  = 350;

    return (
    <div className={cn('flex flex-1', className)}>
        <ProductImage name={name} imageUrl={imageUrl} />

        <div className="w-[490px] bg-[#f8f7f6] p-7">
            <Title 
                className="font-extrabold mb-1"
                text={name}
                size={'md'} 
            />
            <p className="text-gray-400">{textDetails}</p>

            <Button
                className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
            >
                Добавить в корзину за {totalPrice} ₽
            </Button>
        </div>
    </div>
    );
}

