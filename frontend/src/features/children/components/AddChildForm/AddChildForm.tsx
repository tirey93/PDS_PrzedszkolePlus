import { Box, Button } from "@radix-ui/themes";
import classes from "./AddChildForm.module.scss";

import { Input } from "@/components/Input/Input";
import { AddChildFormInputs, useAddChildForm } from "@/features/children/components/AddChildForm/hooks/useAddChildForm";

type AddChildFormProps = {
    onSubmit: (inputs: AddChildFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialValue?: Partial<AddChildFormInputs>;
};

export const AddChildForm = ({ onSubmit, isLoading, onCancel, initialValue }: AddChildFormProps) => {
    const { register, handleSubmit, formState } = useAddChildForm(initialValue);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input {...register("firstName")} label="Imię" error={formState.errors?.firstName?.message} />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit">
                    Zapisz
                </Button>
            </Box>
        </form>
    );
};
