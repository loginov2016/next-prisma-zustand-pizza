import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Container, Categories, SortPopup } from '.';
import { Category } from '@prisma/client';

interface ITopBarProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  categories: Category[];
}

// flex items-center justify-between
export const TopBar: React.FC<ITopBarProps> = ({categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className="grid grid-cols-[repeat(2,min-content)] max-sm:grid-cols-1 items-center justify-between">
            <Categories items={categories} />
            <SortPopup />
        </Container>
    </div>
  );
}

