import { User } from "@/types/User";

export type Thread = {
    id: string;
    subject: string;
    participantId: number;
    createdAt: Date;
    seen: boolean;
    participant?: User;
};

export type Message = {
    id: string;
    content: string;
    createdAt: Date;
    senderId: string;
    sender?: User;
};
