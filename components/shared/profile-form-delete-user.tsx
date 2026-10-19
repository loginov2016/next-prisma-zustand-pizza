'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Button, Container } from '../ui';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteUserFormSchema,  TDeleteUserFormSchema } from './modals/auth-modal/forms';
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import { FormInput } from './form';
import { deleteUserInfo } from '@/app/actions';

interface IProfileFormDeleteUserProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    //data: User;
    className?: string;
}

export const ProfileFormDeleteUser: React.FC<IProfileFormDeleteUserProps> = ({ className }) => {
    const { data: session } = useSession();

    const form = useForm<TDeleteUserFormSchema>({
            resolver: zodResolver(deleteUserFormSchema),
            defaultValues: {
                currentPassword: '',
            }
        }
    );

    const onSubmit = async (data: TDeleteUserFormSchema) => {
        try {
            await deleteUserInfo(data.currentPassword);
            await signOut({
            callbackUrl: '/',
            });
            toast.success(`Пользователь удалён ${session?.user?.name}`, { icon: '✅', duration: 3000 });
        } catch (error) {
            console.log('[Profile Form Delete User onSubmit] Error', error);
            return toast.error(`Неверный пароль пользователя ${session?.user?.name}`, { icon: '❌', duration: 2000 });
        }
    };

    return (
    <Container className={cn('flex flex-col items-center justify-center', className)}>
        <FormProvider {...form} >
            <form className="flex flex-col gap-5 w-96 mt-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name='currentPassword' label='Текущий пароль' required />
                <Button 
                    disabled={form.formState.isSubmitting} 
                    className="text-base mt-3" 
                    type="submit"
                >
                    Удалить профиль
                </Button>
            </form>
        </FormProvider>
    </Container>
    );
}
