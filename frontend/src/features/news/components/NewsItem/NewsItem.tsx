import classes from "./NewsItem.module.scss";
import { Badge, Box, Button, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import classNames from "classnames";

type NewsProps = {
    title: string;
    content: string;
    imageSrc: string;
    createdAt: Date;
};

export const NewsItem = ({ title, createdAt, content, imageSrc }: NewsProps) => {
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
            <img className={classes.image} src={imageSrc} alt={title} />
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
                        <Button
                            onClick={toggleIsContentTruncated}
                            color={isContentTruncated ? "jade" : "ruby"}
                            variant="soft"
                            size="1"
                        >
                            {isContentTruncated ? "Pokaż więcej" : "Pokaż mniej"}
                        </Button>
                    )}
                </Box>
            </Box>
        </article>
    );
};
