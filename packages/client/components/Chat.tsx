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
import { uuid4 } from "@modules/utils";

export const FloatingSearchChatButton: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>(
    Array.from({ length: 1 }, () => [
      {
        id: uuid4(),
        text: "Some",
        user: "user1_user",
        createdAt: new Date().toISOString(),
      },
      {
        id: uuid4(),
        text: "Some",
        user: "user2_user",
        createdAt: new Date().toISOString(),
      },
    ]).flat()
  );
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
      <Collapse in={isDisplayed}>
        <Chat
          messages={messages}
          onSendMessage={(message) => {
            // TODO: change user string to user id
            setMessages([
              ...messages,
              {
                text: message,
                user: "user1_user",
                createdAt: new Date().toISOString(),
                id: uuid4(),
              },
            ]);
            return Promise.resolve();
          }}
          sx={({ breakpoints }) => ({
            m: 1,
            height: "70vh",
            width: 400,
            p: 1,
            display: "flex",
            flexDirection: "column",
            [breakpoints.down("sm")]: {
              width: "100%",
            },
          })}
        />
      </Collapse>
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

const MessageBlock: React.FC<{ message: Message }> = ({ message }) => {
  const MessageContainer = isCurrentUser(message.user)
    ? CurrentUserMessageContainer
    : OtherUserMessageContainer;
  return (
    <Box
      key={message.id}
      sx={{
        display: "flex",
        justifyContent: isCurrentUser(message.user) ? "flex-start" : "flex-end",
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
            {message.user}
          </Typography>
          <Typography variant="caption">
            {new Date(message.createdAt).toDateString()}
          </Typography>
        </Box>
        <Typography variant="body2">{message.text}</Typography>
      </MessageContainer>
    </Box>
  );
};

function isCurrentUser(userId: string) {
  return userId === "user1_user";
}

interface MessagesListProps {
  messages: Message[];
}

const MessageList: React.FC<MessagesListProps> = ({ messages }) => (
  <List sx={{ overflowY: "auto" }}>
    {messages.map((message) => (
      <MessageBlock key={message.id} message={message} />
    ))}
  </List>
);

interface Message {
  id: string;
  text: string;
  user: string;
  createdAt: string;
}

interface ChatProps extends PaperProps {
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, ...props }) => {
  const [message, setMessage] = React.useState("");

  const sendMessage = React.useCallback(async () => {
    if (!message.trim()) return;
    try {
      await onSendMessage(message);
      setMessage("");
    } catch (e) {
      //TODO: handle error display needed
      console.log(e);
    }
  }, [message, onSendMessage]);

  return (
    <Paper {...props}>
      <MessageList messages={messages} />
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
        <TextField
          value={message}
          multiline
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.key === "Enter") {
              e.preventDefault(); // For prevent enter without text
              sendMessage();
            }
          }}
          sx={{ width: "100%" }}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chat;
