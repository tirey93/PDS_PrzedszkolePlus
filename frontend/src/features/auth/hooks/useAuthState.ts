import {UserDetails} from "@/types";
import {create} from "zustand";

type AuthStore = {
    user: UserDetails | null;
    setUser: (user: UserDetails) => void;
    clearUser: () => void;
};

export const useAuthState = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
