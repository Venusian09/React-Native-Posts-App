import React, { useContext, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

import { globalStyles } from "../styles/Global";

import Comments from "./Comments";

export default function SinglePost({ navigation }) {
  const { id, passValue } = useContext(AuthContext);
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(
        (data) => {
          setPost(data);
        },
        (error) => {
          setError(error);
        }
      );
  }, [id]);
  if (error) {
    return <Text> API ERROR</Text>;
  } else if (post) {
    return (
      <View style={globalStyles.container}>
        <Text>ID: {post.id}</Text>
        <Text>Title: {post.title}</Text>
        <Text>Opis: {post.body}</Text>
        <Comments />
      </View>
    );
  }
}
