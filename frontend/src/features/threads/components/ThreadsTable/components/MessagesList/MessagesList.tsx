import { Message, Thread } from "@/features/threads/types/Thread";
import { Box, Button, Text } from "@radix-ui/themes";
import classes from "./MessagesList.module.scss";
import { useUser } from "@/features/auth/hooks/useUser";
import { Input } from "@/components/Input/Input";
import { Send } from "lucide-react";

export const MessagesList = (thread: Thread) => {
    return (
        <>
            <Box className={classes.messagesList}>
                {thread.messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
            </Box>
            <Box className={classes.footer}>
                <Input label="Nowa wiadomość:" type="textarea" />
                <Button color="jade">
                    Wyślij <Send size={20} />
                </Button>
            </Box>
        </>
    );
};

type MessageItemProps = {
    message: Message;
};

const MessageItem = ({ message }: MessageItemProps) => {
    const { user } = useUser();

    return (
        <Box className={classes.messageItem}>
            <Text className={classes.header}>
                {message.sender.id == user?.id
                    ? "Ty napisałeś/aś:"
                    : `${message.createdAt.toLocaleString()}, ${message.sender.firstName} ${message.sender.lastName} napisał/a:`}
            </Text>
            <Text className={classes.content}>{message.content}</Text>
        </Box>
    );
};
