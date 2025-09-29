'use client';

/* eslint-disable @next/next/no-img-element */

/* 
    Была ошибка: Attempted import error: 'FormProvider' is not exported from 'react-hook-form' (imported as 'FormProvider').
    Решение: 'use client';
*/

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { loginFormSchema, TLoginFormSchema } from './schemas';
import { FormInput, Title } from '@/components/shared';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';


interface ILoginFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    onClose?: () => void;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ onClose, className }) => {
    const form = useForm<TLoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TLoginFormSchema) => {
        //console.log(data);
        try {
            const response = await signIn('credentials', {
                ...data,
                redirect: false,
            })

            if ( !response?.ok ) {
                throw new Error();
                //return toast.error('Не удалось войти в аккаунт', { icon: '❌' });
            }

            toast.success('Вы успешно вошли в аккаунт 📝', { icon: '✅' });
            onClose?.();
            
        } catch (error) {
            console.error('Error [Login Form]', error);
            toast.error('Не удалось войти в аккаунт', { icon: '❌' });
        }
    };

    return (
        <FormProvider {...form}>
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center">
                        <div className="mr-2">
                            <Title text='Вход в аккаунт' size='md' className="font-bold" />
                            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
                        </div>
                        <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
                    </div>
                    <FormInput name="email"    label='E-mail' required />
                    <FormInput name="password" label='Пароль' type="password" required />
                    <Button 
                        loading={form.formState.isSubmitting}
                        className='h-12 text-base' 
                        type="submit"
                    >
                        Войти
                    </Button>
                
            </form>    
        </FormProvider>
    );
}

