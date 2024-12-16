import { User } from "@/types/User";

export type Child = {
    id: string;
    firstName: string;
    lastName: string;
    parent: User;
    caretaker: User;
    group: string;
    birthDate: Date;
};
