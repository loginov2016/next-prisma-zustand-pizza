'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

type TPizzaSizeOption = {
    name: string;
    value: string;
    disabled?: boolean;
}

interface IPizzaSizeOptionsProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    items: readonly TPizzaSizeOption[];
    onClickOptionItem?: (value: TPizzaSizeOption['value']) => void;
    value: TPizzaSizeOption['value'];
}

export const PizzaSizeOptions: React.FC<IPizzaSizeOptionsProps> = ({ items, onClickOptionItem, value, className }) => {
  return (
    <div className={cn('flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none', className)}>
      {
        items.map( item => (
            <button
                key={item.name}
                onClick={ () => onClickOptionItem?.(item.value) }
                className={cn('flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm', {
                    'bg-white shadow': item.value === value,
                    'text-gray-500 opacity-50 pointer-events-none': item.disabled,
                })}
            >
                {item.name}
            </button>
        ) )
      }
    </div>
  );
}

