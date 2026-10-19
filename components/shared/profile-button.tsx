'use client';

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import React, { DetailedHTMLProps, HTMLAttributes, use, useEffect } from 'react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';




interface IProfileButtonProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    onClickSignIn?: () => void;
}

export const ProfileButton: React.FC<IProfileButtonProps> = ({ onClickSignIn, className }) => {
    const { data: session } = useSession();
    //const session = getUserSession();

    return (
        <div className={cn('', className)}>
            {
                !session ? (
                    <Button
                        className='flex items-center gap-1 hover:cursor-pointer'
                        variant="outline"
                        onClick={onClickSignIn}
                    >
                        <User size={16} />
                        Войти
                    </Button>
                ) : (
                    <Link href="/profile">
                        <Button variant='secondary' className='flex items-center hover:cursor-pointer gap-2'>
                            <CircleUser size={18} />
                            {session.user?.name ?  session.user?.name : 'Войти'}
                        </Button>
                    </Link>
                )
            }
        </div>
    );
}

