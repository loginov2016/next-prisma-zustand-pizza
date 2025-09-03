import { TKeysMapPizzaSize, TKeysMapPizzaType } from "@/@types/pizza";
import { mapPizzaType } from "@/constants/pizza";
import { TCartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
    ingredients: TCartStateItem['ingredients'],
    pizzaType: TKeysMapPizzaType,
    pizzaSize: TKeysMapPizzaSize,
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