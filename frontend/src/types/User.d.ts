export type UserRole = "Caretaker" | "Parent";

export type User = {
    firstName: string;
    lastName: string;
    login: string;
    role: UserRole;
};

export type UserDTO = {
    displayName: string;
    username: string;
    role: UserRole;
};
