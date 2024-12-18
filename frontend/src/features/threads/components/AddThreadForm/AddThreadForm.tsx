import { Box, Button } from "@radix-ui/themes";
import classes from "./AddThreadForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    AddThreadFormInputs,
    THREAD_PARTICIPANT_REQUIREMENT,
    THREAD_SUBJECT_REQUIREMENT,
    useAddThreadForm,
} from "@/features/threads/components/AddThreadForm/hooks/useAddThreadForm";
import { User } from "@/types/User";
import { Select } from "@/components/Select/Select";

type AddThreadFormProps = {
    onSubmit: (inputs: AddThreadFormInputs) => void;
    users: User[];
    onCancel: () => void;
    isLoading?: boolean;
};

export const AddThreadForm = ({ onSubmit, onCancel, isLoading, users }: AddThreadFormProps) => {
    const { register, handleSubmit, formState } = useAddThreadForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Select
                {...register("participantId")}
                label="Uczestnik wątku"
                options={users.map((user) => ({
                    value: user.id.toString(),
                    label: `${user.firstName} ${user.lastName} (${user.login})`,
                }))}
                help={THREAD_PARTICIPANT_REQUIREMENT}
                error={formState.errors?.participantId?.message}
            />

            <Input
                {...register("subject")}
                label="Temat wątku"
                error={formState.errors?.subject?.message}
                help={THREAD_SUBJECT_REQUIREMENT}
            />

            <Box className={classes.actions}>
                <Button variant="soft" loading={isLoading} type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit">
                    Utwórz
                </Button>
            </Box>
        </form>
    );
};
