"use client";

import { motion } from "motion/react";
import { Bookmark, Search, Filter, Plus } from "lucide-react";

export default function SavedPromptsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Saved Prompts</h1>
          <p className="text-foreground/60">
            Your personal collection of optimized prompts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search saved prompts..."
              className="pl-9 pr-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 w-full md:w-64"
            />
          </div>
          <button className="p-2 rounded-lg bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors">
            <Filter className="w-4 h-4 text-foreground/60" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Prompt
          </button>
        </div>
      </div>

      {/* Empty State for now */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-foreground/10 rounded-2xl bg-foreground/[0.02]"
      >
        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center">
          <Bookmark className="w-8 h-8 text-foreground/40" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">No saved prompts</h3>
          <p className="text-foreground/60 max-w-sm mx-auto">
            Save your favorite prompts to access them quickly later.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
