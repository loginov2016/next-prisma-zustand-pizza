'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";


interface IProfileSignOutButtonProps {
    className?: string;
}

export const ProfileSignOutButton = ({ className }: IProfileSignOutButtonProps) => {
    const { data: session } = useSession();
    const [buttonSignOutLoading, setButtonSignOutLoading] = useState<boolean>(false);

    const onClickSignOut = async () => {
            setButtonSignOutLoading(true);
            await signOut({
                callbackUrl: '/',
            });
            setButtonSignOutLoading(false);
            toast.success(`Вы успешно вышли из профиля пользователя ${session?.user?.name}`, { icon: '✅', duration: 5000 });
        }

    return (
        <div className={cn('', className)}>
            <Button
                    loading={buttonSignOutLoading}
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={buttonSignOutLoading} 
                    className="text-base mt-3 hover:cursor-pointer" 
                    type="button"
                >
                Выйти из профиля
            </Button>
        </div>
    );
};
