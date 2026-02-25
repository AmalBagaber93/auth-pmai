'use client';

import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/utils'

import { useId } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export interface PasswordFieldControllerProps<
  TFormValues extends FieldValues,
> extends Omit<React.ComponentProps<typeof Input>, 'name' | 'type'> {
  name: Path<TFormValues>;
  label?: React.ReactNode;
  formItemClassName?: string;
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
}

export function PasswordFieldController<TFormValues extends FieldValues>({
  name,
  label,
  formItemClassName,
  formatter,
  parser,
  ...props
}: PasswordFieldControllerProps<TFormValues>) {
  const { control } = useFormContext<TFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn('w-full', formItemClassName)}>
          {label && (
            <FormLabel htmlFor={id} className='!mb-1.5 block'>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className='relative'>
              <Input
                id={id}
                {...props}
                {...field}
                type={showPassword ? 'text' : 'password'}
                value={formatter ? formatter(field.value || '') : field.value || ''}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  const finalValue = parser ? parser(rawValue) : rawValue;
                  field.onChange(finalValue);
                }}
                className={cn(error && 'border-destructive pr-10')}
              />
              {/* Toggle Eye Button */}
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-1/2 right-2 -translate-y-1/2 !p-1 text-gray-500 hover:text-gray-700'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>
          </FormControl>
          <FormMessage className='mt-0.5 ltr:text-left rtl:text-right' />
        </FormItem>
      )}
    />
  );
}
