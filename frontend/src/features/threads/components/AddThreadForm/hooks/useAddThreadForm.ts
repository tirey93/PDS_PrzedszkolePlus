import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AddThreadFormInputs = {
    participantId: string;
    subject: string;
};

export const THREAD_PARTICIPANT_REQUIREMENT = "Wybierz uczestnika wątku";
export const THREAD_SUBJECT_REQUIREMENT = "Temat wątku jest wymagany";

export const useAddThreadForm = () => {
    const requirements = yup.object({
        participantId: yup.string().required(THREAD_PARTICIPANT_REQUIREMENT),
        subject: yup.string().required(THREAD_SUBJECT_REQUIREMENT),
    });

    return useForm<AddThreadFormInputs>({
        resolver: yupResolver<AddThreadFormInputs>(requirements),
    });
};
