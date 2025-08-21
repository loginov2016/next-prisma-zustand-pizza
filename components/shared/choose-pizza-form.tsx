import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { PizzaOptions } from './pizza-options';
import { pizzaSizes, pizzaTypes } from '@/constants/pizza';
import type { TPizzaSize, TPizzaType } from '@/@types/pizza';
import { Ingredient, type ProductVariation } from '@prisma/client';
import { PizzaIngredient } from './pizza-ingredient';
import { useSet } from 'react-use';

interface IChoosePizzaFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    name: string;
    size: 20 | 30 | 40;
    imageUrl: string;
    ingredients: Ingredient[];
    productVariations?: ProductVariation[];
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
    //console.log(ingredients);
    const [size, setSize] = useState<TPizzaSize>(20);
    const [type, setType] = useState<TPizzaType>(1);

    const [selectedIngredients, { toggle: addOrRemoveIngredient }] = useSet(new Set<number>([]));

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

            <div className="flex flex-col gap-4 mt-5">
                <PizzaOptions 
                    items={pizzaSizes} 
                    value={String(size)} 
                    onClickOptionItem={ value => setSize(Number(value) as TPizzaSize) } 
                />
                <PizzaOptions 
                    items={pizzaTypes} 
                    value={String(type)} 
                    onClickOptionItem={ value => setType(Number(value) as TPizzaType) } 
                />
            </div>

            <div className="bg-gray-50 p-5 rounded-md h-[420px] mt-5 overflow-auto scrollbar">
                <div className="grid grid-cols-3 gap-3">
                    {ingredients.map( ingredient => (
                        <PizzaIngredient 
                            key={ingredient.id}
                            name={ingredient.name} 
                            imageUrl={ingredient.imageUrl} 
                            price={ingredient.price}
                            active={selectedIngredients.has(ingredient.id)}
                            onClick={() => addOrRemoveIngredient(ingredient.id)}
                        />
                    ) )}
                </div>
            </div>

            <Button
                className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
            >
                Добавить в корзину за {totalPrice} ₽
            </Button>
        </div>
    </div>
    );
}

