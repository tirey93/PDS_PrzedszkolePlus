import { create } from "zustand";

type AppError = {
    message: string;
    severity: "fatal";
};

type AppOverlayState = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    error: AppError | null;
};

export const useAppOverlayStore = create<AppOverlayState>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    error: null,
}));
