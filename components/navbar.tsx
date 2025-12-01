"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl tracking-tighter flex items-center gap-2"
          >
            <Terminal className="w-5 h-5" />
            PROMPT NATION
          </motion.div>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/#explore"
            className="hover:text-foreground/60 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-foreground/60 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="hover:text-foreground/60 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
