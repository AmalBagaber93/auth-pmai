import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyOtp } from '../../client/verify-otp';
import Cookies from "js-cookie"

export const useVerifyOtpMutation = () => {
  const router = useRouter();

  return useMutation({
    onSuccess: async (response) => {
      toast.success(response.data.message || 'Your email has been verified successfully.');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);

      Cookies.remove('auth_email')
      Cookies.remove('auth_vid')

      toast.error(data.message || "An error occurred during OTP verification");

    },
    mutationKey: ['VERIFY_OTP'],
    mutationFn: verifyOtp,
  });
};
