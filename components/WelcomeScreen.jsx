import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import { StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function WelcomeScreen({ navigation }) {
  const { setLogin, setRegister, isLogin } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          style={styles.image}
          source={require("../assets/welcome_team.png")}
        />
        <Text style={styles.mainText}>Witamy serdecznie</Text>
        <Text style={styles.subText}>Twórz historie razem ze znajomymi!</Text>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            setLogin();
            navigation.navigate("Login Register");
          }}
        >
          <Text style={styles.loginButtonText}>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRegister();
            navigation.navigate("Login Register");
          }}
        >
          <Text>
            ... lub <Text style={styles.strong}>stwórz konto</Text> już teraz!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 30,
  },
  mainText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subText: {
    color: "#383838",
  },
  topSection: {
    alignItems: "center",
  },
  bottomSection: {
    alignItems: "center",
    marginTop: 60,
    alignItems: "center",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#707eff",
    width: "70%",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: "50%",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#ffffff",
    textTransform: "uppercase",
    textAlign: "center",
  },
  strong: {
    fontWeight: "600",
  },
});
