"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PromptCard } from "@/components/prompt-card";
import { PricingCard } from "@/components/princing-card";
import { Footer } from "@/components/footer";

import { AIPromptBuilder } from "@/components/ai-promt-builder";
import { PersonalLibrary } from "@/components/personal-library";
import { UseCases } from "@/components/use-cases";
import { PROMPTS, PRICING, CATEGORIES } from "@/data/data";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  DotPatternBackground,
  GridPatternBackground,
} from "@/components/ui/SectionBackgrounds";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPrompts =
    activeCategory === "All"
      ? PROMPTS
      : PROMPTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden relative">
      {/* Background Elements */}

      <Navbar />

      <main className="pt-24 md:pt-32 pb-20">
        <DotPatternBackground>
          <Hero />
        </DotPatternBackground>

        <AIPromptBuilder />

        <GridPatternBackground>
          <PersonalLibrary />
        </GridPatternBackground>

        {/* Prompt Showcase Section */}
        <section className="container mx-auto px-6 py-12 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 pb-2">
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

        <UseCases />

        <HowItWorks />

        {/* Pricing Section */}
        <section className="container mx-auto px-6 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-foreground/2 rounded-3xl -z-10" />
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 pb-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-sm md:text-base text-foreground/60">
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
