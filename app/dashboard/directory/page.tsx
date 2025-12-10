"use client";

import { motion } from "motion/react";
import { Search, Filter, MoreHorizontal, Copy, Star } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "@/stores/ui-store";
import { AddPromptModal, SavedPrompt } from "@/components/modals/add-prompt-modal";

const INITIAL_PROMPTS: SavedPrompt[] = [
  {
    id: 1,
    title: "SEO Blog Post Generator",
    description:
      "Generates SEO-optimized blog posts with proper heading structure and keyword density.",
    prompt: "Generate an SEO blog post...",
    type: "text",
    model: "GPT-4",
    result: "",
    tags: ["Marketing", "Writing"],
    lastUsed: "2 hours ago",
    starred: true,
  },
  {
    id: 2,
    title: "React Component Creator",
    description:
      "Creates modern React components with Tailwind CSS and TypeScript interfaces.",
    prompt: "Create a React component...",
    type: "code",
    model: "GPT-4",
    result: "",
    tags: ["Coding", "React"],
    lastUsed: "1 day ago",
    starred: false,
  },
  {
    id: 3,
    title: "Email Cold Outreach",
    description: "Drafts personalized cold outreach emails for B2B sales.",
    prompt: "Draft a cold email...",
    type: "text",
    model: "GPT-3.5",
    result: "",
    tags: ["Sales", "Email"],
    lastUsed: "3 days ago",
    starred: true,
  },
  {
    id: 4,
    title: "Python Script Debugger",
    description: "Analyzes Python code for errors and suggests optimizations.",
    prompt: "Debug this python script...",
    type: "code",
    model: "GPT-4",
    result: "",
    tags: ["Coding", "Python"],
    lastUsed: "1 week ago",
    starred: false,
  },
  {
    id: 5,
    title: "Social Media Caption",
    description:
      "Generates engaging captions for Instagram and LinkedIn posts.",
    prompt: "Write an Instagram caption...",
    type: "text",
    model: "GPT-4",
    result: "",
    tags: ["Social Media", "Marketing"],
    lastUsed: "1 week ago",
    starred: false,
  },
  {
    id: 6,
    title: "SQL Query Builder",
    description: "Translates natural language into complex SQL queries.",
    prompt: "Write a SQL query...",
    type: "code",
    model: "GPT-4",
    result: "",
    tags: ["Data", "SQL"],
    lastUsed: "2 weeks ago",
    starred: true,
  },
];

export default function DirectoryPage() {
  const [prompts, setPrompts] = useState(INITIAL_PROMPTS);
  const { isAddPromptModalOpen, openAddPromptModal, closeAddPromptModal } = useUIStore();

  const handleAddPrompt = (newPrompt: SavedPrompt) => {
    setPrompts([newPrompt, ...prompts]);
  };

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
          className="bg-foreground text-background hover:bg-foreground/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
        >
          + New Prompt
        </button>
      </div>

      <div className="flex items-center gap-4 bg-background/60 backdrop-blur-md p-4 rounded-xl border border-foreground/10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full h-10 pl-10 pr-4 rounded-md bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-foreground/20 focus:border-foreground/20 transition-all text-sm placeholder:text-foreground/40 text-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium text-foreground">
          <Filter size={16} />
          Filters
        </button>
      </div>

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

      <AddPromptModal 
        isOpen={isAddPromptModalOpen} 
        onClose={closeAddPromptModal} 
        onAdd={handleAddPrompt} 
      />
    </div>
  );
}
