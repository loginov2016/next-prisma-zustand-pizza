import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Title } from './title';

interface IProductDataProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    
}

export const ProductData: React.FC<IProductDataProps> = ({ className }) => {
    const textDetails = '30 см, традиционное тесто 30';
    return (
    <div className={cn('', className)}>
        <Title 
            className="font-extrabold mb-1"
            text={name}
            size={'md'} 
        />
        <p className="text-gray-400">{textDetails}</p>
    </div>
    );
}

