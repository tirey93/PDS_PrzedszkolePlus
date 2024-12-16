import { Box, Card, Text } from "@radix-ui/themes";
import classes from "./Stat.module.scss";
import classNames from "classnames";

type StatProps = {
    name: string;
    description: string;
    value: number;
    diff: number;
    type: "numerical" | "percentage";
};

export const Stat = ({ name, diff, value, description, type }: StatProps) => {
    return (
        <Card className={classes.container}>
            <Text className={classes.title}>{name}</Text>
            <Box className={classes.values}>
                <Box className={classes.value}>
                    {value}
                    {type === "percentage" && "%"}
                </Box>
                <Box
                    className={classNames(
                        classes.difference,
                        { [classes.positive]: diff > 0 },
                        { [classes.negative]: diff < 0 }
                    )}
                >
                    {diff}%
                </Box>
            </Box>
            <Text className={classes.description}>{description}</Text>
        </Card>
    );
};
