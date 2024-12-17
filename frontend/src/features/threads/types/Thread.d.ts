import { User } from "@/types/User";

export type Thread = {
    id: string;
    participant: User;
    subject: string;
    messages: Message[];
    createdAt: Date;
};

export type Message = {
    id: string;
    sender: User;
    threadId: string;
    content: string;
    createdAt: Date;
    seen: boolean;
};
