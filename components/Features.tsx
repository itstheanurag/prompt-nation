"use client";

import { motion } from "motion/react";
import { Sparkles, BookMarked, Share2, Zap, Brain, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Refinement",
    description:
      "Transform vague ideas into engineered prompts. Our AI analyzes your intent and suggests optimizations for better results.",
  },
  {
    icon: BookMarked,
    title: "Personal Library",
    description:
      "Save your favorite prompts, organize them into collections, and access them anywhere. Your personal knowledge base.",
  },
  {
    icon: Share2,
    title: "Community Driven",
    description:
      "Share your best prompts with the world. Fork existing prompts, remix them, and contribute to the collective intelligence.",
  },
  {
    icon: Zap,
    title: "Instant Testing",
    description:
      "Test prompts directly within the platform against popular models. See results immediately without switching tabs.",
  },
  {
    icon: Layers,
    title: "Version Control",
    description:
      "Track changes to your prompts over time. Experiment fearlessly knowing you can always revert to a previous version.",
  },
  {
    icon: Sparkles,
    title: "Model Specifics",
    description:
      "Get tailored suggestions for specific models like GPT-4, Midjourney, or Claude to maximize their unique capabilities.",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-6 py-24 relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 pb-2"
        >
          Everything you need to <br />
          master prompt engineering
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-foreground/60 text-lg"
        >
          Powerful tools designed for creators, developers, and researchers.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:bg-foreground/[0.04] transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-foreground/80" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
