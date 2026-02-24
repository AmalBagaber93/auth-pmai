import { z } from 'zod';

export const registerFormSchema = () =>
  z
    .object({
      first_name: z
        .string()
        .min(1, 'first name is requird')
        .max(50, 'first name is too long'),
      last_name: z
        .string()
        .min(1, 'last name is requird')
        .max(50, 'last name is too long'),
      email: z.string().email('invalid email format'),
      password: z
        .string()
        .min(8, 'password is too short')
        .regex(/[0-9]/, 'password must contain a number')
        .regex(/[!@#$%^&*]/, 'password must contain a special character')
        .regex(/[A-Z]/, 'password must contain an uppercase letter'),
      password_confirmation: z.string({
        message: 'passwords do not match',
      }),
      terms_accepted: z
        .boolean('You must accept the Terms and Conditions to continue')
        .refine(val => val === true, {
          message: 'You must accept the Terms and Conditions to continue',
        }),
    })
    .refine(data => data.password === data.password_confirmation, {
      message: 'passwords do not match',
      path: ['password_confirmation'],
    });

export type RegisterFormData = z.infer<ReturnType<typeof registerFormSchema>>;
