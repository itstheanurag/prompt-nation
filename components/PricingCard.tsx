"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    popular: boolean;
  };
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative p-8 rounded-2xl border bg-background flex flex-col",
        plan.popular ? "border-foreground shadow-xl" : "border-foreground/10"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-foreground text-background text-xs font-bold rounded-full">
          MOST POPULAR
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold tracking-tighter">
            {plan.price}
          </span>
          {plan.price !== "Custom" && (
            <span className="text-foreground/40 text-sm">/month</span>
          )}
        </div>
        <p className="text-sm text-foreground/60 leading-relaxed">
          {plan.description}
        </p>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 mt-0.5 text-foreground" />
            <span className="text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "w-full py-3 rounded-lg font-medium transition-all",
          plan.popular
            ? "bg-foreground text-background hover:opacity-90"
            : "border border-foreground/10 hover:bg-foreground/5"
        )}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}
