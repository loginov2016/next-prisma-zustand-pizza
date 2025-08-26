import { Ingredient, ProductVariation } from "@prisma/client";
import { getPriceForPizzaVariation } from "./get-price-for-pizza-variation";
import { getSumOfIngredientPrices } from "./get-sum-ingredient-prices";

/**
 * Функция подсчитывает итоговую сумму из цены на пиццу и суммы цен всех выбранных ингредиентов.
 * 
 * @param productVariations ProductVariation[] - массив вариаций продукта
 * @param ingredients Ingredient[] - массив ингрелиентов
 * @param selectedIngredients Set<number> - выбранные ингредиенты
 * @param pizzaSize number - размер пиццы
 * @param pizzaType number - тип теста пиццы
 * @returns number - общая стоимость пиццы и выбранных ингредиентов
 */

export const getTotalPrice = (
        productVariations: ProductVariation[],
        ingredients: Ingredient[],
        selectedIngredients: Set<number>,
        pizzaSize: number, 
        pizzaType: number
    ): number => {
    const pizzaPrice = getPriceForPizzaVariation(productVariations, pizzaSize, pizzaType);
    const totalSumOfIngredientPrices = getSumOfIngredientPrices(ingredients, selectedIngredients);
    return pizzaPrice + totalSumOfIngredientPrices;
}