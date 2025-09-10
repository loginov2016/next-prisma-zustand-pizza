'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Container } from '../ui/container';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useCartStore } from '@/store';

interface IHeaderProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
 
}

export const Header: React.FC<IHeaderProps> = ({ className }) => {
  /* const totalAmount = useCartStore( state => state.totalAmount);
  const cartItems   = useCartStore( state => state.cartItems ); */


  return (
    <header className={cn('border border-b', className)}>
      <Container className='flex items-center justify-between py-12'>
        {/* Левая часть Header*/}
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
                <h1 className='text-2xl uppercase font-black'>Super Pizza</h1>
                <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
            </div>
          </div>
        </Link>
        
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Правая часть Header*/}
        <div className="flex items-center gap-3">
            <Button variant="outline" className='flex items-center gap-1'>
                <User size={16} />
                Войти
            </Button>

            <CartButton />
        </div>
      </Container>
    </header>
  );
}

