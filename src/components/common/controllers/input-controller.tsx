'use client';

import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { useId } from 'react';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/utils';

export interface InputControllerProps<TFormValues extends FieldValues>
    extends Omit<React.ComponentProps<typeof Input>, 'name' | 'value' | 'onChange'> {
    name: Path<TFormValues>;
    label?: React.ReactNode;
    formItemClassName?: string;
    formatter?: (value: string) => string;
    parser?: (value: string) => string;
    optional?: boolean;
}

export function InputController<TFormValues extends FieldValues>({
    name,
    label,
    formItemClassName,
    formatter,
    parser,
    optional,
    ...props
}: InputControllerProps<TFormValues>) {
    const { control } = useFormContext<TFormValues>();
    const id = useId();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={cn('w-full', formItemClassName)}>
                    {label && (
                        <FormLabel htmlFor={id} className="!mb-1.5 block">
                            {label} {optional && <span className="text-gray-400">(Optional)</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <Input
                            id={id}
                            {...props}
                            {...field}
                            value={formatter ? formatter(field.value || '') : field.value || ''}
                            onChange={(e) => {
                                const rawValue = e.target.value;
                                const finalValue = parser ? parser(rawValue) : rawValue;
                                field.onChange(finalValue);
                            }}
                            className={cn(error && 'border-destructive')}
                        />
                    </FormControl>
                    <FormMessage className="mt-0.5 ltr:text-left rtl:text-right" />
                </FormItem>
            )}
        />
    );
}
