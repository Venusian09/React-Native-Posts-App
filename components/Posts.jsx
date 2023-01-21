import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StyleSheet } from "react-native";
import { globalStyles } from "../styles/Global";
import DeletePostModal from "./DeletePostModal";

export default function Posts({ url, handleClick }) {
  const { showDeleteModal, setDeleteModal, passValue, id, userInfo } =
    useContext(AuthContext);

  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          setPosts(data);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <Text>API ERROR</Text>;
  } else {
    return (
      <View>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClick(item.id)}>
              <View style={styles.singlePost}>
                <Text style={globalStyles.textAuthor}>Imię nazwisko</Text>
                <Text style={globalStyles.smallGrey}>21.37.1337</Text>
                <Text>
                  {item.body.length > 50
                    ? `${item.body.slice(0, 50)} [...]`
                    : item.body}
                </Text>
                <TouchableOpacity
                  style={styles.deletePostBtn}
                  onPress={() => {
                    setDeleteModal(true);
                    passValue(item.id);
                  }}
                >
                  <Text style={styles.deletePostBtnText}>X</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
        {showDeleteModal && <DeletePostModal id={id} />}
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
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  deletePostBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  deletePostBtnText: {
    color: "#969696",
  },
});
