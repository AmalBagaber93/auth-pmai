"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormData } from "./schema/login-form-schema";
import { loginDefaultValues } from "./schema/login-default-values";
import { InputController } from "@/components/common/controllers/input-controller";
import { PasswordFieldController } from "@/components/common/controllers/password-field-controller";
import { CheckboxFieldController } from "@/components/common/controllers/checkbox-field-controller";
import { Form } from "@/components/ui/form";
import { Background } from "@/components/common/background";
import { useLoginMutation } from "@/api/auth/hooks/mutations/use-login.mutation";
import { useRecoverVerification } from "@/api/auth/hooks/mutations/use-recover-verification.mutation";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "../components/auth-card";

export default function LoginScreen() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema()),
    defaultValues: loginDefaultValues,
  });

  const { handleSubmit, setError } = methods;
  const { mutate: verifyEmailMutate } = useRecoverVerification();

  const onVerifyEmail = () => {
    verifyEmailMutate({ email: methods.getValues("email") });
  };
  const { mutate: loginMutate, isPending } = useLoginMutation(setError, onVerifyEmail);

  const onSubmit = (data: LoginFormData) => {
    loginMutate({ ...data, remember_me: data.remember_me ?? false });
  };

  return (
        <AuthCard>
          <div className="flex flex-col items-center gap-2 mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
            <p className="text-white/50 text-sm leading-relaxed">Enter your credentials to access your account</p>
          </div>

          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Login form" className="space-y-6 w-full">
              <div className="!space-y-5">
                <InputController
                  name="email"
                  label="Email address"
                  autoComplete="email"
                  placeholder="name@company.com"
                  formItemClassName="mb-0"
                />

                <PasswordFieldController
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  formItemClassName="mb-0"
                />
              </div>

              <div className="flex items-center justify-between">
                <CheckboxFieldController
                  name="remember_me"
                  label={<span className="text-xs text-white/50">Remember me</span>}
                />
                <Link
                  href="/forgot-password"
                  className="text-xs text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                id="login-submit-btn"
                disabled={isPending}
                className="w-full h-13 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl text-white font-bold text-sm flex items-center justify-center transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_40px_-8px_rgba(79,70,229,0.7)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating…
                  </span>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>
          </Form>

          <div className="mt-10 text-center">
            <p className="text-white/40 text-sm">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="text-white font-semibold ml-2 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>
        </AuthCard>

  );
}
