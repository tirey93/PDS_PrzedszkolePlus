import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Text, Title } from "@mantine/core";

import { Illustration404 } from "./assets/Illustration404";

import classes from "./404.module.scss";

import { AppRoute } from "@/app/router";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box className={classes.pageContainer}>
            <Illustration404 className={classes.Illustration404} />
            <Title className={classes.title}>Nic tu nie ma</Title>
            <Text className={classes.description}>
                Ta strona nie istnieje. Jeśli podany URL jest prawidłowy, to możliwe że strona przestała istnieć jakiś
                czase temu.
            </Text>
            <Group className={classes.buttonsWrapper}>
                <Button variant="default" onClick={() => navigate(AppRoute.ROOT)}>
                    Przejdź do strony głównej
                </Button>
                <Button color="info" onClick={() => navigate(-1)}>
                    Wróć do poprzedniej strony
                </Button>
            </Group>
        </Box>
    );
};
