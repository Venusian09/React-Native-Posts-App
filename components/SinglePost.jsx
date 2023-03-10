import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

import { globalStyles } from "../styles/Global";

import Comments from "./Comments";

export default function SinglePost({ navigation }) {
  const { singlePost, passValue, id } = useContext(AuthContext);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.textAuthor}>
            {singlePost.postedBy.firstname} {singlePost.postedBy.lastname}
          </Text>
          <Text style={globalStyles.smallGrey}>
            {singlePost.created.slice(0, 10)}
          </Text>
          <Text>{singlePost.content}</Text>
          <Comments postId={singlePost._id} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
