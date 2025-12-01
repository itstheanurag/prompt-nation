import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-12 bg-foreground/[0.02]">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Terminal className="w-5 h-5" />
          PROMPT NATION
        </div>
        <div className="text-sm text-foreground/40">
          © 2024 Prompt Nation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
