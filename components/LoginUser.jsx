import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { globalStyles } from "../styles/Global";

import Spinner from "react-native-loading-spinner-overlay/lib";

export default function LoginUser() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { isLoading, login } = useContext(AuthContext);

  return (
    <View>
      <Spinner visible={isLoading} />
      <View style={style.wrapper}>
        <TextInput
          placeholder="Email"
          style={style.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Hasło"
          secureTextEntry={true}
          style={style.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            if (email && password) {
              login(email, password);
            } else {
              alert("Brakujące pole email lub hasła");
            }
          }}
        >
          <Text style={style.buttonText}>Zaloguj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: "50%",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 300,
  },
  link: {
    color: "#246ece",
  },
  button: {
    backgroundColor: "#707eff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: "50%",
    marginBottom: 20,
    width: 300,
    marginTop: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#ffffff",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
