import { cn } from '@/lib/utils';
import React from 'react';

interface IErrorTextProps {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<IErrorTextProps> = ({ text, className }) => {
  return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
};
