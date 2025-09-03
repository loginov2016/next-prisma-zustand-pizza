import { getCartDetails } from "@/lib";
import type { TCartStateItem } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { create } from "zustand";

export interface ICartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    cartItems: TCartStateItem[];
    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;
    /* Запрос на обновление количества товаров в корзине */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    /* Запрос на добавление товаров в корзину */
    addCartItem: (values: any) => Promise<void>;
    /* Запрос на удаление товаров из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<ICartState>( (set, get) => ({
        loading: true,
        error: false,
        totalAmount: 0,
        cartItems: [],
        fetchCartItems: async () => {
            try {
                set({ loading: true, error: false });
                const data = await Api.cart.fetchCart();
                console.log('fetchCartItems', {data});
                //console.log('fetchCartItems', getCartDetails(data));
                if ( !getCartDetails(data) ) {
                    throw new Error('Ошибка! Функция getCartDetails вернула null!')
                }
                set( getCartDetails(data) );
            } catch (error) {
                console.log('Ошибка аинхронной функции fetchCartItems: ', error);
                set({ error: true });
            } finally {
                set({ loading: false });
            }
        },
        updateItemQuantity: async (id: number, quantity: number) => {},
        addCartItem: async (values: any) => {},
        removeCartItem: async (id: number) => {},
    })
);

