import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { AuthContext } from "../../shared/auth/contexts/auth.context";
import { useQuery } from "react-query";

import { baseUrl, get } from "../../shared/request";
const ChatsScreen = () => {
  const { jwt, onLogout } = React.useContext(AuthContext);
  useQuery(
    "presence",
    async () => {
      const { data: presence } = await get(baseUrl + "/presence");
      console.log(1, presence);
      console.log(5, jwt);
      return presence;
    },
    {
      enabled: !!jwt,
    }
  );
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
      <Button onPress={onLogout}>Sign Out</Button>
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
