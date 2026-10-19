'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Button, Container } from '../ui';
import { User } from '@prisma/client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema, TRegisterFormSchema } from './modals/auth-modal/forms';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Title } from './title';
import { FormInput } from './form';
import { updateUserInfo } from '@/app/actions';

interface IProfileFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    data: User;
}

export const ProfileForm: React.FC<IProfileFormProps> = ({ data, className }) => {
    const { data: session } = useSession();

    const form = useForm({
            resolver: zodResolver(registerFormSchema),
            defaultValues: {
                fullName: data.fullName,
                email: data.email,
                password: '',
                confirmPassword: '',
            }
        }
    );

    

    const onSubmit = async (data: TRegisterFormSchema) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.success(`Данные пользователя ${session?.user?.name} успешно обновлены`, { icon: '✅' });
        } catch (error) {
            console.log('[Profile Form Page onSubmit] Error', error);
            return toast.error('Ошибка при обновлении данных пользователя ${session?.user?.name}', { icon: '❌' });
        }
    };

    return (
    <Container className={cn('mt-10 flex flex-col items-center justify-center', className)}>
        <Title text={`Личный профиль пользователя: ${session?.user?.name}`} size="md" className="font-bold" />
        <FormProvider {...form} >
            <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name='fullName' label='Полное имя' required />
                <FormInput name='email' label='E-mail' required />
                <FormInput name='password' label='Новый пароль' required />
                <FormInput name='confirmPassword' label='Повторите пароль' required />
                <Button 
                    disabled={form.formState.isSubmitting} 
                    className="text-base mt-3" 
                    type="submit"
                >
                    Сохранить профиль
                </Button>
            </form>
        </FormProvider>
    </Container>
    );
}
