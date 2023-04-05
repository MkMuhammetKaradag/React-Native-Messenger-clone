import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { BottomNavigation, Text } from "react-native-paper";
import React from "react";
import ChatsScreen from "./src/screens/chats/index";
import { NativeRouter, Route, Routes } from "react-router-native";
import ChatScreen from "./src/screens/chat";
// const MusicRoute = () => <Text>Music</Text>;

// const AlbumsRoute = () => <Text>Albums</Text>;

// const RecentsRoute = () => <Text>Recents</Text>;

// const NotificationsRoute = () => <Text>Notifications</Text>;

interface NavRoutes {
  key: string;
  title: string;
  focusedIcon: string;
  unfocusedIcon?: string;
}
export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<NavRoutes[]>([
    {
      key: "chats",
      title: "Chats",
      focusedIcon: "chat",
      unfocusedIcon: "chat-outline",
    },
    {
      key: "calls",
      title: "Calls",
      focusedIcon: "video",
      unfocusedIcon: "video-outline",
    },
    {
      key: "people",
      title: "People",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
    {
      key: "stories",
      title: "Stories",
      focusedIcon: "book",
      unfocusedIcon: "book-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    chats: () => <ChatsScreen></ChatsScreen>,
    calls: () => <Text>chats1</Text>,
    people: () => <Text>chats2</Text>,
    stories: () => <Text>chats3</Text>,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <>
          <NativeRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                  />
                }
              ></Route>
              <Route
                path="/chat/:chatId/"
                element={<ChatScreen></ChatScreen>}
              ></Route>
            </Routes>
          </NativeRouter>
        </>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
