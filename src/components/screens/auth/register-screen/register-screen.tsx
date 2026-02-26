"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormData, registerFormSchema } from "./schema/register-form-schema";
import { registerDefaultValues } from "./schema/register-default-values";
import { useMemo } from "react";
import { InputController } from "@/components/common/controllers/input-controller";
import { PasswordFieldController } from "@/components/common/controllers/password-field-controller";
import { Check } from "lucide-react";
import { CheckboxFieldController } from "@/components/common/controllers/checkbox-field-controller";
import { cn } from "@/utils/utils";
import { Background } from "@/components/common/background";
import { useRegisterMutation } from "@/api/auth/hooks/mutations/use-register.mutation";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "../components/auth-card";

export default function RegisterScreen() {
  const method = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema()),
    defaultValues: registerDefaultValues,
    mode: 'onChange',
  });
  const { mutate: register } = useRegisterMutation({ setError: method.setError });

  const { watch } = method;
  const password = watch('password');

  const passwordChecks = useMemo(() => {
    return {
      minLength: (password || '').length >= 8,
      hasNumber: /\d/.test(password || ''),
      hasSpecial: /[!@#$%^&*]/.test(password || ''),
      hasUppercase: /[A-Z]/.test(password || ''),
    };
  }, [password]);

  const handleSubmit = (data: RegisterFormData) => {
    register(data);
  };

  return (
<AuthCard>
          <div className="flex flex-col items-center gap-2 mb-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h1>
            <p className="text-white/50 text-sm leading-relaxed">Join us today and experience the future</p>
          </div>

          <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(handleSubmit)} noValidate aria-label="Sign up form" className="!space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputController name="first_name" label="First Name" placeholder="First Name" formItemClassName="mb-0" />
                <InputController name="last_name" label="Last Name" placeholder="Last Name" formItemClassName="mb-0" />
              </div>

              <InputController name="email" label="Email" placeholder="Email" formItemClassName="mb-0" />

              <div className="!space-y-3">
                <PasswordFieldController
                  name="password"
                  label="Password"
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
                      <div className="bg-white/[0.03] rounded-2xl border border-white/5 p-4 space-y-3">
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                          Password Security
                        </p>
                        <div className="grid grid-cols-1 gap-2">
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

              <CheckboxFieldController
                name="terms_accepted"
                label={
                  <span className="text-xs text-white/50 leading-relaxed">
                    I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">Terms of Service</a>
                  </span>
                }
              />

              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                id="signup-submit-btn"
                disabled={method.formState.isSubmitting}
                className="w-full h-13 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl text-white font-bold text-sm flex items-center justify-center transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_40px_-8px_rgba(79,70,229,0.7)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {method.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </motion.button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Already have an account?
              <Link
                href="/login"
                className="text-white font-semibold ml-2 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

    </AuthCard>
  );
}
