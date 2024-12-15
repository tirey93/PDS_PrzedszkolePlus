export type UserRole = "Caretaker" | "Parent";

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
    username: string;
    role: UserRole;
    isActive: boolean;
};
