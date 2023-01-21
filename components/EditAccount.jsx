import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Ionicons from "react-native-vector-icons/Ionicons";

import { globalStyles } from "../styles/Global";
import { AuthContext } from "../context/AuthContext";

const width = Dimensions.get("window").width;

export default function EditAccount() {
  const {
    userInfo,
    isLoading,
    showEditAccount,
    setShowEditAccount,
    editAccountDetails,
  } = useContext(AuthContext);

  const [name, setName] = useState(userInfo.user.firstname);
  const [lastname, setLastname] = useState(userInfo.user.lastname);
  const [email, setEmail] = useState(userInfo.user.email);
  const [password, setPassword] = useState(null);

  return (
    <View>
      <Spinner visible={isLoading} />
      <Modal
        swipeDirection={["down"]}
        visible={showEditAccount}
        modalTitle={
          <View style={styles.heading}>
            <TouchableOpacity onPress={() => setShowEditAccount(false)}>
              <Ionicons name="close" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.primaryBtn, styles.addBtn]}
              onPress={() => {
                if (
                  name !== userInfo.user.firstname ||
                  lastname !== userInfo.user.lastname ||
                  email !== userInfo.user.email
                ) {
                  editAccountDetails(name, lastname, email, password);
                } else {
                  alert("Dane się nie różnią!");
                }
              }}
            >
              <Text style={globalStyles.primaryBtnText}>Zapisz</Text>
            </TouchableOpacity>
          </View>
        }
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onSwipeOut={() => {
          setShowEditAccount(false);
        }}
      >
        <ModalContent style={styles.fullWidth}>
          <Text style={styles.editNotice}>
            Edycja danych skutkuje{" "}
            <Text style={styles.editNoticeStrong}>wylogowaniem</Text>
          </Text>
          <TextInput
            placeholder="Imię"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Nazwisko"
            style={styles.input}
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Hasło"
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={true}
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
    alignItems: "center",
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
    paddingTop: 200,
    paddingBottom: 10,
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  textInput: {
    height: 150,
  },
  addBtn: {
    marginBottom: 0,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: "50%",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 300,
  },
  editNotice: {
    marginBottom: 20,
  },
  editNoticeStrong: {
    color: "#707eff",
    fontWeight: "bold",
  },
});
