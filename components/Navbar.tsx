"use client";

import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-xl tracking-tighter flex items-center gap-2"
        >
          <Terminal className="w-5 h-5" />
          PROMPT NATION
        </motion.div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-foreground/60 transition-colors">
            Explore
          </a>
          <a href="#" className="hover:text-foreground/60 transition-colors">
            Pricing
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
          >
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
}
