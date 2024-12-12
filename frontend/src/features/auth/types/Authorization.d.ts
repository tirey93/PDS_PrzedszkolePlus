import { UserRole } from "@/features/auth/types/User";

export type AccessLevel = "authenticated" | "unauthenticated" | UserRole;
