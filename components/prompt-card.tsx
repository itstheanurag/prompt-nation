"use client";

import { motion } from "motion/react";
import { Copy, Play, FileText, Calculator, Code, BookOpen } from "lucide-react";

interface PromptCardProps {
  item: {
    id: number;
    image: string;
    prompt: string;
    model: string;
    author: string;
    type: string;
    category: string;
  };
  index: number;
}

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Video":
      return <Play className="w-3 h-3" />;
    case "Essay":
    case "Research":
      return <FileText className="w-3 h-3" />;
    case "Math":
      return <Calculator className="w-3 h-3" />;
    case "Code":
      return <Code className="w-3 h-3" />;
    case "Lesson Plan":
      return <BookOpen className="w-3 h-3" />;
    default:
      return null;
  }
};

export function PromptCard({ item, index }: PromptCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative aspect-4/3 rounded-xl overflow-hidden bg-foreground/5 cursor-pointer border border-foreground/5 hover:border-foreground/20"
    >
      {/* Image Placeholder / Actual Image */}
      <img
        src={item.image}
        alt="Prompt result"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-60"
      />

      {/* Content Overlay - Always visible for non-image types to show context */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
              <TypeIcon type={item.type} />
              {item.type}
            </span>
          </div>
          <button className="text-white/60 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-white text-sm font-medium line-clamp-3 leading-relaxed drop-shadow-md">
            "{item.prompt}"
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs font-medium text-white/80 bg-black/30 px-2 py-1 rounded">
              {item.model}
            </span>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <div className="w-5 h-5 rounded-full bg-linear-to-br from-purple-500 to-blue-500 border border-white/20" />
              {item.author}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
