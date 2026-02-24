"use client";


import { Header } from "./header/header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="min-h-screen bg-[#06060c]">
        <Header />
        <main className="p-8 max-w-[1600px] mx-auto">
          {children}
        </main>

    </div>
  );
}
