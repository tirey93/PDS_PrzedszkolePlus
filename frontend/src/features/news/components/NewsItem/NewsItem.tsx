import classes from "./NewsItem.module.scss";
import { Badge, Box, Button, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import classNames from "classnames";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DeleteNewsDialog } from "@/features/news/components/DeleteNewsDialog/DeleteNewsDialog";
import { AddNewsDialog } from "@/features/news/components/AddNewsDialog/AddNewsDialog";

type NewsProps = {
    title: string;
    id: string;
    content: string;
    url: string;
    createdAt: Date;
};

export const NewsItem = ({ title, createdAt, content, url, id }: NewsProps) => {
    const [isContentTruncated, setIsContentTruncated] = useState(true);
    const [canContentBeTruncated, setCanContentBeTruncated] = useState(true);

    const toggleIsContentTruncated = () => {
        setIsContentTruncated((prev) => !prev);
    };

    const handleContentTruncation = (node: HTMLDivElement) => {
        if (!node) {
            return;
        }

        setCanContentBeTruncated(node.scrollHeight !== node.clientHeight);
    };

    return (
        <article className={classes.container}>
            <img className={classes.image} src={url} alt={title} />
            <Box>
                <Heading as="h2" className={classes.title}>
                    {title}
                </Heading>
                <Text
                    className={classNames(classes.content, { [classes.truncated]: isContentTruncated })}
                    ref={handleContentTruncation}
                >
                    {content}
                </Text>
                <Box className={classes.footer}>
                    <Badge color="gray">{createdAt.toLocaleDateString()}</Badge>
                    {(canContentBeTruncated || !isContentTruncated) && (
                        <Button onClick={toggleIsContentTruncated} color="blue" variant="soft" size="1">
                            {isContentTruncated ? (
                                <>
                                    Pokaż więcej
                                    <ChevronDown size={10} />
                                </>
                            ) : (
                                <>
                                    Pokaż mniej
                                    <ChevronUp size={10} />
                                </>
                            )}
                        </Button>
                    )}
                    <AccessGuard requiredAccess="Admin">
                        <AddNewsDialog
                            news={{ title, id, content, url, createdAt }}
                            trigger={
                                <Button color="jade" variant="soft" size="1">
                                    Edytuj
                                </Button>
                            }
                        />

                        <DeleteNewsDialog
                            news={{ title, id }}
                            trigger={
                                <Button color="crimson" variant="soft" size="1">
                                    Usuń
                                </Button>
                            }
                        />
                    </AccessGuard>
                </Box>
            </Box>
        </article>
    );
};
