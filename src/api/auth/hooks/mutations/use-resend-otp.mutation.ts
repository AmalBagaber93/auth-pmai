import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  resendOtp,
  type IResendOtpRequest,
  type IResendOtpResponse,
} from '../../client/resend-otp';

export function useResendOtpMutation() {

  return useMutation<IResendOtpResponse, Error, IResendOtpRequest>({
    mutationFn: resendOtp,
    onSuccess: (response) => {
      toast.success(response.data.message || 'A verification code has been sent');
    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      toast.error(data.message || 'Something went wrong');
    },
  });
}
