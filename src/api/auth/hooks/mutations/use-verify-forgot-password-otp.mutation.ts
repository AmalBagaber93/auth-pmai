import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  verifyForgotPasswordOtp,
  type IVerifyForgotPasswordOtpRequest,
  type IVerifyForgotPasswordOtpResponse,
} from '../../client/verify-forgot-password-otp';
import Cookies from 'js-cookie';

export function useVerifyForgotPasswordOtpMutation() {

  return useMutation<
    IVerifyForgotPasswordOtpResponse,
    Error,
    IVerifyForgotPasswordOtpRequest
  >({
    retry: false,
    mutationFn: verifyForgotPasswordOtp,
    onSuccess: response => {
      toast.success(response.data.message || 'Otp verified successfully');
      Cookies.set('reset_token', response.data.reset_token)

    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      toast.error(data.message || 'Something went wrong');
    },
  });
}
