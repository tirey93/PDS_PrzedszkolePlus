import { create } from "zustand/react";
import { User } from "@/types/User";

type UseUser = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

const useUserStore = create<UseUser>((set) => ({
    user: null,
    login: (user) => set(() => ({ user })),
    logout: () => set(() => ({ user: null })),
}));

export const useUser = (): UseUser => {
    const user = useUserStore((state) => state.user);
    const login = useUserStore((state) => state.login);
    const logout = useUserStore((state) => state.logout);

    return { user, login, logout };
};
