'use client';

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import React, { DetailedHTMLProps, HTMLAttributes, use, useEffect } from 'react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { ButtonProps } from '../ui/button';




interface IProfileButtonProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    onClickSignIn?: () => void;
    buttonVariantLogIn?: ButtonProps['variant'];
    buttonVariantProfile?: ButtonProps['variant'];
}

export const ProfileButton: React.FC<IProfileButtonProps> = ({ 
    onClickSignIn, 
    className, 
    buttonVariantLogIn='outline',
    buttonVariantProfile='secondary' }) => {
    const { data: session } = useSession();
    //const session = getUserSession();

    return (
        <div>
            {
                !session ? (
                    <Button
                        className={cn('flex items-center gap-1 hover:cursor-pointer', className)}
                        variant={buttonVariantLogIn}
                        onClick={onClickSignIn}
                    >
                        <User size={16} />
                        Войти
                    </Button>
                ) : (
                    <Link href="/profile">
                        <Button 
                            className={cn('flex items-center hover:cursor-pointer gap-2', className)}
                            variant={buttonVariantProfile}
                        >
                            <CircleUser size={18} />
                            {session.user?.name ?  session.user?.name : 'Войти'}
                        </Button>
                    </Link>
                )
            }
        </div>
    );
}

