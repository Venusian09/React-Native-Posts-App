import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/Global";

import HomeSlider from "./HomeSlider";
import NewPosts from "./NewPosts";
import SinglePost from "./SinglePost";
import AddPost from "./AddPost";
import { AuthContext } from "../context/AuthContext";

export default function Home({ navigation }) {
  const { passValue, showAddPost, setAddPost, backScreen, setBackScreen } =
    useContext(AuthContext);

  function handleClick(value, backScreenValue) {
    setBackScreen("Tablica");
    navigation.navigate("Singlepost");
    passValue(value);
  }

  return (
    <View style={globalStyles.container}>
      <>
        <TouchableOpacity
          style={[globalStyles.primaryBtn, styles.addBtn]}
          onPress={() => setAddPost(true)}
        >
          <Text style={globalStyles.primaryBtnText}>Co słychać?</Text>
        </TouchableOpacity>
        {showAddPost && <AddPost />}
        <NewPosts handleClick={handleClick} />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  homePageTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  addBtn: {
    width: "100%",
  },
});
