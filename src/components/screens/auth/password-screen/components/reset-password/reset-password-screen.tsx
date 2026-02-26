"use client";

import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { cn } from "@/utils/utils";
import { PasswordFieldController } from "@/components/common/controllers/password-field-controller";
import { resetPasswordSchema, type ResetPasswordData } from "./schema/reset-password-schema";
import { resetPasswordDefaultValues } from "./schema/reset-password-default-values";
import { useResetPasswordMutation } from "@/api/auth/hooks/mutations/use-reset-password.mutation";
import Cookies from "js-cookie"
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ResetPasswordScreenProps {
  setStep: (step: "success" | "reset-password") => void;
}

export default function ResetPasswordScreen({ setStep }: ResetPasswordScreenProps) {
  const methods = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues as ResetPasswordData,
    mode: "onChange",
  });
  const { watch, setError, handleSubmit } = methods;

  const { mutateAsync: resetPasswordMutation, isPending: isSubmitting } = useResetPasswordMutation(setError);

  const password = watch("password");
  const resetToken = Cookies.get('reset_token');

  const passwordChecks = useMemo(() => {
    return {
      minLength: (password || '').length >= 8,
      hasNumber: /\d/.test(password || ""),
      hasSpecial: /[!@#$%^&*]/.test(password || ""),
      hasUppercase: /[A-Z]/.test(password || ""),
    };
  }, [password]);

  const onSubmit = async (data: ResetPasswordData) => {
    await resetPasswordMutation({
      password: data.password,
      password_confirmation: data.password_confirmation,
      reset_token: resetToken || ""
    });
    setStep("success");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">New Password</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              Create a secure password you haven&apos;t used before.
            </p>
          </div>

          <div className="!space-y-6">
            <div className="space-y-3">
              <PasswordFieldController
                name="password"
                label="New Password"
                placeholder="••••••••"
                formItemClassName="mb-0"
              />

              <AnimatePresence>
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/[0.03] rounded-2xl border border-white/5 p-4 !space-y-3">
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        Security Check
                      </p>
                      <div className="grid grid-cols-1 !gap-2">
                        {[
                          { key: 'minLength', label: '8+ Characters', check: passwordChecks.minLength },
                          { key: 'hasNumber', label: 'One Number', check: passwordChecks.hasNumber },
                          { key: 'hasSpecial', label: 'Special Character', check: passwordChecks.hasSpecial },
                          { key: 'hasUppercase', label: 'Uppercase Letter', check: passwordChecks.hasUppercase },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300",
                                item.check
                                  ? "bg-indigo-500 border-indigo-500 text-white"
                                  : "border-white/20 bg-transparent"
                              )}
                            >
                              {item.check && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className={cn("text-xs transition-colors", item.check ? "text-white/90" : "text-white/30")}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <PasswordFieldController
              name="password_confirmation"
              label="Confirm Password"
              placeholder="••••••••"
              formItemClassName="mb-0"
            />

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl text-white font-bold text-sm flex items-center justify-center transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_40px_-8px_rgba(79,70,229,0.7)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating…
                </span>
              ) : (
                "Reset Password"
              )}
            </motion.button>

            <div className="text-center">
              <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-white/30 hover:text-indigo-400 transition-colors">
                Back to Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </form>
    </FormProvider>
  );
}
