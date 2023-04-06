import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigate } from "react-router-native";
import Input from "../../shared/components/Input";
import { Button } from "react-native-paper";
import {
  COLOR_FB_PRIMARY,
  COLOR_FB_SECONDARY,
  COLOR_WHITE,
} from "../../shared/constants/colors";
import Loader from "../../shared/components/Loader";
import { useMutation } from "react-query";
import { NewUser } from "../../shared/auth/model";
import { getUsers, register } from "../../shared/auth/requests";
import axios from "axios";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  const registerMutation = useMutation(
    (newUser: NewUser) => register(newUser),
    {
      onSuccess: () => {
        resetForm();
        navigate("/login");
      },
    }
  );

  const registerHandler = async () => {
    // try {
    //   const response = await axios.get("http://192.168.1.34:4000");

    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }

    if (!firstName || !lastName || !email || !password) return;

    registerMutation.mutate({ firstName, lastName, email, password });
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.facebookText}>facebook</Text>
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          placeholder="lastName"
          value={lastName}
          onChangeText={setLastName}
        />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />

        <Input
          secure
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.registerButtonContainer}>
          {registerMutation.isLoading ? (
            <Loader></Loader>
          ) : (
            <Button
              style={styles.registerButton}
              labelStyle={styles.registerButtonText}
              mode="contained"
              onPress={registerHandler}
            >
              Register
            </Button>
          )}
        </View>
      </View>
      <Button labelStyle={styles.signUpText} onPress={() => navigate("/login")}>
        Already a member? Log In
      </Button>
    </View>
  );
};

export default RegisterScreen;

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
  registerButtonContainer: {
    marginTop: 16,
    width: "100%",
  },
  registerButton: {
    backgroundColor: COLOR_FB_SECONDARY,
    height: 48,
    borderRadius: 0,
  },
  registerButtonText: {
    paddingTop: 8,
    fontSize: 24,
  },
  signUpText: {
    color: COLOR_WHITE,
    fontSize: 16,
  },
});
