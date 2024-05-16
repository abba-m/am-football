import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminAttr {
  id?: string;
  email?: string;
  avatar?: string | number;
  created?: string;
  updated?: string;
}

interface AdminState {
  token: string | null;
  admin: AdminAttr;
  isAuthenticated: boolean;
  setAdmin: (admin: AdminAttr) => void;
  setToken: (token: string) => void;
  clearAdmin: () => void;
}

export const useAdminStore = create<
  AdminState,
  [['zustand/persist', AdminState], ['zustand/devtools', never]]
>(
  persist(
    (set) => ({
      token: null,
      admin: {},
      isAuthenticated: false,
      setAdmin: (admin: AdminAttr) => set({ admin }),
      setToken: (token: string) => set({ token, isAuthenticated: true }),
      clearAdmin: () => set({ admin: {}, token: null, isAuthenticated: false }),
    }),
    {
      name: 'admin-store',
    },
  ),
);