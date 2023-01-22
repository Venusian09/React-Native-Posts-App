import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

import { globalStyles } from "../styles/Global";
import UserList from "./UserList";

export default function UserSearch() {
  const [text, setText] = useState(null);

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setText(text)}
        placeholder="Znajdź użytkownika"
        multiline={true}
      />
      {text && <UserList param={text} />}
    </View>
  );
}

const styles = StyleSheet.create({});
