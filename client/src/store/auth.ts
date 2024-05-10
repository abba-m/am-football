import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserAttr {
  id?: string;
  username?: string;
  email?: string;
  emailVisibility?: boolean;
  name?: string;
  verified?: boolean;
  created?: Date | string;
  updated?: Date | string;
  avatar?: string;
}

interface CurrentUserState {
  token: string | null;
  user: UserAttr;
  setUser: (user: UserAttr) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}

export const useCurrentUserStore = create<
  CurrentUserState,
  [['zustand/persist', CurrentUserState], ['zustand/devtools', never]]
>(
  persist(
    (set) => ({
      token: null,
      user: {},
      setUser: (user: UserAttr) => set({ user }),
      setToken: (token: string) => set({ token }),
      clearUser: () => set({ user: {}, token: null }),
    }),
    {
      name: 'current-user',
    },
  ),
);
