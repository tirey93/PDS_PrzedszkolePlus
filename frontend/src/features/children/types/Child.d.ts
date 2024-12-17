import { User } from "@/types/User";

export type Child = {
    id: string;
    firstName: string;
    lastName: string;
    parent: User;
    caretaker: User;
    groupId: string;
    birthDate: Date;
};
