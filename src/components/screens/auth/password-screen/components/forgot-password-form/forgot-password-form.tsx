import { InputController } from "@/components/common/controllers/input-controller";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { ForgotPasswordData, forgotPasswordSchema } from "./schema/forgot-password-schema";
import { forgotPasswordDefaultValues } from "./schema/forgot-password-default-values";
import { useForgotPasswordMutation } from "@/api/auth/hooks/mutations/use-forgot-password.mutation";
import { useRouter } from "next/navigation";

interface ForgotPasswordProps {
  setStep: (step: "email" | "otp" | "reset-password" | "success") => void;
}

export default function ForgotPassword({ setStep }: ForgotPasswordProps) {
  const router = useRouter();
  const methods = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema()),
    defaultValues: forgotPasswordDefaultValues,
  });

  const { mutate: forgotPassword } = useForgotPasswordMutation();
  const { handleSubmit } = methods;

  const onSubmit = async (data: ForgotPasswordData) => {
    forgotPassword(data);
    setStep("otp");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 !space-y-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="inline-flex items-center gap-2 text-sm text-[#f0f0ff]/40 hover:text-[#a78bfa] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sign in
          </button>
          <h1 className="text-[26px] font-bold tracking-tight text-[#f0f0ff] mb-2">Forgot password?</h1>
          <p className="text-sm text-[#f0f0ff]/50 leading-relaxed mb-10">
            Enter your email address and we&apos;ll send you a 6-digit verification code.
          </p>
          <div className="space-y-6">
            <InputController
              name="email"
              label="Email"
              placeholder="you@company.com"
              formItemClassName="mb-0"
            />
            <button
              type="submit"
              className="w-full h-13 mt-6! bg-linear-to-r from-[#6c63ff] via-[#8b5cf6] to-[#a78bfa] rounded-xl text-white font-semibold flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(108,99,255,0.55)] active:translate-y-0 shadow-[0_4px_24px_rgba(108,99,255,0.35)]"
            >
              Send reset code
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}