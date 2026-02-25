import { ShieldCheck } from "lucide-react";
import Link from "next/link";


interface EmailSenSuccessProps {
  setStep: (step: "email" | "otp" | "success") => void;
}

export default function EmailSenSuccess({ setStep }: EmailSenSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">

      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#6c63ff]/20 to-[#a78bfa]/20 animate-pulse" />
        <div className="relative w-24 h-24 bg-linear-to-br from-[#6c63ff]/10 to-[#a78bfa]/10 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(108,99,255,0.2)]">
          <ShieldCheck />        </div>
      </div>


      <div className="space-y-2">
        <h2 className="text-[22px] font-bold tracking-tight text-[#f0f0ff]">
          Successfully
        </h2>
        <p className="text-sm text-[#f0f0ff]/50 leading-relaxed max-w-75">
          Password has been changed successfully.

        </p>
      </div>



      <div className="flex flex-col w-full gap-3 pt-2">
        <Link
          href="/login"
          className="w-full h-11 text-center rounded-xl text-sm font-semibold text-white bg-linear-to-r from-[#6366f1] to-[#a855f7] hover:from-[#585ce5] hover:to-[#9333ea] shadow-[0_8px_20px_-4px_rgba(99,102,241,0.4)] transition-all duration-300 active:scale-[0.98]"
        >
          <p className="!py-3"> Back to Sign in</p>

        </Link>

      </div>
    </div>
  )
}