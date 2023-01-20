import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/Global";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";

export default function MyProfile() {
  const { userInfo, logout, isLoading } = useContext(AuthContext);

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
