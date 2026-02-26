import { setFormErrors } from '@/hooks/use-response-error'; import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { register } from "../../client/register";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { startTimers } from '@/utils/timer-utils';

type UseRegisterMutationProps<T extends FieldValues = any> = {
  setError: UseFormSetError<T>;
};
export const useRegisterMutation = ({ setError }: UseRegisterMutationProps) => {
  const router = useRouter();

  return useMutation({
    onSuccess: async (response, variables) => {
      toast.success(response.data.message || 'A verification code has been sent to your email');


      Cookies.set('auth_email', variables.email)
      Cookies.set('auth_vid', response.data.vid, { expires: 1 / 24 })

      startTimers();
      router.push('/otp-verify');

    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);

      toast.error(data.message || "An error occurred during register");
      setFormErrors(setError, data);
    },
    mutationKey: ['REGISTER'],
    mutationFn: register,
  });
};
