import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

import { setFormErrors } from '@/hooks/use-response-error';

import {
  resetPassword,
  type IResetPasswordRequest,
  type IResetPasswordResponse,
} from '../../client/reset-password';

export function useResetPasswordMutation(setError: UseFormSetError<any>) {

  return useMutation<IResetPasswordResponse, Error, IResetPasswordRequest>({
    retry: false,
    mutationFn: resetPassword,
    onSuccess: response => {
      toast.success(response.data.message || 'Password reset successfully! ');
    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      toast.error(data.message || 'Something went wrong!');
      setFormErrors(setError, data);
    },
  });
}
