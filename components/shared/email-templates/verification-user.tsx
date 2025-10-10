import React from 'react';

export interface IVerificationCodeProps {
  code: string;
}

// https://super-pizza-psi.vercel.app
export function VerificationUser({ code }: IVerificationCodeProps) {
  const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN_HOST || 'https://super-pizza-psi.vercel.app';
  return (
    <div>
        <p>Код подтверждения: <h2>{code}</h2></p>
        <p> 
            Перейдите <a href={`${DOMAIN_HOST}/api/auth/verify?code=${code}`}>по этой ссылке</a> для подтверждения вашего аккаунта.
        </p>
    </div>
  );
}