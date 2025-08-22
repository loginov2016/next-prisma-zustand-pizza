import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { PizzaOptions } from './pizza-options';
import { mapPizzaType, pizzaSizes, pizzaTypes } from '@/constants/pizza';
import type { TPizzaSize, TPizzaType } from '@/@types/pizza';
import { Ingredient, type ProductVariation } from '@prisma/client';
import { PizzaIngredient } from './pizza-ingredient';
import { useSet } from 'react-use';

interface IChoosePizzaFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    name: string;
    size: 20 | 30 | 40;
    imageUrl: string;
    ingredients: Ingredient[];
    productVariations: ProductVariation[];
    onClickAddProductsToCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<IChoosePizzaFormProps> = ({
    name,
    imageUrl,
    ingredients,
    productVariations,
    onClickAddProductsToCart,
    className,
}) => {
    //console.log(ingredients);
    //console.log(productVariations); // [{id: 1, price: 388, size: 20, pizzaType: 1, productId: 18}, {id: 2, price: 510, size: 30, pizzaType: 2, productId: 18}, {id: 3, price: 466, size: 40, pizzaType: 2, productId: 18}]
    // Стейт для текущего размера пиццы.
    const [size, setSize] = useState<TPizzaSize>(20);
    // Стейт для текущего типа теста пиццы.
    const [type, setType] = useState<TPizzaType>(1);
    // Стейт для структуры данных Set<number> ингредиентов.
    const [selectedIngredients, { toggle: addOrRemoveIngredient }] = useSet(new Set<number>([]));
    // Цена пиццы при котором размер пиццы из productVariation совпадает с текущим размером пиццы
    // и тип пиццы из productVariation совпадает с текущим типом пиццы.
    const pizzaPrice = productVariations.find( productVariation => productVariation.size === size && productVariation.pizzaType === type )?.price || 0
    // Итоговая сумма цен всех выбранных ингредиентов.
    const totalSumOfIngredientPrices = ingredients.filter( ingredient => selectedIngredients.has(ingredient.id) ).reduce( (prev, ingredient) => prev + ingredient.price, 0 )
    // Итоговая сумма из цены на пиццу и суммы цен всех выбранных ингредиентов.
    const totalPrice  = pizzaPrice + totalSumOfIngredientPrices;
    // Текст выбранного текущего размера и типа теста пиццы.
    const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;
    // Массив объектов продукта пиццы по размерам пиццы для одного типа теста пиццы. 
    const availablePizzaSizesForOneType = productVariations.filter( productVariation => productVariation.pizzaType === type )
    // Массив объектов по размерам пиццы и булевым значением конкретного размера пиццы. 
    const availablePizzaSizes = pizzaSizes.map( pizza => ({
        name: pizza.name,
        value: pizza.value,
        disabled: !availablePizzaSizesForOneType.some( item => Number(item.size) === Number(pizza.value)  )
    }) );

    //console.log(availablePizzaSizesForOneType); // [{id: 11, price: 276, size: 30, pizzaType: 2, productId: 20}, {id: 12, price: 511, size: 40, pizzaType: 2, productId: 20}];
    //console.log({availablePizzaSizesForOneType, availablePizzaSizes});

    //const availablePizzaTypesForOneSize = productVariations.filter( productVariation => productVariation.size === size )

    //console.log({availablePizzaTypesForOneSize}); 

    /* const availablePizzaTypes = pizzaTypes.map( pizza => ({
        name: pizza.name,
        value: pizza.value,
        disabled: !availablePizzaTypesForOneSize.some( item => Number(item.pizzaType) === Number(pizza.value)  )
    }) ); */

    const handleClickAddToCart = () => {
        onClickAddProductsToCart?.();
        console.log({
            totalPrice,
            size,
            type,
            selectedIngredients,
        });
    }

    useEffect( () => {
        // Текущий и не задизэйбленный размер пиццы из доступных размеров пицц.
        const isAvailablePizzaSize = availablePizzaSizes?.some( pizza => Number( pizza.value ) === size && !pizza.disabled  )
        // Первый не задизэйбленный размер пиццы из доступных размеров пиццы.
        const availablePizzaSize = availablePizzaSizes.find( item => !item.disabled );
        // Если задизэйблен текущий размер пиццы и есть первый доступный размер пиццы,
        // то устанавливаем этот размер пиццы в стэйт размеров, как активный размер пиццы.  
        if (!isAvailablePizzaSize && availablePizzaSize) {
            setSize( Number(availablePizzaSize.value) as TPizzaSize)
        }
    }, [type] );

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
                    items={availablePizzaSizes} 
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
                onClick={handleClickAddToCart}
            >
                Добавить в корзину за {totalPrice} ₽
            </Button>
        </div>
    </div>
    );
}

