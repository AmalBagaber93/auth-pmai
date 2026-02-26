"use client";

import { useLogout } from "@/api/auth/hooks/mutations/use-logout";
import { User, LogOut, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useUserQuery } from "@/api/auth/hooks/queries/use-user.query";

export function Header() {
  const { logout } = useLogout();

  const { data: user } = useUserQuery();
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl px-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <span className="text-white font-bold tracking-tight text-xl hidden md:block">PMAI</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-white/40 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#06060c]" />
        </button>

        <div className="h-8 w-[1px] bg-white/10" />

        <div className="flex items-center gap-4 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{user?.data.name}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">{user?.data.roles[0]}</p>
          </div>
          
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 p-1 transition-all duration-300 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>

          <button 
            onClick={() => logout()}
            className="p-2 text-white/30 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/10"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
