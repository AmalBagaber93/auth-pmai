import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import {
  forgotPassword,
  type IForgotPasswordRequest,
  type IForgotPasswordResponse,
} from '../../client/forgot-password';

export function useForgotPasswordMutation() {

  return useMutation<IForgotPasswordResponse, Error, IForgotPasswordRequest>({
    mutationFn: forgotPassword,
    onSuccess: (response, variables) => {
      toast.success(response.data.message || 'A verification code has been sent to your email');

      Cookies.set('auth_email', variables.email)
      Cookies.set('auth_vid', response.data.vid!)
    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      toast.error(data.message || 'Something went wrong');
    },
  });
}
