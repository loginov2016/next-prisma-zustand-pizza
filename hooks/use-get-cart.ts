import { useEffect } from 'react'
import { useCartStore } from '@/store';
import { TCartStateItem } from '@/lib/get-cart-details';
import { ICreateCartProductVariationValues } from '@/services/dto/cart.dto';

export interface IUseGetCart {
    totalAmount: number;
    cartItems: TCartStateItem[];
    loading: boolean;
    addCartItem: (values: ICreateCartProductVariationValues) => Promise<void>;
    updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
}

export const useGetCart = (): IUseGetCart => {
    const cartState = useCartStore( state => state);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        //console.log({id, quantity, type});
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        cartState.updateCartItemQuantity(id, newQuantity); 
    }
    
    useEffect( () => {
            cartState.fetchCartItems();
            //console.log({cartItems});
        }, [cartState] ); // Добавил в массив зависимостей cartState

    return {...cartState, onClickCountButton};
}