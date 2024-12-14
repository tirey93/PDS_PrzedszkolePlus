import { requestClient } from "@/lib/request/requestClient";

const CREATE_NEWS_ENDPOINT = "/News";
const EDIT_NEWS_ENDPOINT = "/News/:id";
const DELETE_NEWS_ENDPOINT = "/News/:id";

type AddNewsRequestBody = {
    title: string;
    content: string;
    url: string;
};

type EditNewsRequestBody = {
    id: string;
    title: string;
    content: string;
    url: string;
};

type DeleteNewsRequestBody = {
    id: string;
};

export class NewsService {
    public static async create(body: AddNewsRequestBody): Promise<void> {
        await requestClient.post(CREATE_NEWS_ENDPOINT, body);
    }

    public static async update(body: EditNewsRequestBody): Promise<void> {
        await requestClient.post(EDIT_NEWS_ENDPOINT, body);
    }

    public static async delete(body: DeleteNewsRequestBody): Promise<void> {
        await requestClient.post(DELETE_NEWS_ENDPOINT, body);
    }
}
