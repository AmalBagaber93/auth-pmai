"use client";

import { useMemo, } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { cn } from "@/utils/utils";
import { PasswordFieldController } from "@/components/common/controllers/password-field-controller";
import { resetPasswordSchema, type ResetPasswordData } from "./schema/reset-password-schema";
import { resetPasswordDefaultValues } from "./schema/reset-password-default-values";
import { useResetPasswordMutation } from "@/api/auth/hooks/mutations/use-reset-password.mutation";
import { useSearchParams } from "next/navigation";

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

  const { mutate: resetPasswordMutation, isPending: isSubmitting } = useResetPasswordMutation(setError);

  const password = watch("password");

  const searchParams = useSearchParams();

  const resetToken = searchParams.get('reset_token') || '';

  const passwordChecks = useMemo(() => {
    return {
      minLength: password?.length >= 8,
      hasNumber: /\d/.test(password || ""),
      hasSpecial: /[!@#$%^&*]/.test(password || ""),
      hasUppercase: /[A-Z]/.test(password || ""),
    };
  }, [password]);

  const onSubmit = async (data: ResetPasswordData) => {
    await new Promise((r) => setTimeout(r, 1500));
    resetPasswordMutation({ password: data.password, password_confirmation: data.password_confirmation, reset_token: resetToken });
    setStep("success");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <h1 className="text-[26px] font-bold tracking-tight text-[#f0f0ff] !mb-2 text-center">Set new password</h1>
          <p className="text-sm text-[#f0f0ff]/50 leading-relaxed !mb-10 text-center">
            Create a strong and secure password that you haven&apos;t used before.
          </p>

          <div className="!space-y-6">
            <div className="!space-y-2">
              <PasswordFieldController
                name="password"
                label="New password"
                placeholder="••••••••"
                formItemClassName="mb-0"
              />

              {password && (
                <div className="border border-white/10 bg-white/[0.03] space-y-3 rounded-xl p-4 backdrop-blur-sm animate-in zoom-in duration-300">
                  <p className="text-[#f0f0ff] text-[10px] font-bold uppercase tracking-wider opacity-50">
                    Password requirements
                  </p>
                  <ul className="space-y-2">
                    {[
                      { key: 'minLength', label: '8+ characters', check: passwordChecks.minLength },
                      { key: 'hasNumber', label: 'One number', check: passwordChecks.hasNumber },
                      { key: 'hasSpecial', label: 'One special symbol', check: passwordChecks.hasSpecial },
                      { key: 'hasUppercase', label: 'One uppercase letter', check: passwordChecks.hasUppercase },
                    ].map((item) => (
                      <li key={item.key} className="flex items-center gap-2.5 text-xs">
                        <div className={cn(
                          "h-4 w-4 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                          item.check ? "border-[#6c63ff] bg-[#6c63ff]" : "border-white/10"
                        )}>
                          {item.check && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className={cn(item.check ? "text-[#f0f0ff]" : "text-[#f0f0ff]/40")}>
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <PasswordFieldController
              name="password_confirmation"
              label="Confirm password"
              placeholder="••••••••"
              formItemClassName="mb-0"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 bg-linear-to-r from-[#6c63ff] via-[#8b5cf6] to-[#a78bfa] rounded-xl text-white font-semibold flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(108,99,255,0.55)] active:translate-y-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Resetting...
                </span>
              ) : "Reset password"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
