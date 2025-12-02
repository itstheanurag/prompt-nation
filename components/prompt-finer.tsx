"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wand2,
  Copy,
  Check,
  Code,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MOCK_RESPONSES,
  PREDEFINED_RESPONSES,
  EXAMPLE_PROMPTS,
  OutputFormat,
} from "@/data/prompts";

export function PromptFineTuner({
  showHeader = true,
  className,
}: {
  showHeader?: boolean;
  className?: string;
}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<Record<OutputFormat, string> | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<OutputFormat>("text");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if we have a predefined response for this input
    if (PREDEFINED_RESPONSES[input]) {
      setOutput(PREDEFINED_RESPONSES[input]);
    } else {
      // Fallback to generic generation
      setOutput({
        text: MOCK_RESPONSES.text(input),
        json: MOCK_RESPONSES.json(input),
        toon: MOCK_RESPONSES.toon(input),
      });
    }
    setIsLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="prompt-fine-tuner"
      className={cn(
        "container mx-auto px-6 py-24 relative overflow-hidden",
        className
      )}
    >
      {/* Background Decor */}
      {showHeader && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl -z-10" />
      )}

      <div className="max-w-4xl mx-auto space-y-12">
        {showHeader && (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              AI Fine-Tuner
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50"
            >
              Refine your prompts <br />
              <span className="text-foreground/60">in seconds</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-foreground/60 max-w-2xl mx-auto"
            >
              Transform simple ideas into professional, structured prompts
              optimized for different use cases.
            </motion.p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-background/50 backdrop-blur-xl border border-foreground/10 rounded-3xl p-2 shadow-2xl"
        >
          <div className="bg-background rounded-2xl border border-foreground/5 p-2 space-y-6">
            {/* Input Area */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <label className="text-sm font-medium text-foreground/70 ml-1">
                  Your Idea
                </label>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {EXAMPLE_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInput(prompt)}
                      className="text-[10px] px-2 py-1 md:text-xs md:px-3 md:py-1.5 rounded-full bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground transition-colors border border-transparent hover:border-foreground/10"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInput(value);
                    if (!value.trim()) setOutput(null);
                  }}
                  placeholder="e.g., Create a modern looking gym website, use this and that tech stack..."
                  className="w-full h-32 bg-foreground/3 border border-foreground/10 rounded-xl p-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !input.trim()}
                  className="absolute bottom-4 right-4 px-3 py-1.5 md:px-4 md:py-2 bg-foreground text-background rounded-lg font-medium text-xs md:text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Refining...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Fine Tune
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Area */}
            <AnimatePresence mode="wait">
              {output && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-foreground/10"
                >
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {[
                      { id: "text", label: "Text Prompt", icon: FileText },
                      { id: "json", label: "JSON Format", icon: Code },
                      { id: "toon", label: "Toon Prompt", icon: ImageIcon },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as OutputFormat)}
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
                        onClick={() => handleCopy(output[activeTab])}
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
                      {output[activeTab]}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
