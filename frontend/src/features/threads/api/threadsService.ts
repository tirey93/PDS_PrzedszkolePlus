import { requestClient } from "@/lib/request/requestClient";
import { Message, Thread } from "@/features/threads/types/Thread";

const GET_ALL_THREADS_ENDPOINT = "/Thread/ByLoggedUser";
const CREATE_THREAD_ENDPOINT = "/Thread";
const MARK_THREAD_AS_SEEN_ENDPOINT = "/Thread/:id/Read";
const GET_THREAD_MESSAGES_ENDPOINT = "/Message/ByThread/:id";
const CREATE_MESSAGE_ENDPOINT = "/Message";

type CreateThreadRequestBody = {
    subject: string;
    parentId: number;
    caregiverId: number;
};

type CreateMessageRequestBody = {
    content: string;
    threadId: number;
};

type ThreadDto = {
    id: number;
    subject: string;
    receiverId: number;
    isRead: boolean;
    createdAt: string;
};

type MessageDto = {
    id: number;
    senderId: number;
    content: string;
    createdAt: string;
};

export class ThreadsService {
    public static async getAll(): Promise<Thread[]> {
        const { data } = await requestClient.get<ThreadDto[]>(GET_ALL_THREADS_ENDPOINT);
        return data.map(ThreadsService.mapDtoToThread);
    }

    public static async createOne(body: CreateThreadRequestBody): Promise<void> {
        await requestClient.post(CREATE_THREAD_ENDPOINT, body);
    }

    public static async markAsSeen(id: string): Promise<void> {
        await requestClient.put(MARK_THREAD_AS_SEEN_ENDPOINT.replace(":id", id));
    }

    public static async getThreadMessages(id: string): Promise<Message[]> {
        const { data } = await requestClient.get<MessageDto[]>(GET_THREAD_MESSAGES_ENDPOINT.replace(":id", id));
        return data.map(ThreadsService.mapDtoToMessage);
    }

    public static async sendMessage(body: CreateMessageRequestBody): Promise<void> {
        await requestClient.post(CREATE_MESSAGE_ENDPOINT, body);
    }

    private static mapDtoToThread(dto: ThreadDto): Thread {
        return {
            id: dto.id.toString(),
            subject: dto.subject,
            participantId: dto.receiverId,
            seen: dto.isRead,
            createdAt: new Date(dto.createdAt),
        };
    }

    private static mapDtoToMessage(dto: MessageDto): Message {
        return {
            id: dto.id.toString(),
            createdAt: new Date(dto.createdAt),
            content: dto.content,
            senderId: dto.senderId.toString(),
        };
    }
}
