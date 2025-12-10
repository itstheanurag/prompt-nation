import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isAuthModalOpen: boolean;
  isAddPromptModalOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openAddPromptModal: () => void;
  closeAddPromptModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isAuthModalOpen: false,
  isAddPromptModalOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  openAddPromptModal: () => set({ isAddPromptModalOpen: true }),
  closeAddPromptModal: () => set({ isAddPromptModalOpen: false }),
}));
