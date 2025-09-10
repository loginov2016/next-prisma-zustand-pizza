import { ICartDTO } from "@/services/dto/cart.dto";
import { getCartItemTotalPrice } from "./get-cart-item-total-price";

export type TCartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{name: string; price: number}>
}


interface ICartDetails {
    cartItems: TCartStateItem[];
    totalAmount: number;
}

/**
 * Given the server response data, this function transforms it into an object with 
 * all the necessary information for the cart page.
 * 
 * @param data - The response from the server.
 * @returns An object with the following properties: cartItems and totalAmount.
 * cartItems is an array of objects, each containing: id, quantity, name, imageUrl, price, pizzaSize, pizzaType and ingredients.
 * totalAmount is a number representing the total amount of all items in the cart.
 */    
export const getCartDetails = (data: ICartDTO): ICartDetails => {
    
    /* if (data.cartProductVariations.length === 0) {
        console.log('Массив data.cartProductVariations - пустой!');
        return null;
    }  */
    // Вопрос: есть ли cartItems у data ??? Ответ: нет! У data есть только cartProductVariations!
    const items = data.cartProductVariations.map( item => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productVariation.product.name,
        imageUrl: item.productVariation.product.imageUrl,
        price: getCartItemTotalPrice(item),
        pizzaSize: item.productVariation.size,
        pizzaType: item.productVariation.pizzaType,
        ingredients: item.ingredients.map( ingredient => ( {
            name: ingredient.name,
            price: ingredient.price,
        }) )
    }) );
    //console.log({items});
    const cartDetails = {
        cartItems: items,
        totalAmount: data.totalAmount,
    };
    console.log({cartDetails});
    return cartDetails;
}