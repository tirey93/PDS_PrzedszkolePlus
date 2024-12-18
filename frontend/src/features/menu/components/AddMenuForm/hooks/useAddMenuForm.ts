import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Menu } from "@/features/menu/types/Menu";

export type AddMenuFormInputs = {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
};

export const useAddMenuForm = (initialValue?: Menu) => {
    const requirements = yup.object({
        lunch: yup.string(),
        breakfast: yup.string(),
        dinner: yup.string(),
    });

    return useForm<AddMenuFormInputs>({
        resolver: yupResolver<AddMenuFormInputs>(requirements),
        defaultValues: { ...initialValue },
    });
};
