"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles, Search, Command } from "lucide-react";

const FLOATING_CARDS = [
  { text: "Cyberpunk City", x: -20, y: -10, delay: 0 },
  { text: "React Component", x: 20, y: -20, delay: 0.2 },
  { text: "Essay on Stoicism", x: -15, y: 10, delay: 0.4 },
  { text: "Calculus Problem", x: 25, y: 15, delay: 0.6 },
];

export function Hero() {
  return (
    <section className="relative container mx-auto px-6 mb-32 pt-10">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {FLOATING_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: card.x * 2, y: card.y * 2 }}
            animate={{
              opacity: [0, 0.4, 0],
              x: [card.x * 2, card.x, card.x * 2],
              y: [card.y * 2, card.y, card.y * 2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: card.delay,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-foreground/5 backdrop-blur-sm border border-foreground/10 px-4 py-2 rounded-lg text-xs font-mono text-foreground/40 whitespace-nowrap"
            style={{
              marginLeft: `${card.x}rem`,
              marginTop: `${card.y}rem`,
            }}
          >
            {card.text}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium text-foreground/80 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-bold">
            New
          </span>
          <span className="w-px h-3 bg-foreground/20 mx-1" />
          The Ultimate Prompt Directory
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-balance bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 pb-2"
        >
          Curate. Share. <br />
          Master AI.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
        >
          A community-driven collection of high-quality prompts for Images,
          Videos, Essays, and Research. Document your results, tag the models,
          and build your personal library of intelligence.
        </motion.p>

        {/* Mock Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-lg mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-linear-to-r from-foreground/10 to-foreground/5 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative flex items-center gap-3 px-6 py-4 bg-background border border-foreground/10 rounded-full shadow-lg hover:border-foreground/20 transition-colors">
            <Search className="w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search for 'cyberpunk city'..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-foreground/40"
              disabled
            />
            <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-foreground/5 rounded text-xs text-foreground/40 font-mono">
              <Command className="w-3 h-3" /> K
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-12 pt-8"
        >
          <button className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all flex items-center gap-2 group shadow-lg shadow-foreground/20">
            Start Exploring
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-foreground/10 pt-8">
            {[
              { label: "Prompts", value: "10k+" },
              { label: "Models", value: "50+" },
              { label: "Generations", value: "1M+" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="text-2xl md:text-3xl font-bold tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
