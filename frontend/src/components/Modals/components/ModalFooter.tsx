import { Button, Group } from "@mantine/core";

import classes from "./Modal.module.scss";

type ModalFooterButtonProps = {
    children: string;
    color?: "danger" | "success";
    onClick: () => unknown;
};

type ModalFooterProps = {
    submitButton?: ModalFooterButtonProps;
    cancelButton?: ModalFooterButtonProps;
    isLoading?: boolean;
};

export const ModalFooter = ({ isLoading = false, submitButton, cancelButton }: ModalFooterProps) => {
    return (
        <Group className={classes.footer}>
            {cancelButton && <Button variant="default" {...cancelButton} />}
            {submitButton && <Button variant="light" loading={isLoading} {...submitButton} />}
        </Group>
    );
};
