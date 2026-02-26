"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { otpFormSchema, type OtpFormData } from "./schema/otp-form-schema";
import { otpDefaultValues } from "./schema/otp-default-values";
import { Form } from "@/components/ui/form";
import { OtpInputController } from "@/components/common/controllers/otp-input-controller";
import { useResendOtpMutation } from "@/api/auth/hooks/mutations/use-resend-otp.mutation";
import Cookies from "js-cookie"
import { Mail, ChevronLeft } from "lucide-react";
import { useVerifyOtpMutation } from "@/api/auth/hooks/mutations/use-verify-otp.mutation";
import { motion } from "framer-motion";

import AuthCard from "../components/auth-card";
import { useRouter } from "next/navigation";
import { 
  getRemaining, 
  startTimers, 
  ensureTimersStarted, 
  RESEND_KEY, 
  RESEND_DURATION, 
  EXPIRY_KEY, 
  EXPIRY_DURATION 
} from "@/utils/timer-utils";

export default function OtpVerifyScreen() {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(() => getRemaining(RESEND_KEY, RESEND_DURATION));
  const [expiryCountdown, setExpiryCountdown] = useState(() => getRemaining(EXPIRY_KEY, EXPIRY_DURATION));

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpFormSchema()),
    defaultValues: otpDefaultValues,
  });

  const { mutate: verifyOtpMutation, isPending: isVerifying } = useVerifyOtpMutation();
  const { mutateAsync: resendOtpMutation, isPending: isResending } = useResendOtpMutation();

  const email = Cookies.get('auth_email');
  const vid = Cookies.get('auth_vid');

  const { handleSubmit } = form;

  useEffect(() => {
    ensureTimersStarted();
  }, []);

  useEffect(() => {
    if (!vid) {
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [vid]);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  useEffect(() => {
    if (expiryCountdown <= 0) return;
    const timer = setInterval(() => setExpiryCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [expiryCountdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = async () => {
    if (resendCountdown > 0 || isResending) return;
    await resendOtpMutation({ vid: vid || "" });
    startTimers();
    setResendCountdown(RESEND_DURATION);
    setExpiryCountdown(EXPIRY_DURATION);
  };

  const onSubmit = async (data: OtpFormData) => {
    verifyOtpMutation({ vid: vid || "", code: data.otp_code });
  };

  if (isChecking) return null;
  return (
    <AuthCard hideLogo>
      <div className="w-full">
        <div className="flex flex-col items-start w-full">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors self-start mb-8"
          >
            <ChevronLeft className="w-4 h-4 flex-shrink-0 transition-transform group-hover:-translate-x-1" />
            <span>Back to Sign in</span>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <motion.div
            initial={{ rotate: -10, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
          >
            <Mail className="w-8 h-8 text-indigo-400" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Verify Email</h1>
          <p className="text-white/50 text-sm leading-relaxed">
            We sent a 6-digit code to <br />
            <span className="text-indigo-400 font-semibold">{email || "your email"}</span>
          </p>


          {resendCountdown === 60 && expiryCountdown === 600 && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-emerald-400 text-xs font-semibold mt-3 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              New OTP sent with fresh 10-minute expiry
            </motion.p>
          )}


          <p className="text-white/80 text-[11px] font-bold mt-2 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
            Code expires in: ⏱️ <span className="text-white font-mono">{formatTime(expiryCountdown)}</span>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="OTP verification form" className="space-y-10">
            <OtpInputController
              name="otp_code"
              maxLength={6}
              disabled={isVerifying}
            />

            <div className="space-y-6">
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isVerifying || expiryCountdown === 0}
                className="w-full h-13 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl text-white font-bold text-sm flex items-center justify-center transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_40px_-8px_rgba(79,70,229,0.7)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying…
                  </span>
                ) : (
                  "Verify Code"
                )}
              </motion.button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCountdown > 0 || isResending}
                  className="text-xs font-bold uppercase tracking-widest text-white/80 hover:text-indigo-400 transition-colors disabled:opacity-50 disabled:hover:text-white/30 disabled:cursor-not-allowed"
                >
                  {resendCountdown > 0 ? (
                    `Resend code in ${resendCountdown}s`
                  ) : isResending ? (
                    "Sending..."
                  ) : (
                    "Resend code"
                  )}
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
