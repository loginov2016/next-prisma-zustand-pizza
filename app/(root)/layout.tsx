import type { Metadata } from "next";
import { Header } from "@/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Super Pizza | Главная",
  description: "Super pizza",
};

/* 
  Next.js Application error: a client-side exception has occurred while loading localhost 
  (see the browser console for more information)
  Решением ошибки стало удаление папки .next и перегрузка сервера.
*/


export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Header />
      {children}
      {modal}
    </main>
  );
}
