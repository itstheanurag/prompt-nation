import { create } from "zustand";
import { authClient } from "../lib/auth-client";

interface AuthState {
  user: typeof authClient.$Infer.Session.user | null;
  session: typeof authClient.$Infer.Session.session | null;
  isLoading: boolean;
  error: string | null;
  fetchSession: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  fetchSession: async () => {
    set({ isLoading: true });
    try {
      const { data } = await authClient.getSession();
      set({
        user: data?.user ?? null,
        session: data?.session ?? null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch session", isLoading: false });
    }
  },
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        set({ error: error.message, isLoading: false });
        throw error;
      }
      // Session will be updated by fetchSession or redirect usually, but we can update state if we get data back
      // better-auth signIn might not return session immediately depending on config, but usually it does or we redirect.
      // Let's refetch session to be sure.
      const sessionData = await authClient.getSession();
      set({
        user: sessionData.data?.user ?? null,
        session: sessionData.data?.session ?? null,
        isLoading: false,
      });
    } catch (e: any) {
      set({ error: e.message || "Sign in failed", isLoading: false });
      throw e;
    }
  },
  signOut: async () => {
    set({ isLoading: true });
    await authClient.signOut();
    set({ user: null, session: null, isLoading: false });
  },
}));
