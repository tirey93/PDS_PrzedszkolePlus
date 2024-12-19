import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AddChildFormInputs = {
    firstName: string;
    lastName: string;
    groupId: string;
    parentId: string;
    birthDate: Date;
};

export const useAddChildForm = (initialValue?: Partial<AddChildFormInputs>) => {
    const requirements = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        groupId: yup.string().required(),
        parentId: yup.string().required(),
        birthDate: yup.date().required(),
    });

    return useForm<AddChildFormInputs>({
        resolver: yupResolver<AddChildFormInputs>(requirements),
        defaultValues: initialValue,
    });
};
