"use client";

import { useState } from "react";
import { cn } from "@/utils/utils";
import { Background } from "@/components/common/background";
import ForgotPassword from "./components/forgot-password-form/forgot-password-form";
import OtpVerifyForgotPasswordForm from "./components/verify-forgot-password-otp/verify-forgot-password-otp";
import EmailSenSuccess from "./components/email-send-success";
import ResetPasswordScreen from "./components/reset-password/reset-password-screen";

type Step = "email" | "otp" | "reset-password" | "success";

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<Step>("email");

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6! bg-[#0a0a1a] overflow-hidden">
      <Background />
      <main className="relative z-10 w-full max-w-110 bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-8! md:p-12! shadow-[0_32px_80px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <span className="text-[22px] font-bold tracking-tight bg-linear-to-br from-[#f0f0ff] to-[#a78bfa] bg-clip-text text-transparent">PMAI</span>
        </div>

        {step !== "success" && (
          <div className="flex justify-center mb-8 gap-2">
            {(["email", "otp", "reset-password"] as const).map((s, i) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  step === s ? "w-8 bg-[#6c63ff]" : i < ["email", "otp", "reset-password"].indexOf(step) ? "w-6 bg-[#4ade80]" : "w-1.5 bg-white/10"
                )}
              />
            ))}
          </div>
        )}

        {step === "email" && (
          <ForgotPassword setStep={setStep} />
        )}

        {step === "otp" && (
          <OtpVerifyForgotPasswordForm setStep={setStep} />
        )}

        {step === "reset-password" && (
          <ResetPasswordScreen setStep={setStep} />
        )}

        {step === "success" && (
          <EmailSenSuccess setStep={setStep} />
        )}

      </main>
    </div>
  );
}
