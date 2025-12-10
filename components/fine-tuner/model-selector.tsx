"use client";

import { cn } from "@/lib/utils";
import { AVAILABLE_MODELS } from "@/data/fine-tuner";

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground/70 ml-1">
        Model
      </label>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => onSelect(model.id)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2",
              selectedModel === model.id
                ? "bg-foreground/10 border-foreground/20 text-foreground"
                : "bg-transparent border-foreground/5 text-foreground/60 hover:bg-foreground/5"
            )}
            title={model.description}
          >
            <span className="font-medium">{model.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
