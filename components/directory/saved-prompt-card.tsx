"use client";

import { useTransition, useState } from "react";
import { motion } from "motion/react";
import {
  MoreHorizontal,
  Star,
  Copy,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { deletePrompt, toggleStarPrompt } from "@/actions/prompts";
import { usePromptsStore, type SavedPrompt } from "@/stores/prompts-store";
import { useUIStore } from "@/stores/ui-store";

interface SavedPromptCardProps {
  prompt: SavedPrompt;
  index: number;
}

export function SavedPromptCard({ prompt, index }: SavedPromptCardProps) {
  const [isPending, startTransition] = useTransition();
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const { removePrompt, toggleStar, rollback, getPreviousState } =
    usePromptsStore();
  const { openEditPromptModal } = useUIStore();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleStar = () => {
    const previousPrompts = getPreviousState();
    const newStarred = !prompt.starred;

    // Optimistic update
    toggleStar(prompt.id);

    startTransition(async () => {
      const result = await toggleStarPrompt(prompt.id, newStarred);
      if (!result.success) {
        rollback(previousPrompts);
        toast.error(result.error || "Failed to update star");
      }
    });
  };

  const handleDelete = () => {
    const previousPrompts = getPreviousState();

    // Optimistic update
    removePrompt(prompt.id);
    toast.success("Prompt deleted");

    startTransition(async () => {
      const result = await deletePrompt(prompt.id);
      if (!result.success) {
        rollback(previousPrompts);
        toast.error(result.error || "Failed to delete prompt");
      }
    });

    setShowMenu(false);
  };

  const handleEdit = () => {
    openEditPromptModal(prompt);
    setShowMenu(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative p-6 rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-md hover:shadow-lg hover:border-foreground/20 transition-all duration-300 flex flex-col ${
        isPending ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {prompt.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-foreground/5 text-xs font-medium text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-foreground/40 hover:text-foreground transition-colors p-1 rounded-md hover:bg-foreground/5"
          >
            <MoreHorizontal size={16} />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-8 z-20 w-40 bg-background border border-foreground/10 rounded-lg shadow-xl py-1 overflow-hidden"
              >
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-foreground/5 transition-colors flex items-center gap-2"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={handleCopy}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-foreground/5 transition-colors flex items-center gap-2"
                >
                  <Copy size={14} />
                  Copy Prompt
                </button>
                <hr className="my-1 border-foreground/10" />
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors text-foreground">
        {prompt.title}
      </h3>
      <p className="text-sm text-foreground/60 mb-6 line-clamp-2 flex-1">
        {prompt.description || prompt.prompt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
        <span className="text-xs text-foreground/40">
          {formatDate(prompt.lastUsed || prompt.updatedAt)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleToggleStar}
            disabled={isPending}
            className={`p-2 rounded-md transition-colors ${
              prompt.starred
                ? "text-amber-400 bg-amber-400/10"
                : "text-foreground/40 hover:bg-foreground/5"
            }`}
          >
            <Star size={16} fill={prompt.starred ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-md text-foreground/40 hover:bg-foreground/5 hover:text-foreground transition-colors"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
