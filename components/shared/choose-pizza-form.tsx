'use client';

import { cn } from '@/lib/utils';
import { getTotalPrice } from '@/lib';
import type { Ingredient, ProductVariation } from '@prisma/client';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { PizzaOptions } from './pizza-options';
import { PizzaIngredient } from './pizza-ingredient';
import { mapPizzaType, pizzaTypes } from '@/constants/pizza';
import type { TKeysMapPizzaSize, TKeysMapPizzaType } from '@/@types/pizza';
import { usePizzaOptions } from '@/hooks';

/**
 * Форма выбора пиццы.
 * 
 * 
*/

export interface IChoosePizzaFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    name: string;
    size: 20 | 30 | 40;
    loading?: boolean;
    imageUrl: string;
    ingredients: Ingredient[];
    productVariations: ProductVariation[];
    onSubmitAddProductsToCart: (id: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<IChoosePizzaFormProps> = ({
    name,
    loading,
    imageUrl,
    ingredients,
    productVariations,
    onSubmitAddProductsToCart,
    className,
}) => {
    const {
        size,
        type,
        setSize,
        setType,
        addOrRemoveIngredient,
        currentProductVariationId,
        selectedIngredients,
        availablePizzaSizesWithDisabledOption,
    } = usePizzaOptions(productVariations);
    
    // Текст выбранного текущего размера и типа теста пиццы.
    const textDetailsOrder = `${size} см, ${mapPizzaType[type]} пицца`;
    const totalPrice = getTotalPrice(productVariations, ingredients, selectedIngredients, size, type);


    const handleClickAddToCart = () => {
        if (currentProductVariationId) {
            onSubmitAddProductsToCart(currentProductVariationId, Array.from(selectedIngredients));
            console.log({
                totalPrice,
                size,
                type,
                selectedIngredients,
            });
        }
        
    }

    return (
    <div className={cn('flex flex-1', className)}>
        <PizzaImage name={name} imageUrl={imageUrl} size={size} />

        <div className="w-[490px] bg-[#f8f7f6] p-7">
            <Title 
                className="font-extrabold mb-1"
                text={name}
                size={'md'} 
            />
            <p className="text-gray-400">{textDetailsOrder}</p>

            <div className="flex flex-col gap-1 mt-1">
                <PizzaOptions 
                    items={availablePizzaSizesWithDisabledOption} 
                    value={String(size)} 
                    onClickOptionItem={ value => setSize(Number(value) as TKeysMapPizzaSize) } 
                />
                <PizzaOptions 
                    items={pizzaTypes} 
                    value={String(type)} 
                    onClickOptionItem={ value => setType(Number(value) as TKeysMapPizzaType) } 
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
                className='h-[55px] px-10 text-base rounded-[18px] w-full mt-5'
                loading={loading}
                onClick={handleClickAddToCart}
            >
                Добавить в корзину за {totalPrice} ₽
            </Button>
        </div>
    </div>
    );
}

