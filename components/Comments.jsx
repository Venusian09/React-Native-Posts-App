import React, { useEffect, useState, useContext } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";

import { StyleSheet } from "react-native";
import CommentsForm from "./CommentsForm";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

export default function Comments({ postId }) {
  const { userInfo, singlePost, addComment, deletePostComment } =
    useContext(AuthContext);
  const token = userInfo.token;
  const url = `${BASE_URL}/posts/${postId}/comments`;
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setComments(res.docs);
      });
  }, [singlePost, addComment, deletePostComment]);

  if (comments) {
    return (
      <>
        <CommentsForm postId={postId} />
        {comments.length == 0 ? (
          <View style={styles.noComments}>
            <Text>Brak komentarzy. Bądź pierwszy i skomentuj juz teraz!</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={comments}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.commentsWrapper}>
                    <View style={styles.commentBox}>
                      <Text style={styles.textAuthor}>
                        {item.postedBy.firstname} {item.postedBy.lastname}
                      </Text>
                      <Text style={styles.textBody}>{item.content}</Text>
                      {userInfo.user._id == singlePost.postedBy._id ||
                      userInfo.user._id == item.postedBy._id ? (
                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => deletePostComment(item._id, item.post)}
                        >
                          <Text>X</Text>
                        </TouchableOpacity>
                      ) : (
                        ""
                      )}
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  textAuthor: {
    fontWeight: "bold",
    fontSize: 13,
  },
  textBody: {
    fontSize: 15,
  },
  commentsWrapper: {
    marginTop: 20,
  },
  commentBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f0f2f5",
    borderRadius: 18,
  },
  deleteBtn: {
    position: "absolute",
    right: 10,
    top: 0,
    padding: 8,
  },
  noComments: {
    marginTop: 20,
  },
});
