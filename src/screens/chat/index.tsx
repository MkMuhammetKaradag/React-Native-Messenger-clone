import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Appbar, Avatar, IconButton } from "react-native-paper";
import { useNavigate, useParams } from "react-router-native";
import Input from "../../shared/components/Input";
import {
  COLOR_BLACK,
  COLOR_FB_PRIMARY,
  COLOR_LIGHT_GRAY,
  COLOR_WHITE,
} from "../../shared/constants/colors";
import { Message } from "./models/Message";
import { AuthContext } from "../../shared/auth/contexts/auth.context";
import { Conversation } from "./models/Conversations";
import SocketIOClient from "socket.io-client";
const ChatScreen = () => {
  const { jwt, userDetails } = useContext(AuthContext);

  const navigate = useNavigate();
  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const { chatId } = useParams();

  const conversationId = conversations.find((conversation) =>
    conversation.userIds.includes(+(chatId ?? -1))
  )?.id;

  const conversationMessages = [...messages].filter(
    (message) => message.conversationId === conversationId
  );
  const conversationBaseUrl =
    Platform.OS === "android"
      ? `http://192.168.1.34:7000`
      : `http://localhost:7000`;

  const conversationSocket = React.useMemo(
    () =>
      SocketIOClient(conversationBaseUrl, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: jwt,
            },
          },
        },
      }),
    [jwt, conversationBaseUrl]
  );

  React.useEffect(() => {
    // console.log("geldi");
    if (conversations.length > 0) return;
    conversationSocket.on(
      "getAllConversations",
      (allConversations: Conversation[]) => {
        setConversations(() => allConversations);
        // console.log("test");
      }
    );

    return () => {
      conversationSocket.off("getAllConversations");
    };
  }, [conversationSocket, conversations]);
  React.useEffect(() => {
    conversationSocket.on("newMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("gelen-messaj:", message);
    });

    return () => {
      conversationSocket.off("newMessage");
    };
  }, [conversationSocket]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate(`/`)} />

        <Avatar.Image
          size={36}
          source={{
            uri: `https://randomuser.me/api/portraits/men/${chatId}.jpg`,
          }}
        />
        <View style={styles.chatContainer}>
          <Text>Name:{chatId}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 8,
          }}
        >
          <IconButton
            icon="phone"
            iconColor={COLOR_FB_PRIMARY}
            style={{ margin: 0 }}
            size={24}
            onPress={() => console.log("Call")}
            accessibilityLabelledBy={undefined}
            accessibilityLanguage={undefined}
          />
          <IconButton
            icon="video"
            iconColor={COLOR_FB_PRIMARY}
            onPress={() => console.log("Video Call")}
            style={{ margin: 0 }}
            size={24}
            accessibilityLabelledBy={undefined}
            accessibilityLanguage={undefined}
          />
        </View>
      </Appbar.Header>
      <ScrollView style={styles.chatContainer}>
        {conversationMessages.map((message, i) => (
          <View
            key={i}
            style={[
              styles.message,

              message.creatorId === userDetails?.id
                ? styles.userMessage
                : styles.friendMessage,
            ]}
          >
            <Text
              style={{
                color:
                  message.creatorId === userDetails?.id
                    ? COLOR_BLACK
                    : COLOR_WHITE,
              }}
            >
              {message.message}
            </Text>
          </View>
        ))}
        <View style={{ height: 16 }} />
      </ScrollView>

      <View style={[styles.inputContainer]}>
        <View style={{ flex: 1 }}>
          <Input
            mode="outlined"
            placeholder="Type a message"
            value={text}
            onChangeText={setText}
          ></Input>
        </View>

        <IconButton
          icon="send"
          iconColor={COLOR_FB_PRIMARY}
          style={{ margin: 0 }}
          size={32}
          onPress={() => {
            if (!userDetails || !text) return;
            const newMessage: Message = {
              message: text,
              creatorId: userDetails.id,
              conversationId,
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            conversationSocket.emit("sendMessage", {
              message: text,
              friendId: Number(chatId),
              conversationId,
            });
            setText("");
          }}
          accessibilityLabelledBy={undefined}
          accessibilityLanguage={undefined}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  message: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: COLOR_LIGHT_GRAY,
    alignSelf: "flex-start",
  },
  friendMessage: {
    backgroundColor: COLOR_FB_PRIMARY,
    alignSelf: "flex-end",
  },
});
