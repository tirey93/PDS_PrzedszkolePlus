import { requestClient } from "@/lib/request/requestClient";
import { News } from "@/features/news/types/News";

const CREATE_NEWS_ENDPOINT = "/Announcement";
const GET_NEWS_ENDPOINT = "/Announcement";
const EDIT_NEWS_ENDPOINT = "/Announcement/:id";
const DELETE_NEWS_ENDPOINT = "/Announcement/:id";

type NewsDto = {
    id: string;
    title: string;
    content: string;
    filePath: string;
    createdAt: string;
};

type AddNewsRequestBody = {
    title: string;
    content: string;
    filePath: string;
};

type EditNewsRequestBody = {
    title: string;
    content: string;
    filePath: string;
};

export class NewsService {
    public static async getAll(): Promise<News[]> {
        const { data } = await requestClient.get<NewsDto[]>(GET_NEWS_ENDPOINT);
        console.log(data);

        return data.map(NewsService.mapDtoToNews);
    }

    public static async create(body: AddNewsRequestBody): Promise<void> {
        await requestClient.post(CREATE_NEWS_ENDPOINT, body);
    }

    public static async update(body: EditNewsRequestBody, id: string): Promise<void> {
        await requestClient.put(EDIT_NEWS_ENDPOINT.replace(":id", id), body);
    }

    public static async delete(id: string): Promise<void> {
        await requestClient.delete(DELETE_NEWS_ENDPOINT.replace(":id", id));
    }

    private static mapDtoToNews(dto: NewsDto): News {
        return {
            id: dto.id.toString(),
            url: dto.filePath,
            title: dto.title,
            content: dto.content,
            createdAt: new Date(dto.createdAt),
        };
    }
}
