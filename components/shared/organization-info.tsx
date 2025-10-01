import { cn } from '@/lib/utils';
import React from 'react';

interface IOrganizationInfoProps {
  className?: string;
}

export const OrganizationInfo: React.FC<IOrganizationInfoProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-grow-0 flex-shrink-0 basis-auto w-full text-[rgba(255,255,255,0.3)] font-[500] text-[12px] leading-[16px]', className)}>
      © 2025 ООО &laquo;SUPER PIZZA Франчайзинг&raquo; <br/>
      ОГРН 322385000080445, ИНН 380896247082 <br/>
      Почтовый индекс: 664033, Екатеринбург, ул.Пушкина д.9
    </div>
  );
}

