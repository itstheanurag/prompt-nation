"use client";

import { motion } from "motion/react";
import { Wand2, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

const DEMO_STEPS = [
  {
    input: "write a story about a robot",
    output: "Write a short story about a robot who discovers emotions.",
    status: "Basic",
  },
  {
    input: "make it more emotional and sad",
    output:
      "Write a poignant short story about a service robot in a post-apocalyptic world who discovers the concept of 'grief' after finding its creator's old diary. Focus on sensory details and internal monologue.",
    status: "Enhanced",
  },
  {
    input: "add style of Isaac Asimov",
    output:
      "Compose a short story in the style of Isaac Asimov, featuring a positronic robot named R-42. Set in a desolate future Earth, explore the conflict between the Three Laws of Robotics and the robot's emerging capacity for human-like sorrow upon discovering its creator's final logs. Maintain a clinical yet deeply philosophical tone.",
    status: "Expert",
  },
];

export function AIPromptBuilder() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % DEMO_STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium"
          >
            <Wand2 className="w-4 h-4" />
            AI Copilot
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 pb-2"
          >
            Turn vague ideas into <br />
            engineering masterpieces
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/60 leading-relaxed"
          >
            Struggling to get the right output? Our AI assistant analyzes your
            intent, suggests specific improvements, and helps you craft the
            perfect prompt for any model.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {[
              "Context enhancement suggestions",
              "Model-specific optimizations",
              "Tone and style calibration",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-green-500" />
                </div>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all flex items-center gap-2 group"
          >
            Try AI Builder
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Interactive Demo UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50" />
          <div className="relative bg-background border border-foreground/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/5 bg-foreground/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="ml-4 text-xs font-mono text-foreground/40">
                Prompt Builder v2.0
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Chat Interface */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 rounded-full bg-foreground/20" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-foreground/5 rounded-2xl rounded-tl-none px-4 py-3 text-sm">
                      <p className="text-foreground/60 mb-1 text-xs uppercase tracking-wider font-bold">
                        Input
                      </p>
                      {DEMO_STEPS[step].input}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl rounded-tr-none px-4 py-3 text-sm relative">
                      <div className="absolute -top-3 right-4 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                        {DEMO_STEPS[step].status}
                      </div>
                      <p className="text-purple-500/60 mb-1 text-xs uppercase tracking-wider font-bold">
                        Optimized Prompt
                      </p>
                      <motion.p
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-foreground/90 font-medium"
                      >
                        {DEMO_STEPS[step].output}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center gap-2 pt-4">
                {DEMO_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === step
                        ? "w-8 bg-purple-500"
                        : "w-1.5 bg-foreground/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
