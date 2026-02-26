"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Activity, CreditCard } from "lucide-react";

export default function DashboardScreen() {
  const stats = [
    { label: "Total Users", value: "2,543", change: "+12.5%", icon: Users, color: "text-blue-400" },
    { label: "Active Sessions", value: "1,202", change: "+8.2%", icon: Activity, color: "text-emerald-400" },
    { label: "Revenue", value: "$12,450", change: "+23.1%", icon: CreditCard, color: "text-indigo-400" },
    { label: "Growth", value: "18.4%", change: "+4.3%", icon: TrendingUp, color: "text-purple-400" },
  ];

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10 py-6">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-white/40 text-sm font-medium tracking-wide flex items-center gap-2 uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Platform Activity
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl hover:bg-white/[0.05] transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-3xl p-8 overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2" id="performance-analytics">Platform Performance</h3>
            <p className="text-white/40 text-sm mb-6">Real-time tracking of infrastructure and user engagement.</p>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl">
              <span className="text-white/20 text-sm font-medium italic">Analytics visualization placeholder</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] -z-10 rounded-full" />
        </div>

        <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">System Update v2.4</p>
                  <p className="text-white/30 text-xs">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
