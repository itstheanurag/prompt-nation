"use client";

import { motion } from "motion/react";
import { Sparkles, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fineTunePrompt } from "@/actions/fine-tune";
import { PromptInput } from "@/components/fine-tuner/input";
import { ModelSelector } from "@/components/fine-tuner/model-selector";
import { TerminalOutput } from "@/components/fine-tuner/terminal-output";

export default function FineTunerPage() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("llama-3.1-8b-instant");
  // Store full result object {text, json, toon}
  const [generatedResult, setGeneratedResult] = useState<{
    text: string;
    json: string;
    toon: string;
  } | null>(null);

  useEffect(() => {
    const savedPrompt = localStorage.getItem("fineTunerPrompt");
    if (savedPrompt) {
      setInputPrompt(savedPrompt);
      localStorage.removeItem("fineTunerPrompt");
    }
  }, []);

  const handleGenerate = async () => {
    if (!inputPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      const result = await fineTunePrompt(inputPrompt, selectedModel);
      if (result) {
        setGeneratedResult(result);
      }
    } catch (error) {
      console.error("Dashboard generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

   return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Fine Tuner Protocol
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
           Refine Prompts <span className="text-foreground/40">Instantly</span>
        </h1>
        <p className="text-lg text-foreground/60 max-w-xl mx-auto">
          Same powerful engine, dedicated workspace.
        </p>
      </div>

      {/* Glassmorphic Card */}
      <div className="bg-background/50 backdrop-blur-xl border border-foreground/10 rounded-3xl p-2 shadow-2xl">
        <div className="bg-background rounded-2xl border border-foreground/5 p-6 space-y-6">
          
          <ModelSelector
            selectedModel={selectedModel}
            onSelect={setSelectedModel}
          />
          
          <PromptInput 
            value={inputPrompt} 
            onChange={setInputPrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          <TerminalOutput result={generatedResult} />
        </div>
      </div>
    </div>
  );
}
