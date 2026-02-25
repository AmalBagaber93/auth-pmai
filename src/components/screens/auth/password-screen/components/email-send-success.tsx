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
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="10" width="32" height="22" rx="3" stroke="#a78bfa" strokeWidth="1.8" />
            <path d="M4 14l16 10 16-10" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="30" cy="10" r="7" fill="#0a0a1a" />
            <circle cx="30" cy="10" r="6" fill="#4ade80" opacity="0.15" />
            <circle cx="30" cy="10" r="6" stroke="#4ade80" strokeWidth="1.5" />
            <path d="M27 10l2 2 4-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>


      <div className="space-y-2">
        <h2 className="text-[22px] font-bold tracking-tight text-[#f0f0ff]">
          Check your inbox
        </h2>
        <p className="text-sm text-[#f0f0ff]/50 leading-relaxed max-w-75">
          We've sent a password reset link to your email address. The link will expire in{" "}
          <span className="text-[#a78bfa] font-medium">30 minutes</span>.
        </p>
      </div>



      <div className="flex flex-col w-full gap-3 pt-2">
        <button
          onClick={() => setStep("email")}
          className="w-full h-11 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-[#6366f1] to-[#a855f7] hover:from-[#585ce5] hover:to-[#9333ea] shadow-[0_8px_20px_-4px_rgba(99,102,241,0.4)] transition-all duration-300 active:scale-[0.98]"
        >
          Resend email
        </button>
        <Link
          href="/login"
          className="w-full h-11 rounded-xl text-sm font-medium text-[#f0f0ff]/40 hover:text-[#a78bfa] transition-colors flex items-center justify-center gap-2 group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-1">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Sign in
        </Link>
      </div>
    </div>
  )
}