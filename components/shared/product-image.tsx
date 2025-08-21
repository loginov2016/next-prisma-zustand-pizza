/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IProductImageProps extends DetailedHTMLProps< HTMLAttributes<HTMLImageElement>, HTMLImageElement > {
  name: string;
  imageUrl: string;
}

export const ProductImage: React.FC<IProductImageProps> = ({ name, imageUrl, className }) => {
  return (
  <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
    <img 
      src={imageUrl} 
      alt={name}
      className={cn('relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]', className)}
    />
  </div>
  );
}


/* 
  {categoryId == 1 && (
          <>
            <PizzaImage name={name} imageUrl={imageUrl} size={size}/>
          </>
        )
      }
      {categoryId !== 1 && (
        <img 
          src={imageUrl} 
          alt={name}
          className={cn('relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]', className)}
        />
      )}
*/
