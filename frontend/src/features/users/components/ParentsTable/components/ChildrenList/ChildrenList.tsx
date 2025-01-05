import { Box, Button, IconButton, Strong, Text } from "@radix-ui/themes";
import classes from "./ChildrenList.module.scss";
import { Plus } from "lucide-react";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";
import { RemoveChildDialog } from "@/features/children/components/RemoveChildDialog/RemoveChildDialog";
import { AssignChildToGroupDialog } from "@/features/children/components/AssignChildToGroupDialog/AssignChildToGroupDialog";
import { useGetChildrenByParent } from "@/features/children/hooks/useGetChildrenByParent";
import Skeleton from "react-loading-skeleton";
import { User } from "@/types/User";

type ChildrenListProps = {
    parent: User;
};

export const ChildrenList = ({ parent }: ChildrenListProps) => {
    const { data, isLoading } = useGetChildrenByParent({ parentId: parent.id });

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Text>
                    <Strong>Dzieci</Strong>
                </Text>
                <AddChildDialog
                    lastName={parent.lastName}
                    parentId={parent.id}
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
                    {isLoading && [...Array(2)].map((_, index) => <LoadingChildRow key={index} />)}

                    {!isLoading && !data?.length && (
                        <tr>
                            <td className={classes.cell} colSpan={6}>
                                Nie ma żadnych dzieci do wyświetlenia
                            </td>
                        </tr>
                    )}

                    {data &&
                        data.map((child) => (
                            <tr key={child.id}>
                                <td>{child.createdAt.toLocaleDateString()}</td>
                                <td>{child.dateOfBirth.toLocaleDateString()}</td>
                                <td>{child.firstName}</td>
                                <td>{child.group?.name ?? "-"}</td>
                                <td>
                                    {child.caregiver ? `${child.caregiver.firstName} ${child.caregiver.lastName}` : "-"}
                                </td>
                                <td className={classes.actions}>
                                    <AssignChildToGroupDialog
                                        child={child}
                                        trigger={
                                            <Button size="1" variant="soft">
                                                Zmień grupę
                                            </Button>
                                        }
                                    />
                                    <RemoveChildDialog
                                        child={child}
                                        trigger={
                                            <Button size="1" variant="soft" color="crimson">
                                                Usuń
                                            </Button>
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Box>
    );
};

const LoadingChildRow = () => {
    return (
        <tr className={classes.row}>
            {[...Array(6)].map((_, index) => (
                <td key={index}>
                    <Skeleton />
                </td>
            ))}
        </tr>
    );
};
