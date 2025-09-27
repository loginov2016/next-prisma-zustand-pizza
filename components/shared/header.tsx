'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { Container } from '../ui/container';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface IHeaderProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  hasSearch?: boolean;
  hasCartButton?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ hasSearch = true, hasCartButton = true, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  console.log('session: ', session);

  useEffect(() => {
    //console.log('Header');

    if ( searchParams.has('success') ) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Информация о заказе отправлена на почту', {icon: '✅'});
      }, 0);
    }
  }, []);


  return (
    <header className={cn('border-b', className)}>
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
        
        { hasSearch && (
            <div className="mx-10 flex-1">
              <SearchInput />
            </div>
          )
        }
        
        {/* Правая часть Header */}
        <div className="flex items-center gap-3">
            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            { hasCartButton && <CartButton />}
        </div>
      </Container>
    </header>
  );
}

