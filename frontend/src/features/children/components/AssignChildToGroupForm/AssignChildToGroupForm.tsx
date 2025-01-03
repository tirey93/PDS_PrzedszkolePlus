import { Box, Button } from "@radix-ui/themes";
import classes from "./AssignChildToGroupForm.module.scss";

import { Select } from "@/components/Select/Select";
import {
    AssignChildToGroupFormInputs,
    CHILD_GROUP_HELP,
    useAssignChildToGroupForm,
} from "@/features/children/components/AssignChildToGroupForm/hooks/useAssignChildToGroupForm";
import { Group } from "@/features/groups/types/Group";

type AssignChildToGroupFormProps = {
    onSubmit: (inputs: AssignChildToGroupFormInputs) => void;
    onCancel: () => void;
    groups: Group[];
    isLoading?: boolean;
    initialValue?: Partial<AssignChildToGroupFormInputs>;
};

export const AssignChildToGroupForm = ({
    onSubmit,
    isLoading,
    onCancel,
    initialValue,
    groups,
}: AssignChildToGroupFormProps) => {
    const { register, handleSubmit, formState } = useAssignChildToGroupForm(initialValue);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Select
                {...register("groupId")}
                options={groups.map((group) => ({ value: group.id, label: group.name }))}
                label="Grupa"
                error={formState.errors?.groupId?.message}
                help={CHILD_GROUP_HELP}
            />

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
