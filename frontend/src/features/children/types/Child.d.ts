import { User } from "@/types/User";
import { Group } from "@/features/groups/types/Group";

export type BaseChild = {
    id: string;
    firstName: string;
    lastName: string;
    parentId: string;
    groupId: string;
    dateOfBirth: Date;
    createdAt: Date;
};

export type Child = BaseChild & {
    parent?: User;
    caregiver?: User;
    group?: Group;
};
