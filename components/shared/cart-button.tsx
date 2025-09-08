import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';

interface ICartButtonProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  quantityProducts: number;
  totalAmount: number;
}

export const CartButton: React.FC<ICartButtonProps> = ({ quantityProducts, totalAmount, className }) => {

  return (
    <CartDrawer>
        <Button className={cn('group relative', className)}>
            <b>{totalAmount} ₽</b>
            <span className="h-full w-[1px] bg-white/30 mx-3"></span>
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className='relative' strokeWidth={2}/>
                <b>{quantityProducts}</b>
            </div>
            <ArrowRight 
                size={20} 
                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" 
            />
        </Button>
    </CartDrawer>
  );
}

