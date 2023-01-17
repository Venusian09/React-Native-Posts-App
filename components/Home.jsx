import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from "../styles/Global";

import HomeSlider from "./HomeSlider";
import NewPosts from "./NewPosts";
import SinglePost from "./SinglePost";
import { AuthContext } from "../context/AuthContext";

export default function Home({ navigation }) {
  const { passValue } = useContext(AuthContext);

  function handleClick(value) {
    navigation.navigate("Singlepost");
    passValue(value);
  }

  return (
    <View style={globalStyles.container}>
      <>
        <HomeSlider />
        <Text style={styles.homePageTitle}>Najnowsze wpisy</Text>
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
});
