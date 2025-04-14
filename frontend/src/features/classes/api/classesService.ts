import { requestClient } from "@/lib/request/requestClient";
import { Class } from "@/features/classes/types/Class";

type ClassDto = {
    id: number;
    name: string;
};

type CreateClassRequest = {
    name: string;
};

export class ClassesService {
    public static async create(body: CreateClassRequest): Promise<Class> {
        const { data } = await requestClient.post<ClassDto>("/Classes", body);
        return ClassesService.mapDtoToClass(data);
    }

    private static mapDtoToClass(dto: ClassDto): Class {
        return {
            name: dto.name,
            id: dto.id,
        };
    }
}
