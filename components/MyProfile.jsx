import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/Global";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

import Posts from "./Posts";
import EditAccount from "./EditAccount";

export default function MyProfile({ navigation, handleClick }) {
  const {
    userInfo,
    logout,
    isLoading,
    passValue,
    setBackScreen,
    backScreen,
    showEditAccount,
    setShowEditAccount,
  } = useContext(AuthContext);
  function handleClick(value) {
    setBackScreen("Profil");
    navigation.navigate("Singlepost");
    passValue(value);
  }
  const url = `${BASE_URL}/users/user/${userInfo.user._id}/posts?page=`;

  return (
    <View style={globalStyles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.profileTop}>
        <Text style={globalStyles.titleText}>
          Witaj {userInfo.user.firstname}
        </Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoBox}>
        <TouchableOpacity
          style={globalStyles.primaryBtn}
          onPress={() => setShowEditAccount(true)}
        >
          <Text style={globalStyles.primaryBtnText}>Edytuj dane konta</Text>
        </TouchableOpacity>
      </View>
      {showEditAccount && <EditAccount />}
      <View style={styles.userPosts}>
        <Text style={[globalStyles.titleText, styles.userPostsText]}>
          Twoje wpisy:
        </Text>
        <Posts url={url} handleClick={handleClick} style={styles.posts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  logout: {
    color: "red",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  userPosts: {
    marginTop: 20,
    paddingBottom: 150,
  },
  userPostsText: {
    marginBottom: 20,
  },
  posts: {
    marginBottom: 80,
  },
});
