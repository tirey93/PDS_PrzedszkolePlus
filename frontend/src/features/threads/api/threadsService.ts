import { requestClient } from "@/lib/request/requestClient";

const CREATE_THREAD_ENDPOINT = "/Thread";

type CreateThreadRequestBody = {
    subject: string;
    participantId: string;
};

export class ThreadsService {
    public static async createOne(body: CreateThreadRequestBody): Promise<void> {
        await requestClient.post(CREATE_THREAD_ENDPOINT, body);
    }
}
