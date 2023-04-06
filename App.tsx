import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { BottomNavigation, Text } from "react-native-paper";
import React from "react";
import ChatsScreen from "./src/screens/chats/index";
import { NativeRouter, Route, Routes } from "react-router-native";
import ChatScreen from "./src/screens/chat";
import Screens from "./src/screens";
import { AuthProvider } from "./src/shared/auth/contexts/auth.context";
// const MusicRoute = () => <Text>Music</Text>;

// const AlbumsRoute = () => <Text>Albums</Text>;

// const RecentsRoute = () => <Text>Recents</Text>;

// const NotificationsRoute = () => <Text>Notifications</Text>;
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <Screens></Screens>
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
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
