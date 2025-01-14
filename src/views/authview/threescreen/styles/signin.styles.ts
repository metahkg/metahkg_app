import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#333",
    },
    header: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      flex: 3,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 30,
    },
    text_footer: {
      color: "#05375a",
      fontSize: 18,
    },
    action: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#FF0000",
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -4,
      paddingLeft: 10,
      color: "#ffc100",
    },
    errorMsg: {
      color: "#FF0000",
      fontSize: 14,
    },
    button: {
      alignItems: "center",
      marginTop: 50,
    },
    signIn: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    textSign: {
      fontSize: 18,
      fontWeight: "bold",
    },
    tinylogo: {
      width: 40,
      height: 50,
    },
  });
  