interface NavRoutes {
  key: string;
  title: string;
  focusedIcon: string;
  unfocusedIcon?: string;
}
export const navRoutes: NavRoutes[] = [
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
];
