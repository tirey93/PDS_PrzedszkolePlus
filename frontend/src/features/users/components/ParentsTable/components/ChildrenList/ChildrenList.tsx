import { Box, Button, IconButton, Strong, Text } from "@radix-ui/themes";
import classes from "./ChildrenList.module.scss";
import { Plus } from "lucide-react";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";

export const ChildrenList = () => {
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Text>
                    <Strong>Dzieci</Strong>
                </Text>
                <AddChildDialog
                    trigger={
                        <IconButton size="1" color="jade" variant="ghost">
                            <Plus size={16} />
                        </IconButton>
                    }
                />
            </Box>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Data dodania</th>
                        <th>Data urodzenia</th>
                        <th>Imię</th>
                        <th>Grupa</th>
                        <th>Opiekun</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1 września, 2024</td>
                        <td>05.06.2020</td>
                        <td>Dawid</td>
                        <td>Pszczółki</td>
                        <td>Anna Nowak</td>
                        <td className={classes.actions}>
                            <AddChildDialog
                                trigger={
                                    <Button size="1" variant="ghost" color="blue">
                                        Edycja
                                    </Button>
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>1 maja, 2023</td>
                        <td>15.02.2017</td>
                        <td>Maja</td>
                        <td>Skrzaty</td>
                        <td>Jan Kowalski</td>
                        <td className={classes.actions}>
                            <AddChildDialog
                                trigger={
                                    <Button size="1" variant="ghost" color="blue">
                                        Edycja
                                    </Button>
                                }
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Box>
    );
};
