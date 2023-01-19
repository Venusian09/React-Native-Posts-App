import { StyleSheet } from "react-native";
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  titleText: {
    fontSize: 18,
    color: "#333",
  },
  subTitleText: {
    fontSize: 16,
    marginTop: 12,
    color: "#333",
  },
  smallTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  center: {
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: "#707eff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: "50%",
    marginBottom: 20,
    textAlign: "center",
  },
  primaryBtnText: {
    color: "#ffffff",
    textTransform: "uppercase",
    textAlign: "center",
  },
  textAuthor: {
    fontWeight: "bold",
    fontSize: 15,
  },
  smallGrey: {
    color: "#383838",
    fontSize: 13,
    marginBottom: 5,
  },
});
