import { Group } from "@/features/groups/types/Group";

export type Menu = {
    id: string;
    groupId: string;
    date: string;
    breakfast: string;
    lunch: string;
    dinner: string;
};

export type MenuWithGroup = Menu & { group?: Group };
