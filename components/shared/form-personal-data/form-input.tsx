import { cn } from "@/lib/utils"
import { RequiredSymbol } from "../required-symbol"
import { Input } from "@/components/ui"

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /* name: string;
    label?: string;
    required?: boolean; */
}

export const FormInput: React.FC<IFormInputProps> = ({name, label, required, className, ...props}) => {



    return (
        <div className={cn('', className)}>
            <Input name='phone' className='text-base' placeholder='Телефон' />
            {label && (
                    <p className="font-medium mb-2">
                        {label} {required && <RequiredSymbol />}
                    </p>
                )
            }

            <div className='relative'>
                <Input  name={name} className='h-12 text-md' placeholder={label} {...props} />


            </div>

            
        </div>
    )
}