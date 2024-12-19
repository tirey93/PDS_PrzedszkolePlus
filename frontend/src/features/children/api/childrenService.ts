import { requestClient } from "@/lib/request/requestClient";

const CREATE_CHILD_ENDPOINT_URL = "/Children";
const UPDATE_CHILD_REQUEST_URL = "/Children/{id}/";
const REMOVE_CHILD_REQUEST_URL = "/Children/{id}/";

type CreateChildRequestBody = {
    firstName: string;
    lastName: string;
    groupId: string;
    parentId: string;
    birthDate: string;
};

type UpdateChildRequestBody = {
    firstName: string;
    lastName: string;
    groupId: string;
    parentId: string;
    birthDate: string;
};

export class ChildrenService {
    public static async createOne(body: CreateChildRequestBody): Promise<void> {
        await requestClient.post(CREATE_CHILD_ENDPOINT_URL, body);
    }

    public static async updateOne(body: UpdateChildRequestBody, id: string): Promise<void> {
        await requestClient.put(UPDATE_CHILD_REQUEST_URL.replace("{id}", id), body);
    }

    public static async removeOne(id: string): Promise<void> {
        await requestClient.delete(REMOVE_CHILD_REQUEST_URL.replace("{id}", id));
    }
}
