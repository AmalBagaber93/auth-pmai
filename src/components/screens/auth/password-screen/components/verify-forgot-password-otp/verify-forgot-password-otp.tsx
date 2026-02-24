"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpForgotPasswordFormSchema, type OtpForgotPasswordFormData } from "./schema/otp-form-schema";
import { otpForgotPasswordDefaultValues } from "./schema/otp-default-values";
import { OtpInputController } from "@/components/common/controllers/otp-input-controller";
import { useResendOtpMutation } from "@/api/auth/hooks/mutations/use-resend-otp.mutation";
import { useVerifyOtpMutation } from "@/api/auth/hooks/mutations/use-verify-otp";
import Cookies from "js-cookie"
import { ArrowLeft, Mail } from "lucide-react";

interface OtpVerifyForgotPasswordFormProps {
setStep: (step: "email" | "otp" | "reset-password" |"success") => void;
}

export default function OtpVerifyForgotPasswordForm({
setStep
}: OtpVerifyForgotPasswordFormProps) {
  const [resendCountdown, setResendCountdown] = useState(60);

  const methods = useForm<OtpForgotPasswordFormData>({
    resolver: zodResolver(otpForgotPasswordFormSchema()),
    defaultValues: otpForgotPasswordDefaultValues,
  });

  const {mutate: verifyOtpMutation , isPending: isVerifying ,isSuccess: isVerifySuccess} = useVerifyOtpMutation();
  const {mutate: resendOtpMutation , isPending: isResending , isSuccess: isResendSuccess } = useResendOtpMutation();

  const email = Cookies.get('auth_email');
  const vid = Cookies.get('auth_vid');


  const {
    handleSubmit,
  } = methods;

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const handleResend = async () => {
    if (resendCountdown > 0 || isResending) return;

    resendOtpMutation({vid: vid || ""})

    isResendSuccess &&setResendCountdown(60);

  };

  const onSubmit = async (data: OtpForgotPasswordFormData) => {

    verifyOtpMutation({vid: vid || "",code:data.otp_code})
    isVerifySuccess && setStep("reset-password")
    await new Promise((r) => setTimeout(r, 1400));

 
  };

  return (
                  <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} >
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <button 
                  type="button"
                  onClick={() => setStep("email")}
                  className="inline-flex items-center gap-2 text-sm text-[#f0f0ff]/40 hover:text-[#a78bfa] transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex flex-col items-center text-center !mb-8">
                  <div className="w-16 h-16 !mt-6 bg-[#a78bfa]/10 rounded-full flex items-center justify-center border border-[#a78bfa]/20">
                    <Mail className="w-8 h-8 text-[#a78bfa]" />
                  </div>
                  <h1 className="text-[26px] font-bold tracking-tight text-[#f0f0ff] mb-2">Check your email</h1>
                  <p className="text-sm text-[#f0f0ff]/50 leading-relaxed">
                    We sent a code to <span className="text-[#a78bfa] font-medium">{email || 'Your Email'}</span>
                  </p>
                </div>

          <OtpInputController
              name="otp_code"
              maxLength={6}
              disabled={isVerifying}
            />
            <div className="flex flex-col gap-4">
            <button
              type="submit"

                    className="w-full h-[52px] !mt-6 bg-gradient-to-r from-[#6c63ff] via-[#8b5cf6] to-[#a78bfa] rounded-xl text-white font-semibold flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(108,99,255,0.55)] active:translate-y-0 shadow-[0_4px_24px_rgba(108,99,255,0.35)]"
            >
             Verify
            </button>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCountdown > 0 || isResending}
              className="ml-2 text-sm font-bold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors disabled:opacity-50"
            >
              {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend code"}
            </button>
            </div>
              </div>
              </form>
              </FormProvider>
  );
}
