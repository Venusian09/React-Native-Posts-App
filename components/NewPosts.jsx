import React, { useEffect, useState } from "react";

import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { StyleSheet } from "react-native";
import { globalStyles } from "../styles/Global";

export default function NewPosts({ navigation, handleClick }) {
  const url = `https://jsonplaceholder.typicode.com/posts/`;

  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(
        (data) => {
          setPosts(data);
        },
        (error) => {
          setError(erorr);
        }
      );
  }, []);

  if (error) {
    return <Text> API ERROR</Text>;
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClick(item.id)}>
              <View style={styles.singlePost}>
                <Text style={styles.textAuthor}>Imię nazwisko</Text>
                <Text style={styles.textDate}>21.37.1337</Text>
                <Text>
                  {item.body.length > 50
                    ? `${item.body.slice(0, 50)} [...]`
                    : item.body}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  singlePost: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderStyle: "solid",
    marginBottom: 12,
    padding: 20,
  },
  textAuthor: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textDate: {
    color: "#383838",
    fontSize: 13,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
  },
});
