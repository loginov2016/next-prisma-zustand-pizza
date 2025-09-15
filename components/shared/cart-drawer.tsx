'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails, getNumberWord } from '@/lib';
import { useCartStore } from '@/store/cart';
import { TKeysMapPizzaSize, TKeysMapPizzaType, TPizzaTypes } from '@/@types/pizza';



interface ICartDrawerProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  
}

export const CartDrawer: React.FC<ICartDrawerProps> = ({ children, className }) => {
    /* const [ totalAmount, fetchCartItems, cartItems ] = useCartStore( state => [
        state.totalAmount, 
        state.fetchCartItems,
        state.cartItems,
    ] ); */
    const totalAmount            = useCartStore( state => state.totalAmount);
    const cartItems              = useCartStore( state => state.cartItems);
    const fetchCartItems         = useCartStore( state => state.fetchCartItems);
    const updateCartItemQuantity = useCartStore( state => state.updateCartItemQuantity);
    const removeCartItem         = useCartStore( state => state.removeCartItem);
    const loading                = useCartStore( state => state.loading);
    
    //console.log({cartItems});

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        //console.log({id, quantity, type});
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateCartItemQuantity(id, newQuantity); 
    }

    useEffect( () => {
        fetchCartItems();
        //console.log({cartItems});
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">{cartItems.length} {getNumberWord(cartItems.length, ['товар', 'товара', 'товаров'])}</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-5 overflow-auto flex-1">
                    
                        {
                            cartItems.map( cartItem => (
                                <div className="mb-2" key={cartItem.id}>
                                    <CartDrawerItem
                                        id={cartItem.id}
                                        imageUrl={cartItem.imageUrl}
                                        details={ cartItem.pizzaSize && cartItem.pizzaType ? getCartItemDetails(cartItem.ingredients, cartItem.pizzaType as TKeysMapPizzaType, cartItem.pizzaSize as TKeysMapPizzaSize) : ''}
                                        name={cartItem.name}
                                        price={cartItem.price}
                                        quantity={cartItem.quantity}
                                        onClickCountButton={(type) => {
                                            onClickCountButton(cartItem.id, cartItem.quantity, type)
                                        }}
                                        onClickRemoveCartItem={() => removeCartItem(cartItem.id)}
                                    />
                                </div>
                            ) )
                        }
                    
                </div>

                <SheetFooter className='bg-white p-8'>
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg">
                                Итого
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>
                            <span className="font-bold text-lg">{totalAmount} ₽</span>
                        </div>
                    </div>
                    <Link href='/cart'>
                        <Button 
                            className="w-full h-12 text-base"
                            type='submit'
                            disabled={loading}
                        >
                            Оформить заказ
                            <ArrowRight className='w-5 ml-2'/>
                        </Button>
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

