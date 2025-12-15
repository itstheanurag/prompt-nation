"use client";

import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Loader2, FolderOpen, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";
import { usePromptsStore } from "@/stores/prompts-store";
import { AddPromptModal } from "@/components/modals/add-prompt-modal";
import { EditPromptModal } from "@/components/modals/edit-prompt-modal";
import { SavedPromptCard } from "@/components/directory/saved-prompt-card";
import { getSavedPrompts } from "@/actions/prompts";

export default function DirectoryPage() {
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
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Prompt Directory
          </h1>
          <p className="text-foreground/60 mt-2">
            Manage and organize your collection of AI prompts.
          </p>
        </div>
        <button
          onClick={openAddPromptModal}
          className="bg-foreground text-background hover:bg-foreground/90 h-10 px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Prompt
        </button>
      </div>

      <div className="flex items-center gap-4 bg-background/60 backdrop-blur-md p-4 rounded-xl border border-foreground/10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-foreground/20 focus:border-foreground/20 transition-all text-sm placeholder:text-foreground/40 text-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium text-foreground">
          <Filter size={16} />
          Filters
        </button>
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
            <FolderOpen className="w-8 h-8 text-foreground/40" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {searchQuery ? "No matching prompts" : "No prompts yet"}
            </h3>
            <p className="text-foreground/60 max-w-sm mx-auto">
              {searchQuery
                ? "Try adjusting your search query."
                : "Create your first prompt to get started."}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={openAddPromptModal}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Create Prompt
            </button>
          )}
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

