'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails, getNumberWord } from '@/lib';
import { TKeysMapPizzaSize, TKeysMapPizzaType } from '@/@types/pizza';
import Image from 'next/image';
import { Title } from './title';
import { useGetCart } from '@/hooks';



interface ICartDrawerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CartDrawer: React.FC<ICartDrawerProps> = ({ children }) => {
    const { totalAmount, cartItems, removeCartItem, onClickCountButton } = useGetCart();
    const [ buttonLoading, setButtonLoading ] = useState(false);
    
    //console.log({cartItems});

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
            <div className={cn('flex flex-col h-full', {'justify-center': totalAmount === 0})}>
                { totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                В корзине <span className="font-bold">{cartItems.length} {getNumberWord(cartItems.length, ['товар', 'товара', 'товаров'])}</span>
                            </SheetTitle>
                        </SheetHeader>
                    )
                }    
                    
                { totalAmount === 0 && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image src="/assets/images/empty-box.png" width={120} height={120} alt="Empty cart" />
                            <Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />
                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте товары в корзину, чтобы оформить заказ
                            </p>
                            <SheetClose>
                                <Button className="w-56 h-12 text-base" size='lg'>
                                    <ArrowLeft className="w-5 mr-2"/>
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )
                }

                { totalAmount > 0 &&  (
                        <>
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
                                                disabled={cartItem.disabled}
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
                                <Link href='/checkout'>
                                    <Button 
                                        className="w-full h-12 text-base"
                                        type='submit'
                                        loading={buttonLoading}
                                        onClick={() => setButtonLoading(true)}
                                        /* disabled={loading} */
                                    >
                                        Оформить заказ
                                        <ArrowRight className='w-5 ml-2'/>
                                    </Button>
                                </Link>
                            </SheetFooter>
                        </>
                    )
                }
            </div>
            </SheetContent>
        </Sheet>
    );
}

