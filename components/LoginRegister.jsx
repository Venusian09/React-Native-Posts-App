import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StyleSheet } from "react-native";

import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";

export default function LoginRegister({ navigation }) {
  const { isLogin, setRegister, setLogin } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={isLogin ? styles.buttonActive : styles.button}
          onPress={() => setLogin()}
        >
          <Text style={isLogin && styles.textActive}>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isLogin ? styles.button : styles.buttonActive}
          onPress={() => setRegister()}
        >
          <Text style={!isLogin && styles.textActive}>Zarejestruj się</Text>
        </TouchableOpacity>
      </View>
      {isLogin ? <LoginUser /> : <RegisterUser />}
      <TouchableOpacity
        style={styles.backText}
        onPress={() => {
          navigation.navigate("Welcome screen");
        }}
      >
        <Text>Powrót do ekranu powitalnego</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    position: "absolute",
    top: 180,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonActive: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#707eff",
    borderRadius: "50%",
  },
  textActive: {
    color: "#fff",
  },
  backText: {
    position: "absolute",
    bottom: 50,
  },
});
