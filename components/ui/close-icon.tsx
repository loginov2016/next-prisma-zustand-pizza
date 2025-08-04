import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, SVGProps } from 'react';

interface ICloseIconProps extends DetailedHTMLProps< SVGProps<SVGSVGElement>, SVGSVGElement > {
  
}

export const CloseIcon: React.FC<ICloseIconProps> = ({ className, width=24, height=24, stroke="currentColor" }) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={cn("lucide lucide-circle-x-icon lucide-circle-x", className)}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  );
}

