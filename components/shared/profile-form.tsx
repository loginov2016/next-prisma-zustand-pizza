'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Button, Container } from '../ui';
import { User } from '@prisma/client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema, TRegisterFormSchema } from './modals/auth-modal/forms';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Title } from './title';
import { FormInput } from './form';
import { updateUserInfo } from '@/app/actions';

interface IProfileFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    data: User;
}

export const ProfileForm: React.FC<IProfileFormProps> = ({ data, className }) => {
    const [buttonSignOutLoading, setButtonSignOutLoading] = useState<boolean>(false);

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

            toast.success('Данные обновлены', { icon: '✅' });
        } catch (error) {
            console.log('[Profile Form Page onSubmit] Error', error);
            return toast.error('Ошибка при обновлении данных', { icon: '❌' });
        }
    };

    const onClickSignOut = async () => {
        setButtonSignOutLoading(true);
        await signOut({
            callbackUrl: '/',
        });
        setButtonSignOutLoading(false);
    }

    return (
    <Container className={cn('my-10 flex flex-col items-center justify-center', className)}>
        <Title text={`Личные данные пользователя / ${data.fullName}`} size="md" className="font-bold" />
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
                Сохранить
                </Button>
                <Button
                    loading={buttonSignOutLoading}
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={form.formState.isSubmitting} 
                    className="text-base mt-3 hover:cursor-pointer" 
                    type="button"
                >
                Выйти из профиля
                </Button>
            </form>
        </FormProvider>
    </Container>
    );
}
