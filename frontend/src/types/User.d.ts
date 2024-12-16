export type UserRole = "Admin" | "User";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    login: string;
    role: UserRole;
    isActive: boolean;
};

export type UserDTO = {
    id: string;
    displayName: string;
    name: string;
    role: UserRole;
    isActive: boolean;
};
