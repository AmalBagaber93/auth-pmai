import { z } from 'zod';

export const otpFormSchema = () =>
    z.object({
        otp_code: z
            .string()
            .length(6, 'Please enter the full 6-digit code')
            .regex(/^\d{6}$/, 'Code must contain digits only'),
    });

export type OtpFormData = z.infer<ReturnType<typeof otpFormSchema>>;
