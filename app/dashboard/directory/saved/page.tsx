"use client";

import { motion } from "motion/react";
import { Bookmark, Search, Filter, Plus, MoreHorizontal, Star, Copy } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "@/stores/ui-store";
import { AddPromptModal, SavedPrompt } from "@/components/modals/add-prompt-modal";

export default function SavedPromptsPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const { isAddPromptModalOpen, openAddPromptModal, closeAddPromptModal } = useUIStore();

  const handleAddPrompt = (newPrompt: SavedPrompt) => {
    setPrompts([newPrompt, ...prompts]);
  };

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
          <button 
            onClick={openAddPromptModal}
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Prompt
          </button>
        </div>
      </div>

      {prompts.length === 0 ? (
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
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt, i) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative p-6 rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-md hover:shadow-lg hover:border-foreground/20 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-foreground/5 text-xs font-medium text-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-foreground/40 hover:text-foreground transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors text-foreground">
                {prompt.title}
              </h3>
              <p className="text-sm text-foreground/60 mb-6 line-clamp-2 flex-1">
                {prompt.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                <span className="text-xs text-foreground/40">
                  Used {prompt.lastUsed}
                </span>
                <div className="flex gap-2">
                  <button
                    className={`p-2 rounded-md transition-colors ${
                      prompt.starred
                        ? "text-amber-400 bg-amber-400/10"
                        : "text-foreground/40 hover:bg-foreground/5"
                    }`}
                  >
                    <Star
                      size={16}
                      fill={prompt.starred ? "currentColor" : "none"}
                    />
                  </button>
                  <button className="p-2 rounded-md text-foreground/40 hover:bg-foreground/5 hover:text-foreground transition-colors">
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AddPromptModal 
        isOpen={isAddPromptModalOpen} 
        onClose={closeAddPromptModal} 
        onAdd={handleAddPrompt} 
      />
    </div>
  );
}
