import { ProductVariation } from "@prisma/client";
import { IPizzaSizes, TPizzaOptions } from "@/@types/pizza";
import { getFilterProductVariationsByPizzaSizes } from "./get-filter-product-variations-by-pizza-sizes";

/**
 * Массив объектов по доступным размерам пиццы для одного типа теста пиццы, и булевым значением конкретного размера пиццы.
 * 
 * @param pizzaSizes - размеры пицц
 * @param availablePizzaSizesForOneType - доступные размеры пицц для одного типа теста пиццы
 * @returns TPizzaOptions[]
 */

export const getPizzaSizesWithDisabledOption = (pizzaSizes: IPizzaSizes[], availablePizzaSizesForOneType: ProductVariation[]): TPizzaOptions[] => {
    return pizzaSizes.map( pizzaSize => ({
        name: pizzaSize.name,
        value: pizzaSize.value,
        disabled: !getFilterProductVariationsByPizzaSizes(availablePizzaSizesForOneType, pizzaSize.value)
    }) );
}