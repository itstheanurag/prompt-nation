"use client";

import { useAuthStore } from "@/stores";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";

export function Header() {
  const { user, fetchSession } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <header className="h-16 border-b border-foreground/10 bg-background/80 backdrop-blur-xl sticky top-0 z-20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 hover:bg-foreground/5 rounded-md text-foreground/60 hover:text-foreground transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4">
          <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center text-foreground font-medium border border-foreground/10">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
