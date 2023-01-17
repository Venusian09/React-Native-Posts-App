import React from "react";
import { Text, View } from "react-native";

import { StyleSheet } from "react-native";

export default function Comments() {
  return (
    <View style={styles.commentsWrapper}>
      <View style={styles.commentBox}>
        <Text style={styles.textAuthor}>Imię nazwisko</Text>
        <Text style={styles.textBody}>Ale jazda!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textAuthor: {
    fontWeight: "bold",
    fontSize: 13,
  },
  textBody: {
    fontSize: 15,
  },
  commentBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f0f2f5",
    borderRadius: 18,
  },
});
