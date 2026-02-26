import { Background } from '@/components/common/background'
import { motion } from 'framer-motion'
import React from 'react'

export default function AuthCard({children , hideLogo}: {children: React.ReactNode , hideLogo?: boolean}) {
  return (
     <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#03030b] overflow-hidden">
      <Background />

      <motion.main
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8  shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col items-center gap-2  text-center">
            {!hideLogo && <motion.div
              initial={{ rotate: -10, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
            >
              <span className="text-xl !px-2 font-bold text-white">PMAI</span>
            </motion.div>}
{children}
          </div>
        </div>
      </motion.main>
    </div>
  )
}