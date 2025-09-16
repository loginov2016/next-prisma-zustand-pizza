import { getCartDetails } from "@/lib";
import type { TCartStateItem } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { ICreateCartProductVariationValues } from "@/services/dto/cart.dto";
import { create } from "zustand";

export interface ICartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    cartItems: TCartStateItem[];
    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;
    /* Запрос на обновление количества товаров в корзине */
    updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
    /* Запрос на добавление товаров в корзину */
    addCartItem: (values: ICreateCartProductVariationValues) => Promise<void>;
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
                const data = await Api.cart.getCart();
                //console.log('fetchCartItems', {data});
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
        updateCartItemQuantity: async (id: number, quantity: number) => {
            try {
                set({ loading: true, error: false });
                const data = await Api.cart.updateItemQuantity(id, quantity);
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
        addCartItem: async (values: ICreateCartProductVariationValues) => {
             try {
                set({ loading: true, error: false });
                const data = await Api.cart.addCartItem(values);
                console.log('addCartItems', {data});
                //console.log('addCartItem', getCartDetails(data));
                if ( !getCartDetails(data) ) {
                    throw new Error('Ошибка! Функция getCartDetails вернула null!')
                }
                set( getCartDetails(data) );
            } catch (error) {
                console.log('Ошибка аинхронной функции addCartItem: ', error);
                set({ error: true });
            } finally {
                set({ loading: false });
            }
        },
        removeCartItem: async (id: number) => {
            try {
                set( state => ( 
                        { 
                            loading: true, 
                            error: false, 
                            cartItems: state.cartItems.map(
                                item => item.id === id ? { ...item, disabled: true } : item
                            ) 
                        } 
                    )
                );
                const data = await Api.cart.removeCartItem(id);
                console.log('removeCartItems', {data});
                //console.log('removeCartItem', getCartDetails(data));
                if ( !getCartDetails(data) ) {
                    throw new Error('Ошибка! Функция getCartDetails вернула null!')
                }
                set( getCartDetails(data) );
            } catch (error) {
                console.log('Ошибка аинхронной функции removeCartItem: ', error);
                set({ error: true });
            } finally {
                set( state => (
                        { 
                            loading: false, 
                            error: false, 
                            cartItems: state.cartItems.map(
                                item => ( { ...item, disabled: false } )
                            ) 
                        }
                    ) 
                );
            }
        },
    })
);

