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


export default function LoginScreen() {

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema()),
    defaultValues: loginDefaultValues,
  });


  const {
    handleSubmit,
    setError
  } = methods;

  const {mutate , isPending}= useLoginMutation(setError);

  const onSubmit = (data: LoginFormData) => {
mutate({...data , remember_me: data.remember_me ?? false})

  };



  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#0a0a1a] overflow-hidden">
      <Background />

      <main className="relative z-10 w-full max-w-[440px] bg-white/[0.04] backdrop-blur-[24px] border border-white/10 rounded-[24px] !p-8 md:!p-12 shadow-[0_32px_80px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <span className="text-[22px] font-bold tracking-tight bg-gradient-to-br from-[#f0f0ff] to-[#a78bfa] bg-clip-text text-transparent">PMAI</span>
        </div>

        <h1 className="text-[26px] font-bold tracking-tight text-[#f0f0ff] text-center mb-2">Welcome back</h1>
        <p className="text-sm text-[#f0f0ff]/50 text-center mb-10 leading-relaxed">Sign in to your account to continue</p>


        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Login form">
            <div className="!space-y-6 !mt-4">
              <InputController
                name="email"
                label="Email address"
                autoComplete="email"
                placeholder="you@company.com"
                formItemClassName="mb-0"
              />

              <PasswordFieldController
                name="password"
                label="Password"
                placeholder="••••••••"
                autoComplete="current-password"
                formItemClassName="mb-0"
              />

              <div className="flex items-center justify-between">
                <CheckboxFieldController
                  name="remember_me"
                  label={<span className="text-xs text-[#f0f0ff]/60">Remember me</span>}
                />
                <Link href="/forgot-password" id="forgot-password-link" className="text-xs text-[#a78bfa] font-medium hover:text-[#c4b5fd] transition-colors no-underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                id="login-submit-btn"
                disabled={isPending}
                className="w-full h-[52px] bg-gradient-to-r from-[#6c63ff] via-[#8b5cf6] to-[#a78bfa] rounded-xl text-white font-semibold flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(108,99,255,0.55)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_24px_rgba(108,99,255,0.35)]"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : "Sign in"}
              </button>
            </div>
          </form>
        </Form>

        <p className="text-center !mt-8 text-sm text-[#f0f0ff]/50">
          Don&apos;t have an account?
          <Link href="/register" className="text-[#a78bfa] font-bold !ml-1.5 hover:text-[#c4b5fd] transition-colors no-underline">
            Create one
          </Link>
        </p>
      </main>
    </div>
  );
}
