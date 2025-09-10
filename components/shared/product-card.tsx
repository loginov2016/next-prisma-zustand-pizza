/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import Link from 'next/link';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

interface IProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<IProductCardProps> = ({ id, name, price, imageUrl, ingredients, className }) => {
  // hover:-translate-y-3
  return (
    <div className={cn('flex flex-col justify-between rounded-lg transition duration-300 hover:shadow-[0px_5px_20px_rgba(255,105,0,0.4)] hover:scale-105', className)}>
      <Link href={`/product/${id}`} className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
      </Link>
      <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
      <p className="text-sm text-gray-400">
        {ingredients.map((item) => item.name).join(', ')}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>

        <Button variant='secondary' className="text-base font-bold">
          <Plus size={20} className="mr-1" />
          Добавить
        </Button>
      </div>
    </div>
  );
}

