"use client";

import { motion } from "motion/react";
import {
  Code2,
  PenTool,
  FlaskConical,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const USE_CASES = [
  {
    icon: Code2,
    title: "Developers",
    description:
      "Generate boilerplate, debug code, and write documentation 10x faster.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: PenTool,
    title: "Content Creators",
    description:
      "Overcome writer's block and generate endless ideas for blogs, videos, and social media.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: FlaskConical,
    title: "Researchers",
    description:
      "Summarize papers, extract key insights, and brainstorm hypotheses efficiently.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Briefcase,
    title: "Entrepreneurs",
    description:
      "Draft emails, create business plans, and analyze market trends in seconds.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export function UseCases() {
  return (
    <section className="container mx-auto px-6 py-12 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 pb-2"
        >
          Built for every <br />
          workflow & profession
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {USE_CASES.map((useCase, i) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl bg-foreground/2 border border-foreground/5 hover:border-foreground/10 hover:bg-foreground/4 transition-all cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-xl ${useCase.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
              {useCase.title}
            </h3>
            <p className="text-foreground/60 text-xs md:text-sm leading-relaxed mb-6">
              {useCase.description}
            </p>

            <div className="flex items-center text-sm font-medium text-foreground/40 group-hover:text-foreground/80 transition-colors">
              Explore prompts{" "}
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
