"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PromptCard } from "@/components/PromptCard";
import { PricingCard } from "@/components/PricingCard";
import { Footer } from "@/components/Footer";
import { PROMPTS, PRICING, CATEGORIES } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPrompts =
    activeCategory === "All"
      ? PROMPTS
      : PROMPTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]" />
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]" />
      </div>

      <Navbar />

      <main className="pt-32 pb-20">
        <Hero />

        {/* Prompt Showcase Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Prompts
            </h2>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((item, i) => (
                <PromptCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-20 text-foreground/40">
              No prompts found in this category yet.
            </div>
          )}
        </section>

        <HowItWorks />

        {/* Pricing Section */}
        <section className="container mx-auto px-6 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-foreground/[0.02] rounded-3xl -z-10" />
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-foreground/60">
              Start for free, upgrade when you need more power.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
