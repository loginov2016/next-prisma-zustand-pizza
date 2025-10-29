'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';
import { TProductWithOptions } from '@/@types/prisma';
import { useInView } from 'react-intersection-observer';

interface IProductsGroupListProps {
  title: string;
  products: TProductWithOptions[];
  listClassName?: string;
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: React.FC<IProductsGroupListProps> = ({ title, products, listClassName, categoryId, className }) => {
  const setActiveCategoryId = useCategoryStore( state => state.setActiveId );
  
  const { ref, inView  } = useInView( {
    threshold: 0.6,
  } );
  
  React.useEffect( () => {
    if( inView ) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, inView, setActiveCategoryId, title]);

  return (
    <div className={className} id={title} ref={ref}>
      <Title text={title} size="lg" className='font-extrabold max-sm:text-center mb-5' />
      <div className={cn('grid gap-[50px] auto-fit-[280px]', listClassName)}>
        {
          products.map( (product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.productVariations[0].price}
              ingredients={product.ingredients}
            />
          ) )
        }
      </div>
    </div>
  );
}

