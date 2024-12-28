import { Box, Button } from "@radix-ui/themes";
import classes from "./CreateGroupForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    CreateGroupFormInputs,
    GROUP_NAME_HELP,
    useCreateGroupForm,
} from "@/features/groups/components/CreateGroupForm/hooks/useCreateGroupForm";

type CreateGroupFormProps = {
    onSubmit: (inputs: CreateGroupFormInputs) => void;
    isLoading?: boolean;
};

export const CreateGroupForm = ({ onSubmit, isLoading }: CreateGroupFormProps) => {
    const { register, handleSubmit, formState } = useCreateGroupForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("name")}
                label="Nazwa grupy"
                error={formState.errors?.name?.message}
                help={GROUP_NAME_HELP}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit">
                    Utwórz
                </Button>
            </Box>
        </form>
    );
};
