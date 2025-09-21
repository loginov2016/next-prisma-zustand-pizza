import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutCartItem } from './checkout-cart-item';
import { getCartItemDetails } from '@/lib';
import { TKeysMapPizzaSize, TKeysMapPizzaType } from '@/@types/pizza';
import { TCartStateItem } from '@/lib/get-cart-details';
import { IUseGetCart } from '@/hooks';
import { Skeleton } from '@/components/ui';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';

interface ICheckoutCartBlockProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    cartItems: TCartStateItem[];
    loading?: boolean;
    removeCartItem: IUseGetCart['removeCartItem'];
    onClickCountButton: IUseGetCart['onClickCountButton'];
}

export const CheckoutCartBlock: React.FC<ICheckoutCartBlockProps> = ({ loading, cartItems, removeCartItem, onClickCountButton, className }) => {

    return (
        <WhiteBlock title='1. Корзина' className={cn('', className)}>
            <div className="flex flex-col gap-5">
                
                { loading ? [...Array(5)].map( (_, index) => <CheckoutItemSkeleton key={index} /> ) :
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

