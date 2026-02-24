import { z } from 'zod';


export const loginFormSchema = () =>
  z.object({
    email: z.string().email('Please enter a valid email '),
    password: z.string().min(1, 'Please enter your password'),
    remember_me: z.boolean().default(false).optional(),
  });

export type LoginFormData = z.infer<ReturnType<typeof loginFormSchema>>;
