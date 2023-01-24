import React, { useEffect, useState, useContext } from "react";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { BASE_URL } from "../config";

import { StyleSheet } from "react-native";
import { globalStyles } from "../styles/Global";
import { AuthContext } from "../context/AuthContext";
import Posts from "./Posts";

import DeletePostModal from "./DeletePostModal";

export default function NewPosts({ navigation, handleClick }) {
  const [page, setPage = 1] = useState(1);

  const url = `${BASE_URL}/posts?page=${page}`;
  const { showDeleteModal, setDeleteModal, passValue, id } =
    useContext(AuthContext);

  return (
    <View>
      <Posts url={url} handleClick={handleClick} />
    </View>
  );
}
