"use client";

import { motion } from "motion/react";
import { FolderHeart, Tag, Search, Clock, MoreHorizontal } from "lucide-react";

const SAVED_PROMPTS = [
  {
    title: "Midjourney Photorealism",
    tags: ["Image", "V5", "Photography"],
    date: "2m ago",
    color: "bg-blue-500",
  },
  {
    title: "Python API Boilerplate",
    tags: ["Code", "Python", "FastAPI"],
    date: "1h ago",
    color: "bg-yellow-500",
  },
  {
    title: "Marketing Copy Generator",
    tags: ["Writing", "GPT-4", "Business"],
    date: "1d ago",
    color: "bg-green-500",
  },
];

export function PersonalLibrary() {
  return (
    <section className="container mx-auto px-6 py-24 bg-foreground/[0.02] border-y border-foreground/5">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* UI Mockup */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1 relative"
        >
          <div className="absolute -inset-4 bg-linear-to-l from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50" />

          <div className="relative bg-background border border-foreground/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Sidebar Mock */}
            <div className="flex h-[400px]">
              <div className="w-16 border-r border-foreground/5 flex flex-col items-center py-6 gap-6 bg-foreground/[0.02]">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <FolderHeart className="w-4 h-4 text-blue-500" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-foreground/5" />
                <div className="w-8 h-8 rounded-lg bg-foreground/5" />
                <div className="mt-auto w-8 h-8 rounded-full bg-foreground/10" />
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-lg">My Collections</h3>
                  <div className="p-2 rounded-lg bg-foreground/5">
                    <Search className="w-4 h-4 text-foreground/40" />
                  </div>
                </div>

                <div className="space-y-3">
                  {SAVED_PROMPTS.map((prompt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl border border-foreground/5 bg-background hover:border-foreground/10 transition-colors group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${prompt.color}`}
                          />
                          <span className="font-medium text-sm">
                            {prompt.title}
                          </span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-foreground/20 group-hover:text-foreground/60" />
                      </div>
                      <div className="flex items-center gap-2">
                        {prompt.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/60"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="ml-auto text-[10px] text-foreground/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {prompt.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium"
          >
            <FolderHeart className="w-4 h-4" />
            Library
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 pb-2"
          >
            Your personal <br />
            knowledge base
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/60 leading-relaxed"
          >
            Never lose a great prompt again. Save, organize, and categorize your
            prompts for easy access. Build a library of reusable intelligence
            that grows with you.
          </motion.p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            {[
              {
                icon: Tag,
                title: "Smart Tagging",
                desc: "Auto-categorize by model & type",
              },
              {
                icon: Search,
                title: "Instant Search",
                desc: "Find any prompt in milliseconds",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-4 rounded-xl bg-background border border-foreground/5"
              >
                <feature.icon className="w-6 h-6 text-blue-500 mb-3" />
                <h4 className="font-bold mb-1">{feature.title}</h4>
                <p className="text-sm text-foreground/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
