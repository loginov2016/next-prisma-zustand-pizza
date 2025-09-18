import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Container } from '../ui/container';
import { NavigationLinks } from './navigation-links';
import Link from 'next/link';
import { NavigationApps } from './navigation-apps';
import { FranchiseStats } from './franchise-stats';
import { LegalInfo } from './legal-info';
import { SocialLinks } from './social-links';
import { OrganizationInfo } from './organization-info';

interface IFooterProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  
}

export const Footer: React.FC<IFooterProps> = ({ className }) => {
  return (
    <footer className={cn('border border-t bg-[#181818] py-10 text-[rgb(255,255,255)]', className)}>
      <Container>
        <div className="flex flex-col flex-nowrap gap-14 w-full">
          <div className='flex flex-grow-1 flex-shrink-1 gap-10'>
            <NavigationLinks />
            <NavigationApps />
          </div>
          <div className='flex gap-10'>
            <FranchiseStats />
          </div>
          <div  className='flex flex-wrap gap-5 border-t-[0.5px] border-solid border-white/40 pt-5 font-[500] text-[14px] leading-[18px]'>
            <LegalInfo />
            <SocialLinks />
            <OrganizationInfo />
          </div>
        </div>
      </Container>
    </footer>
  );
}

