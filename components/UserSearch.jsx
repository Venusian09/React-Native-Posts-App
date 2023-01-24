import React, { useContext, useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

import { BASE_URL } from "../config";
import { globalStyles } from "../styles/Global";
import UserList from "./UserList";
import { AuthContext } from "../context/AuthContext";

export default function UserSearch() {
  const [text, setText] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const queryUsers = (value) => {
    setText(value);
    const url = `${BASE_URL}/users/search`;
    const token = userInfo.token;
    const ob = {
      query: text,
    };

    console.log(ob);

    if (text) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ob),
      })
        .then((response) => response.json())
        .then(
          (data) => {
            setUsers(data);
          },
          (error) => {
            setError(error);
          }
        );
    }
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => queryUsers(text)}
        placeholder="Znajdź użytkownika"
        multiline={true}
      />
      {text && <UserList users={users} />}
    </View>
  );
}

const styles = StyleSheet.create({});
