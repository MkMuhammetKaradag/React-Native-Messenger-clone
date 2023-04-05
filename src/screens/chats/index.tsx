import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useNavigate } from "react-router-native";
const ChatsScreen = () => {
  const navigate = useNavigate();
  const friends = [
    { id: 1, name: "ali" },
    { id: 2, name: "ali1" },
    { id: 3, name: "ali2" },
    { id: 4, name: "ali3" },
  ];
  return (
    <View style={styles.container}>
      {friends.map((friend) => (
        <Pressable
          key={friend.id}
          onPress={() => {
            navigate(`/chat/${friend.id}`);
          }}
        >
          <View style={styles.friend}>
            <Avatar.Image
              size={60}
              style={styles.profilePicture}
              source={{
                uri: `https://randomuser.me/api/portraits/men/${friend.id}.jpg`,
              }}
            ></Avatar.Image>
            <View>
              <Text>{friend.name}</Text>
              <Text>Lorem ipsum dolor sit.</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  friend: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profilePicture: {
    marginRight: 8,
  },
});
