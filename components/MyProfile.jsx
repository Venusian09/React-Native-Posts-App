import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/Global";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";
import Posts from "./Posts";

export default function MyProfile({ navigation, handleClick }) {
  const { userInfo, logout, isLoading, passValue, setBackScreen, backScreen } =
    useContext(AuthContext);
  function handleClick(value) {
    setBackScreen("Profil");
    navigation.navigate("Singlepost");
    passValue(value);
  }
  const url = `https://jsonplaceholder.typicode.com/posts/`;

  return (
    <View style={globalStyles.container}>
      <Spinner visible={isLoading} />
      <View style={style.profileTop}>
        <Text style={globalStyles.titleText}>
          Witaj {userInfo.user.firstname}
        </Text>
        <TouchableOpacity onPress={logout}>
          <Text style={style.logout}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>
      <Posts url={url} handleClick={handleClick} />
    </View>
  );
}

const style = StyleSheet.create({
  profileTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logout: {
    color: "red",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
