import { useFormContext, Path, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/utils/utils';
import { Checkbox } from '@/components/ui/checkbox';

export interface CheckboxFieldControllerProps<
  TFormValues extends FieldValues,
> extends Omit<
  React.ComponentProps<typeof Checkbox>,
  'name' | 'checked' | 'onCheckedChange'
> {
  name: Path<TFormValues>;
  label?: React.ReactNode;
  formItemClassName?: string;
}

export function CheckboxFieldController<TFormValues extends FieldValues>({
  name,
  label,
  formItemClassName,
  ...props
}: CheckboxFieldControllerProps<TFormValues>) {
  const { control } = useFormContext<TFormValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn('w-auto', formItemClassName)}>
          <div className='flex items-start !space-x-2'>
            <FormControl>
              <Checkbox
                {...props}
                checked={field.value}
                onCheckedChange={field.onChange}
                className={cn(props.className, error && 'border-destructive')}
              />
            </FormControl>
            {label && (
              <FormLabel className='mt-0! leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                {label}
              </FormLabel>
            )}
          </div>
          <FormMessage className='mt-0.5 ltr:text-left rtl:text-right' />
        </FormItem>
      )}
    />
  );
}
