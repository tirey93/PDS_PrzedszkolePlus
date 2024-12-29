import { requestClient } from "@/lib/request/requestClient";
import { Message, Thread } from "@/features/threads/types/Thread";

const GET_ALL_THREADS_ENDPOINT = "/Thread";
const GET_THREAD_MESSAGES_ENDPOINT = "/Thread/:id/Messages";
const CREATE_THREAD_ENDPOINT = "/Thread";
const MARK_THREAD_AS_SEEN_ENDPOINT = "/Thread/:id";

type CreateThreadRequestBody = {
    subject: string;
    participantId: string;
};

type ThreadDto = {
    id: number;
    subject: string;
    participantId: string;
    createdAt: string;
};

type MessageDto = {
    id: number;
    threadId: number;
    senderId: number;
    content: string;
    createdAt: string;
    seen: boolean;
};

export class ThreadsService {
    public static async getAll(): Promise<Thread[]> {
        const { data } = await requestClient.get<ThreadDto[]>(GET_ALL_THREADS_ENDPOINT);
        return data.map(ThreadsService.mapDtoToThread);
    }

    public static async getThreadMessages(id: string): Promise<Message[]> {
        const { data } = await requestClient.get<MessageDto[]>(GET_THREAD_MESSAGES_ENDPOINT.replace(":id", id));
        return data.map(ThreadsService.mapDtoToMessage);
    }

    public static async createOne(body: CreateThreadRequestBody): Promise<void> {
        await requestClient.post(CREATE_THREAD_ENDPOINT, body);
    }

    public static async markAsSeen(id: string): Promise<void> {
        await requestClient.put(MARK_THREAD_AS_SEEN_ENDPOINT.replace(":id", id));
    }

    private static mapDtoToThread(dto: ThreadDto): Thread {
        return {
            id: dto.id.toString(),
            subject: dto.subject,
            createdAt: new Date(dto.createdAt),
            participantId: dto.participantId,
        };
    }

    private static mapDtoToMessage(dto: MessageDto): Message {
        return {
            id: dto.id.toString(),
            createdAt: new Date(dto.createdAt),
            content: dto.content,
            threadId: dto.threadId.toString(),
            senderId: dto.senderId.toString(),
            seen: dto.seen,
        };
    }
}
