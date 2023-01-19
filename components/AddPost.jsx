import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

import { globalStyles } from "../styles/Global";
import { AuthContext } from "../context/AuthContext";

const width = Dimensions.get("window").width;

export default function AddPost() {
  const { setAddPost, showAddPost, userInfo, isLoading, addSinglePost } =
    useContext(AuthContext);

  const [text, setText] = useState(null);

  return (
    <View>
      <Spinner visible={isLoading} />
      <Modal
        swipeDirection={["down"]}
        visible={showAddPost}
        modalTitle={
          <View style={styles.heading}>
            <TouchableOpacity onPress={() => setAddPost(false)}>
              <Ionicons name="close" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.primaryBtn, styles.addBtn]}
              onPress={() => {
                if (text) {
                  addSinglePost(text);
                } else {
                  alert("Uzupełnij treść!");
                }
              }}
            >
              <Text style={globalStyles.primaryBtnText}>Opublikuj</Text>
            </TouchableOpacity>
          </View>
        }
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onSwipeOut={() => {
          setAddPost(false);
        }}
      >
        <ModalContent style={styles.fullWidth}>
          <View style={styles.userInfo}>
            <Text style={globalStyles.textAuthor}>
              {userInfo[0].name} {userInfo[0].lastName}
            </Text>
            <Text style={globalStyles.smallGrey}>Z nami od: 21.37.1337</Text>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setText(text)}
            placeholder="Co słychać?"
            multiline={true}
          />
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: width,
    padding: 0,
    height: "100%",
  },
  userInfo: {
    marginVertical: 12,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 180,
    paddingBottom: 10,
    backgroundColor: "#fafafa",
  },
  textInput: {
    height: 150,
  },
  addBtn: {
    marginBottom: 0,
  },
});
