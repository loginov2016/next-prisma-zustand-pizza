'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { signOut, useSession } from "next-auth/react";
//import { useState } from "react";
import toast from "react-hot-toast";
import { CircleUser } from "lucide-react";
import { ButtonProps } from "../ui/button";


interface IProfileSignOutButtonProps {
    className?: string;
    buttonVariantProfileSignOut?: ButtonProps['variant'];
}

export const ProfileSignOutButton = ({ className, buttonVariantProfileSignOut='outline' }: IProfileSignOutButtonProps) => {
    const { data: session } = useSession();
    //const [buttonSignOutLoading, setButtonSignOutLoading] = useState<boolean>(false);

    const onClickSignOut = async () => {
            //setButtonSignOutLoading(true);
            await signOut({
                callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN_HOST}`,
            });
            //setButtonSignOutLoading(false);
            toast.success(`Вы успешно вышли из профиля пользователя ${session?.user?.name}`, { icon: '✅', duration: 5000 });
        }

    return (
        <Button
            //loading={buttonSignOutLoading}
            onClick={onClickSignOut}
            variant={buttonVariantProfileSignOut}
            //disabled={buttonSignOutLoading} 
            className={cn('text-base hover:cursor-pointer gap-2', className)}
            type="button"
        >
            <CircleUser size={18} />
            Выйти
        </Button>
    );
};
