import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { PizzaSizeOptions } from './pizza-size-options';
import { pizzaSizes, pizzaTypes } from '@/constants/pizza';
import { TPizzaSize, TPizzaType } from '@/@types/pizza';

interface IChoosePizzaFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    name: string;
    size: 20 | 30 | 40;
    imageUrl: string;
    ingredients: any[];
    productVariations?: any[];
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<IChoosePizzaFormProps> = ({
    name,
    imageUrl,
    ingredients,
    productVariations,
    onClickAdd,
    className,
}) => {
    const [size, setSize] = useState<TPizzaSize>(20);
    const [type, setType] = useState<TPizzaType>(1);

    const textDetails = '30 см, традиционное тесто 30';
    const totalPrice  = 350;

    return (
    <div className={cn('flex flex-1', className)}>
        <PizzaImage name={name} imageUrl={imageUrl} size={size} />

        <div className="w-[490px] bg-[#f8f7f6] p-7">
            <Title 
                className="font-extrabold mb-1"
                text={name}
                size={'md'} 
            />
            <p className="text-gray-400">{textDetails}</p>

            <PizzaSizeOptions 
                items={pizzaSizes} 
                value={String(size)} 
                onClickOptionItem={ value => setSize(Number(value) as TPizzaSize) } 
            />

            <PizzaSizeOptions 
                items={pizzaTypes} 
                value={String(type)} 
                onClickOptionItem={ value => setType(Number(value) as TPizzaType) } 
            />

            <Button
                className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
            >
                Добавить в корзину за {totalPrice} ₽
            </Button>
        </div>
    </div>
    );
}

