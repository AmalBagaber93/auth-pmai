import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { setFormErrors } from '@/hooks/use-response-error';
import { ILoginRequest, ILoginResponse, login } from '../../client/login';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export function useLoginMutation(
  setError: UseFormSetError<any>,
  onVerifyEmail: () => void
) {
  const router = useRouter();

  return useMutation<ILoginResponse, Error, ILoginRequest>({
    mutationFn: login,
    mutationKey: ['LOGIN'],
    onSuccess: (response, variables) => {

      if (response.data.action_required === 'verify_email') {
        toast.success(response.message || 'Please verify your email address');
        Cookies.set('auth_email', variables.email);
        onVerifyEmail()
        return;
      }
      Cookies.set('token', response.data.token, {
        expires: 7,
        path: '/',
      });
      router.push('/dashboard');
      toast.success(response.message || `Welcome back, ${response.data.user.name}!`);

    },
    onError: async (error: any) => {
      try {
        const data = JSON.parse(error.message);


        setFormErrors(setError, data);
        toast.error(data.message || "An error occurred during login");
      } catch (e) {
        toast.error("An error occurred during login");
      }
    },
  });
}
