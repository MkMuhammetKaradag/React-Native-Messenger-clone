import React, { ReactNode, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Credentials, LoginUser, UserDetails } from "../model";
import { login } from "../requests";
import { useMutation } from "react-query";
export interface IAuthContext {
  userDetails?: UserDetails;
  jwt?: string;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  onLogin: (loginuser: LoginUser) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userDetails: undefined,
  jwt: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
  onLogin: () => null,
  onLogout: () => null,
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = React.useState<UserDetails>();
  const [jwt, setJwt] = React.useState<string>();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
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
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
