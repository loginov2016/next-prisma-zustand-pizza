import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Title } from './title';
import Link from 'next/link';

interface INavigationLinksProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export const NavigationLinks: React.FC<INavigationLinksProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-grow-1 flex-shrink-0', className)}>
      <div className='flex flex-wrap gap-10'>
        <section className='flex flex-col gap-3'>
          <h4 className='font-extrabold text-white/60'>Партнёрам</h4>
          <Link href='#' className='hover:text-white/60'>Франшиза</Link>
          <Link href='#' className='hover:text-white/60'>Инвестиции</Link>
          <Link href='#' className='hover:text-white/60'>Поставщикам</Link>
          <Link href='#' className='hover:text-white/60'>Предложить помещение</Link>
        </section>
        <section className='flex flex-col gap-3'>
          <h4 className='font-extrabold text-white/60'>Это интересно</h4>
          <Link href='#' className='hover:text-white/60'>Экскурсии и мастер классы</Link>
          <Link href='#' className='hover:text-white/60'>Почему мы готовим без перчаток</Link>
        </section>
        <section className='flex flex-col gap-3'>
          <h4 className='font-extrabold text-white/60'>Контакты</h4>
          <Link href='tel:89097045551' target='_blank' className='hover:text-white/60'>Мой тел-н: +7(909)704-55-51</Link>
          <Link href='mailto:loginov_av@mail.ru' target='_blank' className='hover:text-white/60'>Моя почта: loginov_av@mail.ru</Link>
        </section>
      </div>
    </div>
    
  );
}

