export type UserRole = "Admin" | "User";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    login: string;
    role: UserRole;
    isActive: boolean;
};
