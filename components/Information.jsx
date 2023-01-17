import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/Global";

export default function Information() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Informacje o aplikacji</Text>
      <Text style={globalStyles.subTitleText}>Autorzy: </Text>
      <View style={style.authors}>
        <Text style={globalStyles.smallTitle}>
          Adam Sawicki, nr indeksu 12345
        </Text>
        <Text style={globalStyles.smallTitle}>
          Kamil Dębczak, nr indeksu 24569
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  authors: {
    marginTop: 12,
  },
});
