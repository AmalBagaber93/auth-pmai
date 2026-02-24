import * as React from 'react';
import { cn } from '@/utils/utils';


function Input({
  className,
  type,
  ref,
  ...props
}: React.ComponentProps<'input'> & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <input
      type={type}
      className={cn(
        'border-input bg-background !p-2  ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border  text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
}
Input.displayName = 'Input';

export { Input };
