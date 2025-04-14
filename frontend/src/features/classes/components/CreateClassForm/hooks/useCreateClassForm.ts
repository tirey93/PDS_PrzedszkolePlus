import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type CreateClassFormInputs = {
    name: string;
};

export const CLASS_NAME_HELP = "Wymagane min. 3 znaki";

export const useCreateClassForm = () => {
    const requirements = yup.object({
        name: yup.string().required(CLASS_NAME_HELP),
    });

    return useForm<CreateClassFormInputs>({
        resolver: yupResolver<CreateClassFormInputs>(requirements),
    });
};
