"use client";

import { motion } from "framer-motion";

export const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#03030b] pointer-events-none">
    {/* Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: `
          linear-gradient(var(--glass-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
      }}
    />

    {/* Moving Orbs */}
    <motion.div
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20"
      style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
    />
    
    <motion.div
      animate={{
        x: [0, -100, 0],
        y: [0, -50, 0],
        scale: [1.2, 1, 1.2],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-20"
      style={{ background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)' }}
    />

    {/* Center Glow */}
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        background: `radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 70%)`
      }}
    />
  </div>
);