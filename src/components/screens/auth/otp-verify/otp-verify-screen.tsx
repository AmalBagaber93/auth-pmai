"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { otpFormSchema, type OtpFormData } from "./schema/otp-form-schema";
import { otpDefaultValues } from "./schema/otp-default-values";
import { cn } from "@/utils/utils";
import { Form } from "@/components/ui/form";
import { Background } from "@/components/common/background";
import { OtpInputController } from "@/components/common/controllers/otp-input-controller";
import { useResendOtpMutation } from "@/api/auth/hooks/mutations/use-resend-otp.mutation";
import Cookies from "js-cookie"
import { Mail } from "lucide-react";
import { useVerifyOtpMutation } from "@/api/auth/hooks/mutations/use-verify-otp.mutation";



export default function OtpVerifyScreen() {
  const [resendCountdown, setResendCountdown] = useState(60);

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpFormSchema()),
    defaultValues: otpDefaultValues,
  });

  const { mutate: verifyOtpMutation, isPending: isVerifying } = useVerifyOtpMutation();
  const { mutateAsync: resendOtpMutation, isPending: isResending } = useResendOtpMutation();

  const email = Cookies.get('auth_email');
  const vid = Cookies.get('auth_vid');


  const {
    handleSubmit,
  } = form;

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const handleResend = async () => {
    if (resendCountdown > 0 || isResending) return;

    await resendOtpMutation({ vid: vid || "" })

    setResendCountdown(60);

  };

  const onSubmit = async (data: OtpFormData) => {

    verifyOtpMutation({ vid: vid || "", code: data.otp_code })

    await new Promise((r) => setTimeout(r, 1400));


  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#0a0a1a] overflow-hidden">
      <Background />

      <main className="relative z-10 w-full max-w-[440px] bg-white/[0.04] backdrop-blur-[24px] border border-white/10 rounded-[24px] !p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <p className="text-start mt-10 text-sm">
          <Link href="/login" className="text-[#f0f0ff]/40 hover:text-[#a78bfa] transition-colors inline-flex items-center gap-2 group">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Sign in
          </Link>
        </p>
        <div className="flex flex-col items-center gap-4 mb-10! text-center">

          <span className="text-[22px] font-bold tracking-tight bg-gradient-to-br from-[#f0f0ff] to-[#a78bfa] bg-clip-text text-transparent">
            PMAI
          </span>

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-[#a78bfa]/10 rounded-full flex items-center justify-center border border-[#a78bfa]/20 shadow-[0_0_24px_#a78bfa20]">
              <Mail className="w-8 h-8 text-[#a78bfa]" />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-[26px] font-bold tracking-tight text-[#f0f0ff]">
                Verify your email
              </h1>
              <p className="text-sm text-[#f0f0ff]/50 leading-relaxed">
                We sent a 6-digit code to{" "}
                <span className="text-[#a78bfa] font-semibold">
                  {email || "Your Email"}
                </span>
              </p>
            </div>
          </div>

        </div>




        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="OTP verification form" className="!space-y-8">

            <OtpInputController
              name="otp_code"
              maxLength={6}
              disabled={isVerifying}
            />

            <button
              type="submit"
              disabled={isVerifying}
              className={cn(
                "w-full h-12 rounded-xl font-semibold text-white transition-all duration-300",
                "bg-linear-to-r from-[#6366f1] to-[#a855f7] hover:from-[#585ce5] hover:to-[#9333ea]",
                "shadow-[0_8px_20px_-4px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_25px_-4px_rgba(99,102,241,0.5)]",
                "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Verify Code"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCountdown > 0 || isResending}
                className="text-sm font-medium text-[#f0f0ff]/50 hover:text-[#a78bfa] transition-colors disabled:opacity-50 disabled:hover:text-[#f0f0ff]/50 disabled:cursor-not-allowed"
              >
                {resendCountdown > 0 ? (
                  `Resend code in ${resendCountdown}s`
                ) : isResending ? (
                  "Sending..."
                ) : (
                  "Didn't receive code? Resend"
                )}
              </button>
            </div>
          </form>
        </Form>


      </main>
    </div>
  );
}
