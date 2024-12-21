import { requestClient } from "@/lib/request/requestClient";
import { BaseChild } from "@/features/children/types/Child";

const CREATE_CHILD_ENDPOINT_URL = "/Child";
const UPDATE_CHILD_REQUEST_URL = "/Children/{id}/";
const REMOVE_CHILD_REQUEST_URL = "/Child/{id}/";
const GET_OWN_CHILDREN_REQUEST_URL = "/Child/ByLoggedUser";
const GET_CHILDREN_BY_GROUP_ID_REQUEST_URL = "/Child/ByGroup/{id}";
const GET_CHILDREN_BY_PARENT_ID_REQUEST_URL = "/Child/ByParent/{id}";
const ASSIGN_CHILD_TO_GROUP_REQUEST_URL = "/Child/{childId}/group/${groupId}";

type CreateChildRequestBody = {
    firstName: string;
    lastName: string;
    groupId: number;
    parentId: number;
    dateOfBirth: string;
};

type UpdateChildRequestBody = {
    firstName: string;
    lastName: string;
    groupId: number;
    parentId: number;
    dateOfBirth: string;
};

type ChildDto = {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    parentId: number;
    groupId: number;
    createdAt: string;
};

export class ChildrenService {
    public static async createOne(body: CreateChildRequestBody): Promise<void> {
        await requestClient.post(CREATE_CHILD_ENDPOINT_URL, body);
    }

    public static async updateOne(body: UpdateChildRequestBody, id: string): Promise<void> {
        await requestClient.put(UPDATE_CHILD_REQUEST_URL.replace("{id}", id), body);
    }

    public static async assignToGroup({ childId, groupId }: { childId: string; groupId: string }): Promise<void> {
        await requestClient.put(
            ASSIGN_CHILD_TO_GROUP_REQUEST_URL.replace("{childId}", childId).replace("{groupId}", groupId)
        );
    }

    public static async removeOne(id: string): Promise<void> {
        await requestClient.delete(REMOVE_CHILD_REQUEST_URL.replace("{id}", id));
    }

    public static async getOwn(): Promise<BaseChild[]> {
        const { data } = await requestClient.get<ChildDto[]>(GET_OWN_CHILDREN_REQUEST_URL);
        return data.map(ChildrenService.mapDtoToChild);
    }

    public static async getByGroup(id: string): Promise<BaseChild[]> {
        const { data } = await requestClient.get<ChildDto[]>(GET_CHILDREN_BY_GROUP_ID_REQUEST_URL.replace("{id}", id));
        return data.map(ChildrenService.mapDtoToChild);
    }

    public static async getByParent(id: string): Promise<BaseChild[]> {
        const { data } = await requestClient.get<ChildDto[]>(GET_CHILDREN_BY_PARENT_ID_REQUEST_URL.replace("{id}", id));
        return data.map(ChildrenService.mapDtoToChild);
    }

    private static mapDtoToChild(dto: ChildDto): BaseChild {
        return {
            id: dto.id.toString(),
            firstName: dto.firstName,
            lastName: dto.lastName,
            dateOfBirth: new Date(dto.dateOfBirth),
            parentId: dto.parentId.toString(),
            groupId: dto.groupId.toString(),
            createdAt: new Date(dto.createdAt),
        };
    }
}
