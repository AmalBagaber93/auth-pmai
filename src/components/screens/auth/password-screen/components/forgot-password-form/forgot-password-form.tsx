import { InputController } from "@/components/common/controllers/input-controller";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { ForgotPasswordData, forgotPasswordSchema } from "./schema/forgot-password-schema";
import { forgotPasswordDefaultValues } from "./schema/forgot-password-default-values";
import { useForgotPasswordMutation } from "@/api/auth/hooks/mutations/use-forgot-password.mutation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ForgotPasswordProps {
  setStep: (step: "email" | "otp" | "reset-password" | "success") => void;
}

export default function ForgotPassword({ setStep }: ForgotPasswordProps) {
  const router = useRouter();

  const methods = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema()),
    defaultValues: forgotPasswordDefaultValues,
  });

  const { mutate: forgotPassword, isPending } = useForgotPasswordMutation();
  const { handleSubmit } = methods;

  const onSubmit = async (data: ForgotPasswordData) => {
    forgotPassword(data);
    setStep("otp");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6 w-full"
        >
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors self-start"
          >
            <ChevronLeft className="w-4 h-4 flex-shrink-0 transition-transform group-hover:-translate-x-1" />
            <span>Back to Sign in</span>
          </button>

          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white">Forgot Password?</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              Enter your email address and we&apos;ll send you a 6-digit verification code.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <InputController
              name="email"
              label="Email Address"
              placeholder="name@company.com"
              formItemClassName="mb-0"
            />

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isPending}
              className="w-full h-13 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl text-white font-bold text-sm flex items-center justify-center transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_40px_-8px_rgba(79,70,229,0.7)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </span>
              ) : (
                "Send reset code"
              )}
            </motion.button>
          </div>
        </motion.div>
      </form>
    </FormProvider>
  );
}