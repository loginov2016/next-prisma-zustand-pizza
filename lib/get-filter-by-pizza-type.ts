import { TKeysMapPizzaType } from "@/@types/pizza";
import { ProductVariation } from "@prisma/client";

/**
 * Фильтрация всех объектов типа ProductVariation в массиве productVariations по нашему текущему типу пиццы
 * и получение масива от фильтрованных объектов для текущего типа теста пиццы. 
 * 
 * @param productVariations ProductVariation[] массив вариаций пиццы
 * @param type TKeysMapPizzaType тип теста пиццы
 * @returns 
 */

export const getFilterProductVariationsByPizzaType = (productVariations: ProductVariation[], type: TKeysMapPizzaType): ProductVariation[] => {
    return productVariations.filter( productVariation => productVariation.pizzaType === type );
} 