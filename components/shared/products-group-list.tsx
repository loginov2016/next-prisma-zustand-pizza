import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';

interface IProductsGroupListProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  title: string;
  products: any[];
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<IProductsGroupListProps> = ({ title, products, listClassName, categoryId, className }) => {
  return (
    <div className={cn('', className)}>
      <Title text={title} size="lg" className='font-extrabold mb-5' />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {
          products.map( (product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
            />
          ) )
        }
      </div>
    </div>
  );
}

