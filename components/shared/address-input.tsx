'use client';

import { DADATA_API_KEY } from '@/constants/dadata';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';




interface IAddressInputProps {
    onChangeAddress?: (value?: string) => void
}

export const AddressInput: React.FC<IAddressInputProps> = ({ onChangeAddress }) => {
    
    return (
        <AddressSuggestions 
            inputProps={{ placeholder: 'Введите адрес...', className: 'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-12 text-md' }}    
            token={DADATA_API_KEY} 
            onChange={ (data) => onChangeAddress?.(data?.value) } 
        />
    )
}


