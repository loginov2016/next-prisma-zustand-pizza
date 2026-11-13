'use client';

import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { registerFormSchema, TRegisterFormSchema } from './schemas';
import { FormInput } from '@/components/shared';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';


interface IRegisterFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    onClose?: () => void;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ onClose }) => {
    const form = useForm<TRegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
          email: '',
          fullName: '',
          password: '',
          confirmPassword: '',
        },
    });

    const onSubmit = async (data: TRegisterFormSchema) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.log('[Register Form Page onSubmit] Error', error);
      return toast.error('Такой E-Mail или пароль уже существует', {
        icon: '❌',
      });
    }
  };


    return (
        <FormProvider {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="email" label="E-Mail" required />
            <FormInput name="fullName" label="Полное имя" required />
            <FormInput name="password" label="Пароль" type="password" required />
            <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

            <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
              Зарегистрироваться
            </Button>
          </form>
        </FormProvider>
    );
}













/* import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IRegisterFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  onClose?: () => void;
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ onClose, className }) => {
  return (
    <div className={cn('', className)}>
      
    </div>
  );
} */

