import { Message, Thread } from "@/features/threads/types/Thread";
import { Box, Button, Text } from "@radix-ui/themes";
import classes from "./MessagesList.module.scss";
import { useUser } from "@/features/auth/hooks/useUser";
import { Input } from "@/components/Input/Input";
import { Send } from "lucide-react";
import { useGetThreadMessages } from "@/features/threads/hooks/useGetThreadMessages";
import { useSendMessage } from "@/features/threads/hooks/useSendMessage";
import {
    SendMessageFormInputs,
    useMessageForm,
} from "@/features/threads/components/ThreadsTable/components/MessagesList/hooks/useMessageForm";
import { useQueryClient } from "@tanstack/react-query";
import { MESSAGES_QUERY_KEY } from "@/features/threads/constants/queryKeys";

export const MessagesList = (thread: Thread) => {
    const { data: messages, isLoading } = useGetThreadMessages(thread);
    const { mutateAsync, isPending } = useSendMessage();
    const { register, handleSubmit, reset } = useMessageForm();
    const queryClient = useQueryClient();

    const onSubmit = async ({ content }: SendMessageFormInputs) => {
        await mutateAsync({ content, threadId: parseInt(thread.id) });
        reset();
        await queryClient.invalidateQueries({ queryKey: [`${MESSAGES_QUERY_KEY}:${thread.id}}`] });
    };

    if (isLoading) {
        return <Text>Wczytywanie wiadomości...</Text>;
    }

    return (
        <>
            <Box className={classes.messagesList}>
                {(messages ?? []).map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Input label="Nowa wiadomość:" type="textarea" {...register("content")} />
                <Button color="jade" loading={isPending} type="submit">
                    Wyślij <Send size={20} />
                </Button>
            </form>
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
                {message.sender?.id == user?.id
                    ? "Ty napisałeś/aś:"
                    : `${message.createdAt.toLocaleString()}, ${message.sender?.firstName ?? ""} ${message.sender?.lastName ?? ""} napisał/a:`}
            </Text>
            <Text className={classes.content}>{message.content}</Text>
        </Box>
    );
};
