import { FileText, FileJson, MessageSquare } from "lucide-react";

export const OUTPUT_FORMATS = [
  {
    id: "text",
    label: "Text",
    icon: FileText,
    description: "Clear structured language",
  },
  {
    id: "json",
    label: "JSON",
    icon: FileJson,
    description: "Structured output",
  },
  {
    id: "tone",
    label: "Tone",
    icon: MessageSquare,
    description: "Stylized voice",
  },
];

export const AVAILABLE_MODELS = [
  {
    id: "gpt-oss-120b",
    label: "GPT OSS 120B",
    description: "Colossal open-weights powerhouse",
  },
  {
    id: "gpt-oss-20b",
    label: "GPT OSS 20B",
    description: "Lean, nimble, and budget-friendly",
  },
  {
    id: "qwen-3-32b",
    label: "Qwen 3 32B",
    description: "High-capacity reasoning",
  },
];
