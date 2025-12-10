"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wand2,
  FolderOpen,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/ui-store";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Fine Tuner",
    href: "/dashboard/fine-tuner",
    icon: Wand2,
  },
  {
    title: "Prompt Directory",
    href: "/dashboard/directory",
    icon: FolderOpen,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const { signOut } = useAuthStore();
  const router = useRouter();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-90 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 360,
        }}
        className={cn(
          "fixed inset-y-0 left-0 z-100 flex flex-col border-r border-foreground/10 bg-background/80 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 md:sticky md:top-0 md:h-screen md:z-30 overflow-hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ width: isCollapsed ? 80 : 240 }} // Inline style for width to work with the class transition for transform
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-foreground/10">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-xl bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent"
              >
                PromptNation
              </motion.span>
            )}
          </AnimatePresence>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-2 hover:bg-foreground/5 rounded-md transition-colors text-foreground/60 hover:text-foreground"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={closeSidebar}
            className="md:hidden p-2 hover:bg-foreground/5 rounded-md transition-colors text-foreground/60 hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 px-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            if (item.title === "Prompt Directory") {
              return (
                <div key={item.title}>
                  <button
                    onClick={() => {
                      if (isCollapsed) setIsCollapsed(false);
                      setIsDirectoryOpen(!isDirectoryOpen);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                    )}
                  >
                    <FolderOpen size={20} className="shrink-0" />
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="whitespace-nowrap flex-1 text-left"
                          >
                            Directory
                          </motion.span>
                          <motion.div
                            animate={{ rotate: isDirectoryOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </button>

                  <AnimatePresence>
                    {!isCollapsed && isDirectoryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-9 space-y-1"
                      >
                        <Link
                          href="/dashboard/directory/history"
                          className={cn(
                            "block py-2 text-sm transition-colors",
                            pathname === "/dashboard/directory/history"
                              ? "text-foreground font-medium"
                              : "text-foreground/60 hover:text-foreground"
                          )}
                        >
                          History
                        </Link>
                        <Link
                          href="/dashboard/directory/saved"
                          className={cn(
                            "block py-2 text-sm transition-colors",
                            pathname === "/dashboard/directory/saved"
                              ? "text-foreground font-medium"
                              : "text-foreground/60 hover:text-foreground"
                          )}
                        >
                          Saved Prompts
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-foreground/10 text-foreground font-medium"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "shrink-0 transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/60 group-hover:text-foreground"
                  )}
                />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-full bg-foreground rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </div>


      </motion.aside>
    </>
  );
}
