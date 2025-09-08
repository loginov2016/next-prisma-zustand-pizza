import { TKeysMapPizzaSize, TKeysMapPizzaType, TPizzaOptions, TPizzaSizes } from "@/@types/pizza";
import { pizzaSizes } from "@/constants/pizza";
import { getCurrentProductVariationId, getFilterProductVariationsByPizzaType, getPizzaSizesWithDisabledOption } from "@/lib";
import { ProductVariation } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface IUsePizzaOptions {
    size: TKeysMapPizzaSize;
    type: TKeysMapPizzaType;
    setSize: (size: TKeysMapPizzaSize) => void;
    setType: (size: TKeysMapPizzaType) => void;
    currentProductVariationId?: number;
    selectedIngredients: Set<number>;
    availablePizzaSizesWithDisabledOption: TPizzaOptions[];
    addOrRemoveIngredient: (id: number) => void;
}

export const usePizzaOptions = (productVariations: ProductVariation[]): IUsePizzaOptions => {
     // Стейт для текущего размера пиццы.
    const [size, setSize] = useState<TKeysMapPizzaSize>(20);
    // Стейт для текущего типа теста пиццы.
    const [type, setType] = useState<TKeysMapPizzaType>(1);
    // Стейт для структуры данных Set<number> ингредиентов.
    const [selectedIngredients, { toggle: addOrRemoveIngredient }] = useSet(new Set<number>([]));
    
    const availablePizzaSizesForOneType = getFilterProductVariationsByPizzaType(productVariations, type);
    
    const availablePizzaSizesWithDisabledOption = getPizzaSizesWithDisabledOption(pizzaSizes, availablePizzaSizesForOneType);

    const currentProductVariationId = getCurrentProductVariationId(productVariations, size, type);


    useEffect( () => {
            // Текущий и не задизэйбленный размер пиццы из доступных размеров пицц.
            const isAvailablePizzaSizeNotDisabled = availablePizzaSizesWithDisabledOption?.some( pizza => Number( pizza.value ) === size && !pizza.disabled  )
    
            // Первый не задизэйбленный размер пиццы из доступных размеров пиццы.
            const availablePizzaSizeNotDisabled = availablePizzaSizesWithDisabledOption.find( item => !item.disabled );
    
            // Если задизэйблен текущий размер пиццы и есть первый доступный размер пиццы,
            // то устанавливаем этот размер пиццы в стэйт размеров, как активный размер пиццы.  
    
            if (!isAvailablePizzaSizeNotDisabled && availablePizzaSizeNotDisabled) {
                setSize( Number(availablePizzaSizeNotDisabled.value) as TKeysMapPizzaSize)
            }
            
        }, [type] 
    );

    return {
        size,
        type,
        setSize,
        setType,
        currentProductVariationId,
        selectedIngredients,
        addOrRemoveIngredient,
        availablePizzaSizesWithDisabledOption,
    };
}