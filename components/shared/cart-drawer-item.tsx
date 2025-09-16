import { cn } from '@/lib/utils';
import React from 'react';
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from './cart-item-details';
import type { ICartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';
//import * as CartItem from './cart-item-details';


interface ICartDrawerItemProps extends ICartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemoveCartItem?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<ICartDrawerItemProps> = ({ 
  id,
  imageUrl,
  details,
  name,
  price,
  quantity,
  disabled,
  onClickCountButton,
  onClickRemoveCartItem,
  className }) => {
  return (
    <div className={cn('flex items-center bg-white p-5 gap-6', {'opacity-50 pointer-events-none': disabled}, className)}>
      <CartItemDetailsImage src={imageUrl} />
      
      <div className="flex-1">
        <CartItemInfo name={name} details={details} />
        <hr className='my-3' />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />
          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />
            <Trash2Icon 
              className='text-gray-400 cursor-pointer hover:text-gray-600'
              size={16}
              onClick={onClickRemoveCartItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

