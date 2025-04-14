import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { CreateClassForm } from "@/features/classes/components/CreateClassForm/CreateClassForm.tsx";
import { Box, Card, Heading, Text } from "@radix-ui/themes";

import styles from "./ClassesPage.module.scss";
import { useCreateClass } from "@/features/classes/hooks/useCreateClass.ts";
import { toast } from "sonner";
import { CreateClassFormInputs } from "@/features/classes/components/CreateClassForm/hooks/useCreateClassForm.ts";

const BaseClassesPage = () => {
    const { mutateAsync, isPending } = useCreateClass();

    const createClass = async ({ name }: CreateClassFormInputs) => {
        try {
            await mutateAsync({ name });
            toast.success("Klasa została utworzona.");
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się dodać klasy.");
        }
    };

    return (
        <Page.Root>
            <Page.Header title="Klasy" />

            <Page.Content>
                <Card className={styles.createClassSection}>
                    <Box>
                        <Heading as="h2">Dodaj nową klasę</Heading>
                        <Text as="p">Po utworzeniu klasy staniesz się jej skarbnikiem.</Text>
                    </Box>
                    <CreateClassForm onSubmit={createClass} isLoading={isPending} />
                </Card>
            </Page.Content>
        </Page.Root>
    );
};

export const ClassesPage = onlyAsAuthenticated(BaseClassesPage);
