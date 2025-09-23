'use server';

import { Resend } from 'resend';

export const sendEmail = async ( to: string, subject: string, template: React.ReactNode) => {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    //console.log('API_KEYS:___', resend.apiKeys.list().then(res => console.log(res)));

    const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            text: '',
            react: template,
    });

    if (error) {
        throw error;
    }

    return data;
}