import React, { ReactNode, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Credentials, LoginUser, UserDetails } from "../model";
import { login } from "../requests";
import { useMutation } from "react-query";
import { AppState } from "react-native";
export interface IAuthContext {
  userDetails?: UserDetails;
  jwt?: string;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isActive: boolean;
  onLogin: (loginuser: LoginUser) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userDetails: undefined,
  jwt: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
  isActive: false,
  onLogin: () => null,
  onLogout: () => null,
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = React.useState<UserDetails>();
  const [jwt, setJwt] = React.useState<string>();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current
  );
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const loginMutation = useMutation(
    (loginUser: LoginUser) => login(loginUser),
    {
      onSuccess: (credentials) => {
        setUserDetails(credentials.user);
        setJwt(credentials.token);
        setIsLoggedIn(true);
        _storeCredentials(credentials);
      },

      onSettled: () => {
        setIsLoggingIn(false);
      },
    }
  );

  const loginHandler = (loginUser: LoginUser) => {
    setIsLoggedIn(true);
    loginMutation.mutate(loginUser);
  };
  const logoutHandler = () => {
    setUserDetails(undefined);
    setJwt(undefined);
    setIsLoggedIn(false);
  };
  const _storeCredentials = async (credentials: Credentials) => {
    try {
      await AsyncStorage.setItem("credentials", JSON.stringify(credentials));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userDetails,
        jwt,
        isLoggedIn,
        isLoggingIn,
        isActive: isLoggedIn && appStateVisible === "active",
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
