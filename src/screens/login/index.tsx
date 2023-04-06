import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useNavigate } from "react-router-native";
import Input from "../../shared/components/Input";
import { Button } from "react-native-paper";
import {
  COLOR_FB_PRIMARY,
  COLOR_FB_SECONDARY,
  COLOR_WHITE,
} from "../../shared/constants/colors";
import { AuthContext } from "../../shared/auth/contexts/auth.context";
import Loader from "../../shared/components/Loader";

const LoginScreen = () => {
  const { isLoggingIn, onLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  //   const onLogin = ({
  //     email,
  //     password,
  //   }: {
  //     email: string;
  //     password: string;
  //   }) => {};
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.facebookText}>facebook</Text>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />

        <Input
          secure
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.loginButtonContainer}>
          {isLoggingIn ? (
            <Loader></Loader>
          ) : (
            <Button
              style={styles.loginButton}
              labelStyle={styles.loginButtonText}
              mode="contained"
              onPress={() => {
                onLogin({ email, password });
                resetForm();
              }}
            >
              login
            </Button>
          )}
        </View>
      </View>
      <Button
        labelStyle={styles.signUpText}
        onPress={() => navigate("/register")}
      >
        Sign Up for facebook
      </Button>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLOR_FB_PRIMARY,
    alignItems: "center",
    justifyContent: "space-around",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  facebookText: {
    fontSize: 56,
    fontWeight: "700",
    color: COLOR_WHITE,
    marginBottom: 32,
  },
  loginButtonContainer: {
    marginTop: 16,
    width: "100%",
  },
  loginButton: {
    backgroundColor: COLOR_FB_SECONDARY,
    height: 48,
    borderRadius: 0,
  },
  loginButtonText: {
    paddingTop: 8,
    fontSize: 24,
  },
  signUpText: {
    color: COLOR_WHITE,
    fontSize: 16,
  },
});
