"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Zap, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Prompts",
    value: "128",
    change: "+12%",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Fine-tunes",
    value: "12",
    change: "+2",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Hours Saved",
    value: "48.5",
    change: "+2.4h",
    icon: Clock,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your AI workflow and prompt usage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.change} <ArrowUpRight size={12} className="ml-1" />
              </span>
            </div>
            <h3 className="text-sm font-medium text-foreground/60">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold mt-1 group-hover:text-foreground transition-colors">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-md h-[300px]"
        >
          <h3 className="font-semibold mb-4 text-foreground">
            Recent Activity
          </h3>
          <div className="flex items-center justify-center h-full text-foreground/40 text-sm">
            Chart placeholder
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-md h-[300px]"
        >
          <h3 className="font-semibold mb-4 text-foreground">
            Popular Prompts
          </h3>
          <div className="flex items-center justify-center h-full text-foreground/40 text-sm">
            List placeholder
          </div>
        </motion.div>
      </div>
    </div>
  );
}
