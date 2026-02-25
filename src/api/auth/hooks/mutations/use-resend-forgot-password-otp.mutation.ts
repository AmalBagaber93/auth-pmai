import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  resendForgotPasswordOtp,
  type IResendForgotPasswordOtpRequest,
  type IResendForgotPasswordOtpResponse,
} from '../../client/resend-forgot-password-otp';

export function useResendForgotPasswordOtpMutation() {
  return useMutation<
    IResendForgotPasswordOtpResponse,
    Error,
    IResendForgotPasswordOtpRequest
  >({
    retry: false,
    mutationFn: resendForgotPasswordOtp,
    onSuccess: response => {
      toast.success(response.data.message || 'A verification code has been sen');
    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      toast.error(data.message || 'Something went wrong');
    },
  });
}
