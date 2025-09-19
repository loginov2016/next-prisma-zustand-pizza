'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ICartItemProps } from './cart-item-details/cart-item-details.types';
import { CartItemDetailsCountButton, CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from './cart-item-details';
import { Ingredient } from '@prisma/client';


interface ICheckoutCartItemProps extends ICartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemoveCartItem?: () => void;
  className?: string;
}

export const CheckoutCartItem: React.FC<ICheckoutCartItemProps> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemoveCartItem,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {'opacity-50 pointer-events-none': disabled},
        className,
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetailsCountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemoveCartItem}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
      
    </div>
  );
};



