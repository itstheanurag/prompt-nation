"use client";

import { motion, AnimatePresence } from "motion/react";
import { Bookmark, Search, Filter, Plus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/ui-store";
import { usePromptsStore } from "@/stores/prompts-store";
import { AddPromptModal } from "@/components/modals/add-prompt-modal";
import { EditPromptModal } from "@/components/modals/edit-prompt-modal";
import { SavedPromptCard } from "@/components/directory/saved-prompt-card";
import { getSavedPrompts } from "@/actions/prompts";

export default function SavedPromptsPage() {
  const { prompts, isLoading, setPrompts, setLoading } = usePromptsStore();
  const { isAddPromptModalOpen, openAddPromptModal, closeAddPromptModal } =
    useUIStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch prompts on mount
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      const data = await getSavedPrompts();
      setPrompts(data);
    };
    fetchPrompts();
  }, [setPrompts, setLoading]);

  // Filter prompts based on search
  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-foreground/40" />
        </div>
      ) : filteredPrompts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-foreground/10 rounded-2xl bg-foreground/[0.02]"
        >
          <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center">
            <Bookmark className="w-8 h-8 text-foreground/40" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {searchQuery ? "No matching prompts" : "No saved prompts"}
            </h3>
            <p className="text-foreground/60 max-w-sm mx-auto">
              {searchQuery
                ? "Try adjusting your search query."
                : "Save your favorite prompts to access them quickly later."}
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPrompts.map((prompt, i) => (
              <SavedPromptCard key={prompt.id} prompt={prompt} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <AddPromptModal
        isOpen={isAddPromptModalOpen}
        onClose={closeAddPromptModal}
      />
      <EditPromptModal />
    </div>
  );
}

