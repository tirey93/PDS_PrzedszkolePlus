import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AssignChildToGroupFormInputs = {
    groupId: string;
};

export const CHILD_GROUP_HELP = "Grupa musi być przypisana";

export const useAssignChildToGroupForm = (initialValue?: Partial<AssignChildToGroupFormInputs>) => {
    const requirements = yup.object({
        groupId: yup.string().required(CHILD_GROUP_HELP),
    });

    return useForm<AssignChildToGroupFormInputs>({
        resolver: yupResolver<AssignChildToGroupFormInputs>(requirements),
        defaultValues: initialValue,
    });
};
