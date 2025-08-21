/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IIngredientProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    name: string;
    imageUrl: string;
    price: number;
    active?: boolean;
    onClick?: VoidFunction;

}

export const PizzaIngredient: React.FC<IIngredientProps> = ({ name, imageUrl, price, active, onClick, className }) => {
  return (
    <div 
        className={cn('flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white', {
            'border border-primary': active
        }, className)}
        onClick={onClick}
    >
      {active && <CircleCheck className='absolute top-2 right-2 text-primary' />}
      <img src={imageUrl} alt={name} width={110} height={110} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
}

