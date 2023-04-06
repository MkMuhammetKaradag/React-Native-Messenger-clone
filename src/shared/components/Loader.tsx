import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Loader = () => {
  return (
    <ActivityIndicator
      animating={true}
      color={MD2Colors.white}
    ></ActivityIndicator>
  );
};

export default Loader;

const styles = StyleSheet.create({});
