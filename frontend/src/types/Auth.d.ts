export type UserRole = "Teacher" | "Parent";

export type UserDetails = {
    id: number;
    name: string;
    role: UserRole;
    firstName: string;
    lastName: string;
};
