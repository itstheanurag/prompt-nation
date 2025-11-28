"use client";

import { motion } from "motion/react";
import { PenTool, Save, BrainCircuit } from "lucide-react";

const STEPS = [
  {
    icon: PenTool,
    title: "Create",
    description:
      "Craft detailed prompts for any AI model. Refine your inputs to get the perfect output.",
  },
  {
    icon: Save,
    title: "Store",
    description:
      "Save your winning prompts to your personal library. Organize with tags for easy retrieval.",
  },
  {
    icon: BrainCircuit,
    title: "Never Forget",
    description:
      "Build your second brain. Stop reinventing the wheel and access your collective intelligence instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="container mx-auto px-6 mb-32">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Your Personal AI Workflow
        </h2>
        <p className="text-foreground/60">
          Streamline how you interact with Artificial Intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-foreground/10 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 bottom-0 w-24 bg-linear-to-r from-transparent via-foreground to-transparent opacity-80"
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
          />
        </div>

        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="relative flex flex-col items-center text-center space-y-4"
          >
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-background border border-foreground/10 flex items-center justify-center shadow-lg group transition-all duration-300">
              {/* Glow Animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-foreground/20 blur-xl -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1, // Pulse duration
                  repeat: Infinity,
                  delay: i * 2, // 0s, 2s, 4s - Matches beam position
                  repeatDelay: 4, // Wait for next cycle (Total 5s cycle matches beam 4s+1s)
                }}
              />

              {/* Static hover effect */}
              <div className="absolute inset-0 bg-foreground/5 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform -z-20" />

              <step.icon className="w-10 h-10 text-foreground/80 group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-foreground/60 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
