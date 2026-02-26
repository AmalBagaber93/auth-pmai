import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyOtp } from '../../client/verify-otp';
import Cookies from "js-cookie";

export const useVerifyOtpMutation = () => {
  const router = useRouter();

  return useMutation({
    onSuccess: (response) => {

      Cookies.set('token', response.data.token, {
        expires: 7,
        path: '/',
      });
      Cookies.remove('auth_email');
      Cookies.remove('auth_vid');

      toast.success(response.data.message || 'Your email has been verified successfully.');

      router.refresh();

    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      toast.error(data.message || "An error occurred during OTP verification");

      Cookies.remove('auth_email')
      Cookies.remove('auth_vid')

    },
    mutationKey: ['VERIFY_OTP'],
    mutationFn: verifyOtp,
  });
};
