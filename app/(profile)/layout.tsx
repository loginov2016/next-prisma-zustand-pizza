import type { Metadata } from "next";
import { Container, Header } from "@/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Super Pizza | Профиль пользователя",
  description: "Super pizza",
};

/* 
  Next.js Application error: a client-side exception has occurred while loading localhost 
  (see the browser console for more information)
  Решением ошибки стало удаление папки .next и перегрузка сервера.
*/


export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Container>
        <Suspense>
          <Header hasSearch={false} hasCartButton={false} hasProfileButton={false} hasProfileSignOutButton={true} />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
