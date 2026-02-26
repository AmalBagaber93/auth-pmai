"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/utils";
import ForgotPassword from "./components/forgot-password-form/forgot-password-form";
import OtpVerifyForgotPasswordForm from "./components/verify-forgot-password-otp/verify-forgot-password-otp";
import EmailSenSuccess from "./components/email-send-success";
import ResetPasswordScreen from "./components/reset-password/reset-password-screen";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "../components/auth-card";

type Step = "email" | "otp" | "reset-password" | "success";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepFromQuery = searchParams.get("step") as Step;

  const [step, setStep] = useState<Step>(stepFromQuery || "email");

  useEffect(() => {
    if (stepFromQuery && ["email", "otp", "reset-password", "success"].includes(stepFromQuery)) {
      setStep(stepFromQuery);
    }
  }, [stepFromQuery]);

  const handleSetStep = (newStep: Step) => {
    setStep(newStep);
    const params = new URLSearchParams(window.location.search);
    params.set("step", newStep);
    router.push(`?${params.toString()}`);
  };

  const steps: Step[] = ["email", "otp", "reset-password"];

  return (
    <AuthCard>
      {step !== "success" && (
        <div className="flex justify-center mb-10 gap-3">
          {steps.map((s, i) => {
            const isActive = step === s;
            const isCompleted = steps.indexOf(step) > i;
            return (
              <div
                key={s}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  isActive ? "w-10 bg-indigo-500" : isCompleted ? "w-6 bg-emerald-500" : "w-1.5 bg-white/10"
                )}
              />
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {step === "email" && <ForgotPassword setStep={handleSetStep} />}
          {step === "otp" && <OtpVerifyForgotPasswordForm setStep={handleSetStep} />}
          {step === "reset-password" && <ResetPasswordScreen setStep={handleSetStep} />}
          {step === "success" && <EmailSenSuccess setStep={handleSetStep} />}
        </motion.div>
      </AnimatePresence>
    </AuthCard>

  );
}


