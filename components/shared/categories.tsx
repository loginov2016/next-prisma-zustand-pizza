'use client';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import type { Category } from '@prisma/client';
import Link from 'next/link';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';


interface ICategoriesProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    items: Category[];
}

export const Categories: React.FC<ICategoriesProps> = ({ items, className }) => {
    const activeCategoryId = useCategoryStore( state => state.activeId );
    
    return (
        <div className={cn('inline-flex bg-gray-50 rounded-2xl gap-1 p-1', className)}>
            {
                items.map( (category) => (
                    <Link 
                        href={`/#${category.name}`} 
                        className={cn('flex items-center font-bold h-11 rounded-2xl px-5', 
                        {'bg-white shadow-md shadow-gray-200 text-primary': activeCategoryId === category.id })} 
                        key={category.id}
                    >
                        <button>{category.name}</button>
                    </Link>
                ) )
            }
        </div>
    );
}

