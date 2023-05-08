import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  Paper,
  PaperProps,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

import Fab from "@mui/material/Fab";
import SearchIcon from "@mui/icons-material/Search";
import { Message, buildMessage } from "@modules/api";

export const FloatingChatButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDisplayed, setDisplayed] = React.useState(false);
  return (
    <Box
      sx={({ breakpoints }) => ({
        position: "fixed",
        bottom: "100px",
        right: "50px",
        [breakpoints.down("sm")]: {
          bottom: "50px",
          right: "0px",
          width: "100%",
        },
      })}
    >
      <Collapse in={isDisplayed}>{children}</Collapse>
      <Fab
        onClick={() => setDisplayed(!isDisplayed)}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          mr: 3,
        }}
      >
        <SearchIcon />
      </Fab>
    </Box>
  );
};

const UserMessageContainer = styled(ListItem)({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
});

const CurrentUserMessageContainer = styled(UserMessageContainer)(
  ({ theme }) => ({
    borderRadius: "0 12px 12px",
    backgroundColor: theme.palette.primary?.main,
  })
);
const OtherUserMessageContainer = styled(UserMessageContainer)(({ theme }) => ({
  borderRadius: "12px 0 12px 12px",
  backgroundColor: theme.palette.secondary?.main,
}));

const MessageBlock: React.FC<{
  message: Message;
  isCurrentUser: (userId: string) => boolean;
  getName: (userId: string) => React.ReactNode;
}> = ({ message, isCurrentUser, getName }) => {
  const MessageContainer = isCurrentUser(message.sender_id)
    ? CurrentUserMessageContainer
    : OtherUserMessageContainer;
  return (
    <Box
      key={message.id}
      sx={{
        display: "flex",
        justifyContent: isCurrentUser(message.sender_id)
          ? "flex-start"
          : "flex-end",
        marginBottom: 1,
      }}
    >
      <MessageContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {getName(message.sender_id)}
          </Typography>
          <Typography variant="caption">
            {new Date(message.created_at).toDateString()}
          </Typography>
        </Box>
        <Typography variant="body2" whiteSpace="break-spaces">
          {message.text}
        </Typography>
      </MessageContainer>
    </Box>
  );
};

const MessageList: React.FC<MessageComponent> = ({
  messages,
  isCurrentUser,
  getName,
}) => (
  <List sx={{ overflowY: "auto" }}>
    {messages.map((message) => (
      <MessageBlock
        key={message.id}
        message={message}
        isCurrentUser={isCurrentUser}
        getName={getName}
      />
    ))}
  </List>
);

interface MessageComponent {
  messages: Message[];
  isCurrentUser: (userId: string) => boolean;
  getName: (userId: string) => React.ReactNode;
}

interface ChatProps extends PaperProps, MessageComponent {
  onSendMessage: (message: Message) => Promise<void>;
}

interface ChatSendMessageBoxProps {
  message: Message;
  onChangeMessage: (message: Message) => void;
  onSendMessage: () => void;
}

const ChatSendMessageBox: React.FC<ChatSendMessageBoxProps> = ({
  message,
  onChangeMessage,
  onSendMessage,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
    <TextField
      value={message.text}
      multiline
      onChange={(e) => onChangeMessage({ ...message, text: e.target.value })}
      onKeyDown={(e) => {
        if (!e.shiftKey && e.key === "Enter") {
          e.preventDefault(); // For prevent enter without text
          onSendMessage();
        }
      }}
      placeholder="Напишите сообщение..."
      sx={{ width: "100%" }}
    />
    <IconButton onClick={onSendMessage}>
      <SendIcon />
    </IconButton>
  </Box>
);

export const Chat: React.FC<ChatProps> = ({
  messages,
  onSendMessage,
  isCurrentUser,
  getName,
  ...props
}) => {
  const [newMessage, setNewMessage] = React.useState<Message>(buildMessage());

  React.useEffect(() => {
    setNewMessage(buildMessage());
  }, [messages]);

  const sendMessage = React.useCallback(async () => {
    if (!newMessage.text.trim()) return;
    try {
      await onSendMessage(newMessage);
      setNewMessage(buildMessage());
    } catch (e) {
      //TODO: handle error display needed
      console.error(e);
    }
  }, [newMessage, onSendMessage]);

  return (
    <Paper {...props}>
      <MessageList
        messages={messages}
        isCurrentUser={isCurrentUser}
        getName={getName}
      />
      <ChatSendMessageBox
        message={newMessage}
        onChangeMessage={setNewMessage}
        onSendMessage={sendMessage}
      />
    </Paper>
  );
};
