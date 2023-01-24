import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Modal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";
import { globalStyles } from "../styles/Global";
import Posts from "./Posts";
import { BASE_URL } from "../config";

const width = Dimensions.get("window").width;

export default function SingleUser({ user }) {
  console.log(user);
  const { showSingleUser, setShowSingleUser } = useContext(AuthContext);
  const url = `${BASE_URL}/users/user/${user._id}/posts`;
  return (
    <View>
      <Modal
        swipeDirection={["down"]}
        visible={showSingleUser}
        modalTitle={
          <View>
            <TouchableOpacity onPress={() => setShowSingleUser(false)}>
              <Ionicons name="close" />
            </TouchableOpacity>
          </View>
        }
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onSwipeOut={() => {
          setShowSingleUser(false);
        }}
      >
        <ModalContent style={styles.fullWidth}>
          <View>
            <Text style={globalStyles.textAuthor}>
              {user.firstname} {user.lastname}
            </Text>
            <Text style={globalStyles.textAuthor}>{user.email}</Text>
            <Text style={globalStyles.smallGrey}>
              Z nami od: {user.joined.slice(0, 10)}
            </Text>
            <Posts url={url} />
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: width,
    minHeight: 200,
  },
});
