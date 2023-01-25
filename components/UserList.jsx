import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { globalStyles } from "../styles/Global";

import { AuthContext } from "../context/AuthContext";
import SingleUser from "./SingleUser";

export default function UserList({ users, navigation }) {
  const { showSingleUser, setShowSingleUser, userInfo } =
    useContext(AuthContext);
  const [singleUser, setSingleUser] = useState(null);

  if (users) {
    if (users.docs.length > 0) {
      return (
        <View style={styles.list}>
          <Text>Lista userów</Text>
          <FlatList
            data={users.docs}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShowSingleUser(true);
                    setSingleUser(item);
                  }}
                >
                  <View style={styles.singleUser}>
                    <View style={styles.singleUserLeft}>
                      <Text style={globalStyles.textAuthor}>
                        {item.firstname} {item.lastname}
                      </Text>
                      <Text style={globalStyles.textAuthor}>{item.email}</Text>
                      <Text style={globalStyles.smallGrey}>
                        Z nami od: {item.joined.slice(0, 10)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
          {showSingleUser && (
            <SingleUser user={singleUser} navigation={navigation} />
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.list}>
          <Text>Lista userów</Text>
          <Text style={globalStyles.smallGrey}>Brak wyników</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  singleUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

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
    padding: 20,
    marginBottom: 12,
  },
});
