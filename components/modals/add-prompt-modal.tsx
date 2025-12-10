"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Image as ImageIcon, Video, Check } from "lucide-react";

export interface SavedPrompt {
  id: number | string;
  title: string;
  description: string;
  prompt: string;
  type: string;
  model: string;
  result: string;
  mediaUrl?: string;
  tags: string[];
  lastUsed: string;
  starred: boolean;
}

interface AddPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (prompt: SavedPrompt) => void;
}

export function AddPromptModal({ isOpen, onClose, onAdd }: AddPromptModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
    type: "text",
    model: "",
    result: "",
    mediaUrl: "",
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      title: formData.title,
      description: formData.prompt, // Using prompt as description for now
      prompt: formData.prompt,
      type: formData.type,
      model: formData.model,
      result: formData.result,
      mediaUrl: formData.mediaUrl,
      tags: [formData.type, "Custom"], 
      lastUsed: "Just now",
      starred: false,
    });
    onClose();
    setFormData({
      title: "",
      prompt: "",
      type: "text",
      model: "",
      result: "",
      mediaUrl: "",
    });
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold">Add New Prompt</h2>
                <p className="text-foreground/60 text-sm">
                  Save your engineered prompt to your library.
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
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg hover:bg-foreground/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Save Prompt
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
