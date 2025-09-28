import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IRegisterFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  onClose?: () => void;
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ onClose, className }) => {
  return (
    <div className={cn('', className)}>
      
    </div>
  );
}

