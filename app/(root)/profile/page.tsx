import { ProfileForm } from '@/components/shared';
import { getUserSession } from '@/lib/get-user-session';
import { cn } from '@/lib/utils';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IProfilePageProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export default async function ProfilePage({ className }: IProfilePageProps) {
    const session  = await getUserSession();

    if (!session) {
        redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({ where: { id: Number(session.id) } });
    
    if (!user) {
        return redirect('/not-auth');
    }

    return (
        <ProfileForm data={user} className={cn('', className)} />   
    );
}

