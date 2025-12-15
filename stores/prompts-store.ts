import { create } from "zustand";

export interface SavedPrompt {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  prompt: string;
  type: string;
  model: string | null;
  result: string | null;
  mediaUrl: string | null;
  tags: string[] | null;
  starred: boolean | null;
  lastUsed: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface PromptsState {
  prompts: SavedPrompt[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setPrompts: (prompts: SavedPrompt[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Optimistic update methods
  addPrompt: (prompt: SavedPrompt) => void;
  updatePrompt: (id: string, data: Partial<SavedPrompt>) => void;
  removePrompt: (id: string) => void;
  toggleStar: (id: string) => void;

  // Rollback support
  getPreviousState: () => SavedPrompt[];
  rollback: (previousPrompts: SavedPrompt[]) => void;
}

export const usePromptsStore = create<PromptsState>((set, get) => ({
  prompts: [],
  isLoading: true,
  error: null,

  setPrompts: (prompts) => set({ prompts, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Optimistic add - prepends new prompt
  addPrompt: (prompt) =>
    set((state) => ({
      prompts: [prompt, ...state.prompts],
    })),

  // Optimistic update
  updatePrompt: (id, data) =>
    set((state) => ({
      prompts: state.prompts.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
      ),
    })),

  // Optimistic delete
  removePrompt: (id) =>
    set((state) => ({
      prompts: state.prompts.filter((p) => p.id !== id),
    })),

  // Optimistic star toggle
  toggleStar: (id) =>
    set((state) => ({
      prompts: state.prompts.map((p) =>
        p.id === id ? { ...p, starred: !p.starred, updatedAt: new Date() } : p
      ),
    })),

  // Get current state for rollback
  getPreviousState: () => get().prompts,

  // Rollback to previous state on error
  rollback: (previousPrompts) => set({ prompts: previousPrompts }),
}));
