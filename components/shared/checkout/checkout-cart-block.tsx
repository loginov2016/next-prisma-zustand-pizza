import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutCartItem } from './checkout-cart-item';
import { getCartItemDetails } from '@/lib';
import { TKeysMapPizzaSize, TKeysMapPizzaType } from '@/@types/pizza';
import { TCartStateItem } from '@/lib/get-cart-details';
import { IUseGetCart } from '@/hooks';

interface ICheckoutCartBlockProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    cartItems: TCartStateItem[];
    removeCartItem: IUseGetCart['removeCartItem'];
    onClickCountButton: IUseGetCart['onClickCountButton'];
}

export const CheckoutCartBlock: React.FC<ICheckoutCartBlockProps> = ({ cartItems, removeCartItem, onClickCountButton, className }) => {

    return (
        <WhiteBlock title='1. Корзина' className={cn('', className)}>
            <div className="flex flex-col gap-5">
                {
                    cartItems.map((cartItem) => (
                        <CheckoutCartItem
                            key={cartItem.id}
                            id={cartItem.id}
                            name={cartItem.name}
                            details={
                                getCartItemDetails(
                                    cartItem.ingredients, 
                                    cartItem.pizzaType as TKeysMapPizzaType, 
                                    cartItem.pizzaSize as TKeysMapPizzaSize
                                )
                            }
                            price={cartItem.price}
                            imageUrl={cartItem.imageUrl}
                            quantity={cartItem.quantity}
                            disabled={cartItem.disabled}
                            onClickCountButton={(type) => {
                                        onClickCountButton(cartItem.id, cartItem.quantity, type)
                                    }}
                            onClickRemoveCartItem={() => removeCartItem(cartItem.id)}
                        />
                    ))
                }
            </div>
        </WhiteBlock>
    );
}

