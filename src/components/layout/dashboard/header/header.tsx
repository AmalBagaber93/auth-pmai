"use client";

import { useLogout } from "@/api/auth/hooks/mutations/use-logout";
import {  User } from "lucide-react";

export function Header() {

const { logout} = useLogout();
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-end border-b border-white/10 bg-gray-800 !px-8 backdrop-blur-xl">

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-6 border-l border-white/10 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">Amal Bajaber</p>
            <p onClick={() => logout()} className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Log out </p>
          </div>
          <div className="relative">
            <div className="h-10 w-10 rounded-full border border-[#6c63ff]/30 bg-gradient-to-br from-[#6c63ff]/20 to-[#a78bfa]/20 p-1 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a1a] text-[#6c63ff]">
                <User className="h-5 w-5" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0a0a1a] bg-green-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
