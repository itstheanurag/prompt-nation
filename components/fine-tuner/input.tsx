import { Loader2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function PromptInput({
  value,
  onChange,
  onGenerate,
  isGenerating,
}: PromptInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground/70 ml-1">
          Your Idea
        </label>
      </div>
      <div className="relative group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Create a modern looking gym website, use this and that tech stack..."
          className="w-full h-40 bg-foreground/3 border border-foreground/10 rounded-xl p-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all"
        />
        <button
          onClick={onGenerate}
          disabled={isGenerating || !value.trim()}
          className="absolute bottom-4 right-4 px-3 py-1.5 md:px-4 md:py-2 bg-foreground text-background rounded-lg font-medium text-xs md:text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
        >
          {isGenerating ? (
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
  );
}
