'use client';

import React, { PropsWithChildren } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast';


export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
        <SessionProvider>
            {children}
        </SessionProvider>
        <Toaster />
        <NextTopLoader color="#FF6900" height={3} />
    </>
  );
}

