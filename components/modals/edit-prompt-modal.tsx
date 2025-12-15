"use client";

import { createPortal } from "react-dom";
import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { updatePrompt } from "@/actions/prompts";
import { usePromptsStore, type SavedPrompt } from "@/stores/prompts-store";
import { useUIStore } from "@/stores/ui-store";

export function EditPromptModal() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { isEditPromptModalOpen, editingPrompt, closeEditPromptModal } =
    useUIStore();

  const {
    updatePrompt: updatePromptInStore,
    rollback,
    getPreviousState,
  } = usePromptsStore();

  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
    description: "",
    type: "text",
    model: "",
    result: "",
    mediaUrl: "",
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (editingPrompt) {
      setFormData({
        title: editingPrompt.title || "",
        prompt: editingPrompt.prompt || "",
        description: editingPrompt.description || "",
        type: editingPrompt.type || "text",
        model: editingPrompt.model || "",
        result: editingPrompt.result || "",
        mediaUrl: editingPrompt.mediaUrl || "",
      });
    }
  }, [editingPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingPrompt) return;

    const previousPrompts = getPreviousState();
    const updateData = {
      title: formData.title,
      prompt: formData.prompt,
      description: formData.description || formData.prompt,
      type: formData.type,
      model: formData.model || undefined,
      result: formData.result || undefined,
      mediaUrl: formData.mediaUrl || undefined,
    };

    // Optimistic update
    updatePromptInStore(editingPrompt.id, updateData);
    closeEditPromptModal();

    startTransition(async () => {
      const result = await updatePrompt(editingPrompt.id, updateData);
      if (result.success) {
        toast.success("Prompt updated successfully");
      } else {
        rollback(previousPrompts);
        toast.error(result.error || "Failed to update prompt");
      }
    });
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isEditPromptModalOpen && editingPrompt && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEditPromptModal}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-4 z-[201]"
          >
            <div className="bg-background border border-foreground/10 rounded-2xl shadow-2xl p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button
                onClick={closeEditPromptModal}
                className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold">Edit Prompt</h2>
                <p className="text-foreground/60 text-sm">
                  Update your saved prompt details.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. SEO Blog Generator"
                    className="w-full p-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full p-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-purple-500/20 outline-none"
                    >
                      <option value="text">Text</option>
                      <option value="json">JSON</option>
                      <option value="code">Code</option>
                      <option value="toon">Toon/Image</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Model</label>
                    <input
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      placeholder="e.g. Llama 3"
                      className="w-full p-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-purple-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of what this prompt does..."
                    className="w-full p-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-purple-500/20 outline-none min-h-[60px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Prompt</label>
                  <textarea
                    required
                    value={formData.prompt}
                    onChange={(e) =>
                      setFormData({ ...formData, prompt: e.target.value })
                    }
                    placeholder="Your refined prompt goes here..."
                    className="w-full p-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-purple-500/20 outline-none min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Result / Output</label>
                  <textarea
                    value={formData.result}
                    onChange={(e) =>
                      setFormData({ ...formData, result: e.target.value })
                    }
                    placeholder="Sample output from this prompt..."
                    className="w-full p-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-purple-500/20 outline-none min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Media URL (Optional)
                  </label>
                  <input
                    value={formData.mediaUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, mediaUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full p-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  />
                  <p className="text-xs text-foreground/40">
                    Paste a URL for an image or video result.
                  </p>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeEditPromptModal}
                    className="px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
