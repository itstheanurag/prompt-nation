"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy, FileText, Code, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FineTuneResult {
  text: string;
  json: string;
  toon: string;
}

interface TerminalOutputProps {
  result: FineTuneResult | null;
}

export function TerminalOutput({ result }: TerminalOutputProps) {
  const [activeTab, setActiveTab] = useState<keyof FineTuneResult>("text");
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "text", label: "Text Prompt", icon: FileText },
    { id: "json", label: "JSON Format", icon: Code },
    { id: "toon", label: "Toon Prompt", icon: ImageIcon },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="space-y-4 pt-4 border-t border-foreground/10"
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as keyof FineTuneResult)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleCopy(result[activeTab])}
              className="p-2 bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-foreground/60" />
              )}
            </button>
          </div>
          <pre className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-xl p-6 overflow-x-auto text-sm font-mono text-foreground/80 leading-relaxed whitespace-pre-wrap text-left">
            {result[activeTab]}
          </pre>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
