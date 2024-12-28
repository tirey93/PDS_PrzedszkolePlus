import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AddMenuFormInputs = {
    date: string;
    breakfast?: string;
    lunch?: string;
    dinner?: string;
};

export const useAddMenuForm = (initialValue?: AddMenuFormInputs) => {
    const requirements = yup.object({
        date: yup.string().required(),
        lunch: yup.string(),
        breakfast: yup.string(),
        dinner: yup.string(),
    });

    return useForm<AddMenuFormInputs>({
        resolver: yupResolver<AddMenuFormInputs>(requirements),
        defaultValues: { ...initialValue },
    });
};
