import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '../form';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface ICheckoutDeliveryAddressBlockProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export const CheckoutDeliveryAddressBlock: React.FC<ICheckoutDeliveryAddressBlockProps> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title='3. Адрес доставки' className={cn('', className)}>
        <div className="flex flex-col gap-5">
            <Controller 
              name='address'
              control={control}
              render={({ field, fieldState }) => <>
                <AddressInput onChangeAddress={field.onChange} />
                {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                </>}
            />
            <FormTextarea
                name='comment'
                className='text-base'
                placeholder='Комментарий к заказу'
                rows={8}
            />
        </div>
    </WhiteBlock>
  );
}

