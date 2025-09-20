import { cn } from "@/lib/utils"
import { RequiredSymbol } from "../required-symbol"
import { Input } from "@/components/ui"
import { ErrorText } from "../error-text"
import { ClearButton } from "../clear-button"
import { useForm, useFormContext } from "react-hook-form"

export interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
}

export const FormInput: React.FC<IFormInputProps> = ({name, label, required, className, ...props}) => {

    const { register, formState: { errors }, watch, setValue } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;
    const onClickClearButton = () => setValue(name, '', { shouldValidate: true });


    //console.log({register});
    return (
        <div className={cn('', className)}>
            {label && (
                    <p className="font-medium mb-2">
                        {label} {required && <RequiredSymbol />}
                    </p>
                )
            }

            <div className='relative'>
                <Input className='h-12 text-md' placeholder={label} {...register(name)} {...props} />
                {value && <ClearButton onClickButton={onClickClearButton} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    )
}