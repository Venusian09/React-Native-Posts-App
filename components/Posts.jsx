import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StyleSheet } from "react-native";
import { globalStyles } from "../styles/Global";
import DeletePostModal from "./DeletePostModal";

export default function Posts({ url, handleClick }) {
  const {
    showDeleteModal,
    setDeleteModal,
    passValue,
    id,
    userInfo,
    setDeletePostId,
    deletePostId,
    isLoading,
    newPost,
    setNewPost,
    removePostId,
    setRemovePostId,
  } = useContext(AuthContext);

  const token = userInfo.token;

  const [data, setData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [stopPagination, setStopPagination] = useState(false);
  const fetchMoreData = () => {
    if (data.nextPage) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (removePostId) {
      const index = posts.findIndex((obj) => obj._id === removePostId);
      console.log(index);
      setPosts([...posts.slice(0, index), ...posts.slice(index + 1)]);
      setRemovePostId(null);
    }
    if (newPost) {
      setPage(1);
      setPosts(null);
      setData(null);
      setStopPagination(false);
      setNewPost(false);
    }
    fetch(url + page, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (!stopPagination) {
            setData(data);
            if (page == 1) {
              setPosts([...data.docs]);
            } else if (page > 1) {
              setPosts([...posts, ...data.docs]);
            }
            if (page == data.totalPages) {
              setStopPagination(true);
            }
          }
        },
        (error) => {
          setError(error);
        }
      );
  }, [deletePostId, isLoading, page]);
  console.log(removePostId);

  if (error) {
    return <Text>API ERROR</Text>;
  } else if (posts) {
    if (posts.length > 0) {
      return (
        <View>
          <FlatList
            keyExtractor={(item) => {
              item._id;
            }}
            data={posts}
            contentContainerStyle={{ paddingBottom: 80, marginBottom: 81000 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleClick(item)}>
                <View style={styles.singlePost}>
                  <Text style={globalStyles.textAuthor}>
                    {item.postedBy.firstname} {item.postedBy.lastname}
                  </Text>
                  <Text style={globalStyles.smallGrey}>
                    {item.created.slice(0, 10)}
                  </Text>
                  <Text>
                    {item.content.length > 50
                      ? `${item.content.slice(0, 50)} [...]`
                      : item.content}
                  </Text>
                  {userInfo.user.role.includes("Admin", 0) ||
                  item.postedBy._id == userInfo.user._id ? (
                    <TouchableOpacity
                      style={styles.deletePostBtn}
                      onPress={() => {
                        setDeleteModal(true);
                        setDeletePostId(item.id);
                      }}
                    >
                      <Text style={styles.deletePostBtnText}>X</Text>
                    </TouchableOpacity>
                  ) : (
                    ""
                  )}
                </View>
              </TouchableOpacity>
            )}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
          {showDeleteModal && <DeletePostModal />}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Brak wpisów</Text>
        </View>
      );
    }
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
    position: "absolute",
    top: 0,
    right: 5,
    padding: 10,
  },
});
