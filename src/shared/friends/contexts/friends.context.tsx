import React, { ReactNode, createContext, useContext } from "react";
import { ActiveFriend } from "../models";
import { AuthContext } from "../../auth/contexts/auth.context";
import { Platform } from "react-native";
import SocketIOClient from "socket.io-client";
import { useQuery } from "react-query";
import { getFriendRequests } from "../../../screens/people/requests";
import getFriends from "../helpers/friends";
import { UserDetails } from "../../auth/model";
export interface IFriendsContext {
  friends: ActiveFriend[];
  isLoading: boolean;
}

export const FriendsContext = createContext<IFriendsContext>({
  friends: [],
  isLoading: false,
});
export const FriendsProvider = ({ children }: { children: ReactNode }) => {
  const { isActive, jwt, isLoggedIn, userDetails } = useContext(AuthContext);
  const [friends, setFriends] = React.useState<ActiveFriend[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useQuery(
    "friendRequest",
    async () => {
      setIsLoading(true);
      const friendRequests = await getFriendRequests();
      const _friends = getFriends(
        friendRequests,
        (userDetails as UserDetails).id
      );
      const activeFriends: ActiveFriend[] = _friends.map((f) => ({
        ...f,
        isActive: false,
      }));
      setFriends(activeFriends);
      return _friends;
    },
    {
      enabled: isLoggedIn,
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  const baseUrl =
    Platform.OS === "android"
      ? `http://192.168.1.34:6000`
      : `http://localhost:4000`;

  const socket = React.useMemo(
    () =>
      SocketIOClient(baseUrl, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: jwt,
            },
          },
        },
      }),
    [jwt, baseUrl]
  );
  React.useEffect(() => {
    socket.emit("updateActiveStatus", isActive);

    socket.on(
      "friendActive",
      ({ id, isActive: isFriendActive }: { id: number; isActive: boolean }) => {
        setFriends((prevFriends) => {
          if (userDetails?.id === id) return prevFriends;

          const updatedFriends = [...prevFriends];
          const activeFriend = updatedFriends.find((f) => f.id === id);

          if (!activeFriend) return prevFriends;

          activeFriend.isActive = isFriendActive;

          return updatedFriends;
        });
      }
    );
    return () => {
      socket.emit("updaActiveStatus", false);
      socket.off("friendActive");
    };
  }, [socket, userDetails, isActive]);
  return (
    <FriendsContext.Provider
      value={{
        friends,
        isLoading,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
