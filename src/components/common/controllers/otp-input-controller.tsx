'use client';

import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { useId } from 'react';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/utils/utils';

export interface OtpInputControllerProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    label?: React.ReactNode;
    maxLength?: number;
    containerClassName?: string;
    formItemClassName?: string;
    disabled?: boolean;
}

export function OtpInputController<TFormValues extends FieldValues>({
    name,
    label,
    maxLength = 6,
    containerClassName,
    formItemClassName,
    disabled,
}: OtpInputControllerProps<TFormValues>) {
    const { control } = useFormContext<TFormValues>();
    const id = useId();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={cn('w-full flex flex-col items-center', formItemClassName)}>
                    {label && (
                        <FormLabel htmlFor={id} className="mb-4 text-[#f0f0ff]/70 text-sm font-medium">
                            {label}
                        </FormLabel>
                    )}
                    <FormControl>
                        <InputOTP
                            id={id}
                            maxLength={maxLength}
                            disabled={disabled}
                            value={field.value}
                            onChange={field.onChange}
                            containerClassName={cn("justify-center", containerClassName)}
                        >
                            <InputOTPGroup className="gap-2 md:gap-3">
                                {Array.from({ length: maxLength }).map((_, index) => (
                                    <InputOTPSlot
                                        key={index}
                                        index={index}
                                        className={cn(
                                            "w-11 h-13 md:w-14 md:h-16 text-xl md:text-2xl font-bold rounded-xl border-white/10 bg-white/5 text-white transition-all duration-300",
                                            "data-[active=true]:border-[#a78bfa] data-[active=true]:bg-[#a78bfa]/10 data-[active=true]:ring-0",
                                            error && "border-destructive/50 bg-destructive/5"
                                        )}
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormMessage className="mt-4 text-center" />
                </FormItem>
            )}
        />
    );
}
