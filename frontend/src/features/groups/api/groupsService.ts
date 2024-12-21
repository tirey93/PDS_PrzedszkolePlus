import { Group } from "@/features/groups/types/Group";
import { requestClient } from "@/lib/request/requestClient";

const GET_OWN_GROUP_REQUEST_URL = "/Group/ByLoggedUser";
const GET_ALL_GROUPS_REQUEST_URL = "/Group";

type GroupDto = {
    id: number;
    name: string;
    caregiverId: number;
    createdAt: string;
};

export class GroupsService {
    public static async getOwn(): Promise<Group> {
        const { data } = await requestClient.get<GroupDto>(GET_OWN_GROUP_REQUEST_URL);
        return GroupsService.mapDtoToGroup(data);
    }

    public static async getAll(): Promise<Group[]> {
        const { data } = await requestClient.get<GroupDto[]>(GET_ALL_GROUPS_REQUEST_URL);
        return data.map(GroupsService.mapDtoToGroup);
    }

    private static mapDtoToGroup(dto: GroupDto): Group {
        return { id: dto.id.toString(), name: dto.name, caregiverId: dto.caregiverId.toString() };
    }
}
