import { create } from "zustand";
import type { SavedPrompt } from "./prompts-store";

interface UIState {
  isSidebarOpen: boolean;
  isAuthModalOpen: boolean;
  isAddPromptModalOpen: boolean;
  isEditPromptModalOpen: boolean;
  editingPrompt: SavedPrompt | null;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openAddPromptModal: () => void;
  closeAddPromptModal: () => void;
  openEditPromptModal: (prompt: SavedPrompt) => void;
  closeEditPromptModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isAuthModalOpen: false,
  isAddPromptModalOpen: false,
  isEditPromptModalOpen: false,
  editingPrompt: null,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  openAddPromptModal: () => set({ isAddPromptModalOpen: true }),
  closeAddPromptModal: () => set({ isAddPromptModalOpen: false }),
  openEditPromptModal: (prompt) =>
    set({ isEditPromptModalOpen: true, editingPrompt: prompt }),
  closeEditPromptModal: () =>
    set({ isEditPromptModalOpen: false, editingPrompt: null }),
}));
