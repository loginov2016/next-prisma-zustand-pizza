import { IPizzaSizes } from "@/@types/pizza";
import { ProductVariation } from "@prisma/client"

/**
 * Фильтрация вариаций продукта(пиццы) по размерам пиццы.
 * Здесь мы берем по одному размеру из всех размеров пиццы: "20" | "30" | "40" и проверяем
 * какого размера пиццы нет в массиве доступных размерах пиццы для одного типа теста пиццы, если
 * какого-то размера пиццы нет, то метод some возращает false.
 * Если размера '20' нет в массиве ProductVariation[] для одного типа теста пиццы, то метод
 * some возвращает false.
 * 
 * 
 * @param productVariations ProductVariation[]
 * @param pizzaSize string
 * @returns boolean
 */

export const getFilterProductVariationsByPizzaSizes = (productVariationsForOnePizzaType: ProductVariation[], pizzaSize: IPizzaSizes['value']): boolean => {
    return productVariationsForOnePizzaType.some( item => Number(item.size) === Number(pizzaSize) );
}