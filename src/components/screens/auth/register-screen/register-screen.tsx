"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormData, registerFormSchema } from "./schema/register-form-schema";
import { registerDefaultValues } from "./schema/register-default-values";
import { useMemo, } from "react";
import { InputController } from "@/components/common/controllers/input-controller";
import { PasswordFieldController } from "@/components/common/controllers/password-field-controller";
import { Check } from "lucide-react";
import { CheckboxFieldController } from "@/components/common/controllers/checkbox-field-controller";
import { cn } from "@/utils/utils";
import { Background } from "@/components/common/background";
import { useRegisterMutation } from "@/api/auth/hooks/mutations/use-register.mutation";

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
      minLength: password?.length >= 8,
      hasNumber: /\d/.test(password || ''),
      hasSpecial: /[!@#$%^&*]/.test(password || ''),
      hasUppercase: /[A-Z]/.test(password || ''),
    };
  }, [password]);

  const handleSubmit = (data: RegisterFormData) => {
    register(data);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6! overflow-x-hidden bg-[#0a0a1a]">
      <Background />

      <main className="relative z-10 w-full max-w-125 bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-8!  shadow-[0_32px_80px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center gap-4 mb-10 text-center">

          <span className="text-[22px] font-bold tracking-tight bg-linear-to-br from-[#f0f0ff] to-[#a78bfa] bg-clip-text text-transparent">PMAI</span>
        </div>

        <h1 className="text-[26px] font-bold tracking-tight text-[#f0f0ff] text-center my-6">Create your account</h1>

        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(handleSubmit)} noValidate aria-label="Sign up form">
            <div className="space-y-6!">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputController name="first_name" placeholder="First name" formItemClassName="mb-0" />
                <InputController name="last_name" placeholder="Last name" formItemClassName="mb-0" />
              </div>

              <InputController name="email" placeholder="Email address" formItemClassName="mb-0" />

              <div className='space-y-2!'>
                <PasswordFieldController
                  name='password'
                  placeholder="Password"
                  formItemClassName="mb-0"
                />

                {password && (
                  <div className='border-white/10 bg-white/3 space-y-3! rounded-xl border p-4! backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300'>
                    <p className='text-[#f0f0ff] text-xs font-semibold uppercase tracking-wider opacity-70'>
                      Password requirements
                    </p>
                    <ul className='space-y-2.5!'>
                      {[
                        { key: 'minLength', label: 'At least 8 characters', check: passwordChecks.minLength },
                        { key: 'hasNumber', label: 'At least one number', check: passwordChecks.hasNumber },
                        { key: 'hasSpecial', label: 'At least one special character', check: passwordChecks.hasSpecial },
                        { key: 'hasUppercase', label: 'At least one uppercase letter', check: passwordChecks.hasUppercase },
                      ].map((item) => (
                        <li key={item.key} className="text-[#f0f0ff]/60 flex items-center gap-3 text-xs">
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                              item.check
                                ? "border-[#6c63ff] bg-[#6c63ff] text-white shadow-[0_0_12px_rgba(108,99,255,0.4)]"
                                : "border-white/20 bg-transparent"
                            )}
                          >
                            {item.check && <Check className='h-2.5 w-2.5' />}
                          </div>
                          <span className={cn("transition-colors duration-300", item.check && "text-[#f0f0ff] font-medium")}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <PasswordFieldController
                name='password_confirmation'
                autoComplete='new-password'
                placeholder="Confirm password"
                formItemClassName="mb-0"
              />


              <CheckboxFieldController
                name="terms_accepted"
                label={<span className="text-sm text-[#f0f0ff]/50 leading-relaxed">I agree to the <a href="#" className="text-[#a78bfa] font-medium hover:text-[#c4b5fd] transition-colors">Terms of Service</a> </span>}
              />

              <button
                type="submit"
                id="signup-submit-btn"
                disabled={method.formState.isSubmitting}
                className="w-full h-13 bg-linear-to-r from-[#6c63ff] via-[#8b5cf6] to-[#a78bfa] rounded-xl text-white font-semibold flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(108,99,255,0.55)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_24px_rgba(108,99,255,0.35)] mt-4"
              >
                {method.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : "Create account"}
              </button>
            </div>
          </form>
        </FormProvider>


        <p className="text-center mt-8! text-sm text-[#f0f0ff]/50">
          Already have an account?
          <Link href="/login" className="text-[#a78bfa] font-bold ml-1.5 hover:text-[#c4b5fd] transition-colors no-underline">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
