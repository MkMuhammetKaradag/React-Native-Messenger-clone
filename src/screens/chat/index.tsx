import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigate, useParams } from "react-router-native";
const ChatScreen = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate(`/`)} />
      </Appbar.Header>
      <View style={styles.chatContainer}>
        <Text>Chat Id:{chatId}</Text>
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
    padding: 16,
  },
});
