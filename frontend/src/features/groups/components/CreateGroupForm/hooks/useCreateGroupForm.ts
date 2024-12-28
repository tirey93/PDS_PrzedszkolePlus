import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type CreateGroupFormInputs = {
    name: string;
};

export const GROUP_NAME_HELP = "Wymagane min. 3 znaki";

export const useCreateGroupForm = () => {
    const requirements = yup.object({
        name: yup.string().required(GROUP_NAME_HELP),
    });

    return useForm<CreateGroupFormInputs>({
        resolver: yupResolver<CreateGroupFormInputs>(requirements),
    });
};
