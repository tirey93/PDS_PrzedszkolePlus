export type UserRole = "Caretaker" | "Parent";

export type User = {
    firstName: string;
    lastName: string;
    login: string;
    role: UserRole;
};
