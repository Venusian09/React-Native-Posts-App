import React, { useContext, useState } from "react";
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

export default function RegisterUser() {
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { isLoading, register } = useContext(AuthContext);

  return (
    <View>
      <Spinner visible={isLoading} />
      <View style={style.wrapper}>
        <View style={style.twoInputs}>
          <TextInput
            placeholder="Imię"
            style={style.smallInput}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Nazwisko"
            style={style.smallInput}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
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
            register(name, lastName, email, password);
          }}
        >
          <Text style={style.buttonText}>Zarejestruj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  twoInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  registerNote: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: "50%",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  smallInput: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: "50%",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "45%",
  },
  button: {
    backgroundColor: "#707eff",
    width: "70%",
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
