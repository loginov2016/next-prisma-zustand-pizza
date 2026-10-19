'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { Container } from '../ui/container';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';
import { ProfileSignOutButton } from './profile-sign-out-button';

interface IHeaderProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  hasSearch?: boolean;
  hasCartButton?: boolean;
  hasProfileButton?: boolean;
  hasProfileSignOutButton?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ hasSearch = true, hasCartButton = true, hasProfileButton = true, hasProfileSignOutButton = false, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    //console.log('Header');
    let toastMessage = '';
    if ( searchParams.has('success') ) {
      toastMessage = 'Заказ успешно оплачен📝! Информация о заказе отправлена на почту.'
    }
    if ( searchParams.has('verified') ) {
      toastMessage = 'Почта успешно подтверждена📝!'
    }
    if ( toastMessage ) {
      setTimeout(() => {
        router.replace('/', { scroll: false });
        toast.success(toastMessage, {icon: '✅'});
      }, 1000);
    }
  }, [router, searchParams]); // Поставил зависимости router, searchParams

  // flex items-center justify-between py-12
  return (
    <header className={cn('border-b', className)}>
      <Container className='flex max-sm:flex-col max-sm:py-3 items-center justify-between py-12'>
        {/* Левая часть Header*/}
        <Link href='/' className='max-sm:flex max-sm:w-[100%] max-sm:justify-center max-sm:my-3'>
          <div className='flex items-center gap-4'>
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
                <h1 className='text-2xl uppercase font-black'>Super Pizza</h1>
                <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
            </div>
          </div>
        </Link>
        
        { hasSearch && (
            <div className="mx-10 flex-1 max-sm:my-3 max-sm:justify-stretch">
              <SearchInput />
            </div>
          )
        }
        
        {/* Правая часть Header */}
        <div className="flex items-center max-sm:my-3 gap-3">
            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
            {hasProfileButton && <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />}
            {hasProfileSignOutButton && <ProfileSignOutButton />}  
            { hasCartButton && <CartButton />}
        </div>
      </Container>
    </header>
  );
}

