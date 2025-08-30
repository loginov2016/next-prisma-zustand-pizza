import { TKeysMapPizzaSize, TKeysMapPizzaType } from "@/@types/pizza";
import { mapPizzaType } from "@/constants/pizza";
import { Ingredient } from "@prisma/client";

export const getCartItemDetails = (
    pizzaSize: TKeysMapPizzaSize,
    pizzaType: TKeysMapPizzaType,
    ingredients: Ingredient[]
    ): string => {
    const details: string[] = [];
    
    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize} см`);
    }

    if (ingredients) {
        details.push(...ingredients.map( ingredient => ingredient.name ));
    }

    return details.join(', ');
}