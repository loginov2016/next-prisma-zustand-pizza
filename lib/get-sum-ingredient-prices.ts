import { Ingredient } from "@prisma/client"

/**
 * Итоговая сумма цен всех выбранных ингредиентов.
 * 
 * @param ingredients ингредиенты для пиццы
 * @param selectedIngredients выбранные ингредиенты для пиццы
 * @returns number итоговая сумма всех цен ингредиентов
 */

export const getSumOfIngredientPrices = (ingredients: Ingredient[], selectedIngredients: Set<number>): number => {
    return ingredients.filter( ingredient => selectedIngredients.has(ingredient.id) ).reduce( (prevValue, ingredient) => prevValue + ingredient.price, 0 );
} 