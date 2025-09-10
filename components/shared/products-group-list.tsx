'use client';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';
import { TProductWithOptions } from '@/@types/prisma';

interface IProductsGroupListProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  title: string;
  products: TProductWithOptions[];
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<IProductsGroupListProps> = ({ title, products, listClassName, categoryId, className }) => {
  const setActiveCategoryId = useCategoryStore( state => state.setActiveId );
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect( () => {
    if( intersection?.isIntersecting ) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, title, categoryId, setActiveCategoryId]);

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

