import { User } from '@/graphql/generated/graphql';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: Partial<User> | null | undefined;
  setUser: (user: Partial<User> | null | undefined) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
    }),
    { name: 'auth' },
  ),
);
