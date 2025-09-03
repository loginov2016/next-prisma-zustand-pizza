import { TCartItemDTO } from "@/services/dto/cart.dto";

export const getCartItemTotalPrice = (item: TCartItemDTO): number => {
    const priceOfAllIngredients =  item.ingredients.reduce( (acc, ingredient) => acc + ingredient.price, 0 );
    return  (item.productVariation.price + priceOfAllIngredients) * item.quantity;
}