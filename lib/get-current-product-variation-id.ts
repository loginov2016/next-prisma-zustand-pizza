import { ProductVariation } from "@prisma/client"

/**
 * Поиск соответствующего объекта типа ProductVariation в массиве productVariations, который удовлетворяет условиям при которых,
 * размер пиццы из productVariation совпадает с текущим размером пиццы size и совпадает с текущим типом пиццы type, после чего
 * получаем текущий id пиццы.
 * 
 * @param productVariations 
 * @param pizzaSize 
 * @param pizzaType 
 * @returns number | undefined
 */

export const getCurrentProductVariationId = (productVariations: ProductVariation[], pizzaSize: number, pizzaType: number ): number | undefined => {
    return productVariations.find( productVariation => productVariation.size === pizzaSize && productVariation.pizzaType === pizzaType )?.id;
}