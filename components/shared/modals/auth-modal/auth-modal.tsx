/* eslint-disable @next/next/no-img-element */

import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Button } from '@/components/ui';
import { signIn } from 'next-auth/react';
import { LoginForm, RegisterForm } from './forms';


interface IAuthModalProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<IAuthModalProps> = ({ open, onClose, className }) => {
    const [type, setType] = React.useState<'login' | 'register'>('login');

    const onSwitchType = () => {
        setType( type === 'login' ? 'register' : 'login' );
    }

    const handleClose = () => {
        onClose();
    }
    // cn('p-0 !w-[400px] !max-w-[400px] min-h-[400px] bg-white overflow-hidden'
    return (
        <Dialog open={open} onOpenChange={ handleClose }>
            <DialogContent className={cn('w-[450px] bg-white p-10', className)}>
                
                {
                    type === 'login' ? (
                        <LoginForm onClose={handleClose} />
                    ) : (
                        <RegisterForm onClose={handleClose} />
                    )
                }

                <hr />
                <div className="flex gap-2">
                    <Button 
                        variant="secondary" 
                        onClick={ () => {
                            signIn('github', { 
                                callbackUrl: '/',
                                redirect: true, 
                                }
                            );
                        } }
                        type='button'
                        className='gap-2 h-12 p-2 flex-1'    
                    >
                        <img src="https://github.githubassets.com/favicons/favicon.svg" alt="github-icon" className="w-6 h-6" />
                        Github
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={ () => {
                            signIn('google', { 
                                callbackUrl: '/',
                                redirect: true, 
                                }
                            );
                        } }
                        type='button'
                        className='gap-2 h-12 p-2 flex-1'    
                    >
                        <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="google-icon" className="w-6 h-6" />
                        Google
                    </Button>
                </div>

                <Button 
                    variant="outline"
                    onClick={onSwitchType}
                    type='button'
                    className='h-12'
                >
                    { type === 'login' ? 'Войти' : 'Регистрация' }
                </Button>        
            </DialogContent>
        </Dialog>
    );
}

