import { z } from 'zod';

export const otpForgotPasswordFormSchema = () =>
    z.object({
        otp_code: z
            .string()
            .length(6, 'Please enter the full 6-digit code')
            .regex(/^\d{6}$/, 'Code must contain digits only'),
    });

export type OtpForgotPasswordFormData = z.infer<ReturnType<typeof otpForgotPasswordFormSchema>>;
