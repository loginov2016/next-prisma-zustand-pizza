import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Container, Categories, SortPopup } from '.';

interface ITopBarProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  
}

export const TopBar: React.FC<ITopBarProps> = ({ className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className="flex items-center justify-between">
            <Categories />
            <SortPopup />
        </Container>
    </div>
  );
}

