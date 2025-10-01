'use client';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';
import { TProductWithOptions } from '@/@types/prisma';

interface IProductsGroupListProps {
  title: string;
  products: TProductWithOptions[];
  listClassName?: string;
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: React.FC<IProductsGroupListProps> = ({ title, products, listClassName, categoryId, className }) => {
  const setActiveCategoryId = useCategoryStore( state => state.setActiveId );
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '10px',
    threshold: 0.6,
  });

  React.useEffect( () => {
    if( intersection?.isIntersecting ) {
      //console.log('intersection?.isIntersecting : ', intersection?.isIntersecting);
      //console.log('title: ', title, 'categoryId: ', categoryId);
      setActiveCategoryId(categoryId);
    }
    //console.log('intersection?.isIntersecting : ', intersection?.isIntersecting);
    //console.log('title: ', title, 'categoryId: ', categoryId);
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={cn('', className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className='font-extrabold mb-5' />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
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

