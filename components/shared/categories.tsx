import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';


interface ICategoriesProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {

}

const categories = [ 'Пиццы', 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Картошка фри' ];
const activeIndex = 0;

export const Categories: React.FC<ICategoriesProps> = ({ className }) => {
  return (
    <div className={cn('inline-flex bg-gray-50 rounded-2xl gap-1 p-1', className)}>
        {
            categories.map( (category, index) => (
                <Link href="" className={cn('flex items-center font-bold h-11 rounded-2xl px-5', 
                    activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary'
                )} key={index}>
                    <button>{category}</button>
                </Link>
            ) )
        }
    </div>
  );
}

