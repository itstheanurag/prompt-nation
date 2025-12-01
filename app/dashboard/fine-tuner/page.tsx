"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Copy,
  RefreshCw,
  FileJson,
  FileText,
  MessageSquare,
  Wand2,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const OUTPUT_FORMATS = [
  {
    id: "text",
    label: "Text",
    icon: FileText,
    description: "Clear, structured natural language",
  },
  {
    id: "json",
    label: "JSON",
    icon: FileJson,
    description: "Structured data for programmatic use",
  },
  {
    id: "tone",
    label: "Tone",
    icon: MessageSquare,
    description: "Stylized voice and personality",
  },
];

export default function FineTunerPage() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("text");
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!inputPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedOutput(null);

    // Simulate API call
    setTimeout(() => {
      let output = "";
      if (selectedFormat === "text") {
        output = `Here is a refined version of your prompt:\n\n"Act as an expert web developer specializing in fitness industry websites. Create a comprehensive dashboard layout for a gym management system. The dashboard should include key metrics such as daily active members, class bookings, revenue trends, and trainer availability. Use a modern, clean aesthetic with a high-contrast color palette suitable for a gym brand. Ensure the layout is responsive and user-friendly."`;
      } else if (selectedFormat === "json") {
        output = JSON.stringify(
          {
            role: "Expert Web Developer",
            context: "Gym Management System",
            task: "Create Dashboard Layout",
            requirements: [
              "Daily active members metric",
              "Class bookings overview",
              "Revenue trends chart",
              "Trainer availability schedule",
            ],
            style: {
              aesthetic: "Modern, Clean",
              palette: "High-contrast",
              responsiveness: "Mobile-first",
            },
          },
          null,
          2
        );
      } else {
        output = `Tone: Professional, Energetic, and Motivational.\n\n"Welcome to the command center of your fitness empire! Design a high-octane dashboard that instantly empowers gym owners to track their wins. Visualize member activity with dynamic charts, manage class schedules with lightning speed, and monitor revenue flow at a glance. The design should scream 'performance'—sleek, powerful, and ready for action."`;
      }

      setGeneratedOutput(output);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-foreground/80" />
            Prompt Fine Tuner
          </h1>
          <p className="text-foreground/60 mt-2 text-lg">
            Transform simple ideas into professional, engineered prompts using
            AI.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-1 rounded-3xl bg-linear-to-b from-foreground/10 to-transparent">
            <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-[22px] p-6 shadow-xl">
              <label className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-xs">
                  1
                </span>
                Your Raw Idea
              </label>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="e.g. Create a dashboard for a gym website..."
                className="w-full min-h-[200px] p-4 rounded-xl bg-foreground/5 border border-foreground/10 focus:ring-2 focus:ring-foreground/20 focus:border-foreground/20 transition-all resize-none placeholder:text-foreground/40 text-foreground text-base leading-relaxed"
              />
            </div>
          </div>

          <div className="p-1 rounded-3xl bg-linear-to-b from-foreground/10 to-transparent">
            <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-[22px] p-6 shadow-xl space-y-6">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-xs">
                  2
                </span>
                Select Output Format
              </label>

              <div className="grid gap-3">
                {OUTPUT_FORMATS.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={cn(
                      "relative flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                      selectedFormat === format.id
                        ? "bg-foreground/5 border-foreground/20"
                        : "bg-transparent border-foreground/5 hover:bg-foreground/5 hover:border-foreground/10"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                        selectedFormat === format.id
                          ? "bg-foreground text-background"
                          : "bg-foreground/10 text-foreground/60"
                      )}
                    >
                      <format.icon size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {format.label}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {format.description}
                      </div>
                    </div>
                    {selectedFormat === format.id && (
                      <motion.div
                        layoutId="selected-check"
                        className="absolute right-4 text-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-foreground" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !inputPrompt.trim()}
                className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {isGenerating ? (
                  <RefreshCw className="animate-spin w-5 h-5" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                Enhance Prompt
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7">
          <div className="h-full min-h-[500px] p-1 rounded-3xl bg-linear-to-b from-foreground/10 to-transparent">
            <div className="h-full bg-[#0a0a0a] border border-foreground/10 rounded-[22px] overflow-hidden flex flex-col shadow-2xl relative">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="ml-4 flex items-center gap-2 text-xs font-mono text-white/40">
                    <Terminal size={12} />
                    <span>fine-tuner-output</span>
                  </div>
                </div>
                {generatedOutput && (
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(generatedOutput)
                    }
                    className="text-xs flex items-center gap-1.5 text-white/60 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-md hover:bg-white/10"
                  >
                    <Copy size={12} />
                    Copy
                  </button>
                )}
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar relative">
                <AnimatePresence mode="wait">
                  {generatedOutput ? (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-white/90 whitespace-pre-wrap leading-relaxed"
                    >
                      <span className="text-emerald-400">➜</span>{" "}
                      <span className="text-blue-400">~</span>{" "}
                      <span className="text-white/60">
                        generating optimized prompt...
                      </span>
                      <br />
                      <br />
                      {generatedOutput}
                      <br />
                      <br />
                      <span className="text-emerald-400">➜</span>{" "}
                      <span className="text-blue-400">~</span>{" "}
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-white/60 align-middle ml-1"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-white/20"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Terminal size={32} />
                      </div>
                      <p className="text-sm">Waiting for input...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
