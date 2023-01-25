import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

export default function CommentsForm({ postId }) {
  const [comment, setComment] = useState(null);

  const { userInfo, passComment } = useContext(AuthContext);

  const placeComment = () => {
    const url = `${BASE_URL}/posts/${postId}/comments`;
    const token = userInfo.token;
    console.log(url, token);

    const ob = {
      content: comment,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ob),
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res);
        setComment("");
        passComment(res);
      });
  };

  return (
    <View style={styles.commentInputWrapper}>
      <TextInput
        value={comment}
        onChangeText={(text) => setComment(text)}
        placeholder="Napisz komentarz"
        multiline={true}
        style={styles.commentInput}
      />
      {comment && (
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => placeComment()}
        >
          <Ionicons name="send" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sendButton: {
    backgroundColor: "#707eff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: "50%",
    textAlign: "center",
  },
  commentInputWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 43,
    alignItems: "flexstart",
  },
});
