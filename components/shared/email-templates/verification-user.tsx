import React from 'react';

export interface IVerificationCodeProps {
  code: string;
}

export function VerificationUser({ code }: IVerificationCodeProps) {
  return (
    <div>
        <p>Код подтверждения: <h2>{code}</h2></p>
        <p> 
            Перейдите <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>по этой ссылке</a> для подтверждения вашего аккаунта.
        </p>
    </div>
  );
}