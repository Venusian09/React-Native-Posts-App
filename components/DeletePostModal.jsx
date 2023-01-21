import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import {
  Modal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { globalStyles } from "../styles/Global";

import { AuthContext } from "../context/AuthContext";

export default function DeletePostModal(id) {
  const { setDeleteModal, deletePost } = useContext(AuthContext);
  return (
    <View>
      <Modal
        visible={true}
        modalTitle={false}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <ModalContent>
          <Text style={globalStyles.center}>
            Czy na pewno chcesz usunąć ten wpis?
          </Text>
          <View style={styles.deleteBtns}>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => {
                setDeleteModal(false);
                deletePost(id);
              }}
            >
              <Text style={styles.buttonDeleteText}>Tak</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDontDelete}
              onPress={() => setDeleteModal(false)}
            >
              <Text>Nie</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteModal: {
    padding: 60,
  },
  deleteBtns: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDelete: {
    backgroundColor: "#707eff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: "50%",
    marginBottom: 20,
    width: 100,
    marginTop: 20,
    marginRight: 40,
    textAlign: "center",
  },
  buttonDontDelete: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 100,
    textAlign: "center",
  },
  buttonDeleteText: {
    color: "#ffffff",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
