import { User } from "@/types/User";

export type Thread = {
    id: string;
    subject: string;
    createdAt: Date;
    participantId: string;
    participant?: User;
};

export type Message = {
    id: string;
    threadId: string;
    content: string;
    seen: boolean;
    createdAt: Date;
    senderId: string;
    sender?: User;
};
