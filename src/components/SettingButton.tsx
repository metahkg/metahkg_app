import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import { customTheme } from "../constants/default-theme";

const SettingButton = (props: {
  title: string;
  onPressGoTo: string;
}) => {
  const { title, onPressGoTo } = props;
  const { colors } = useTheme() as customTheme;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          onPressGoTo
          // {username: author.username}
        );
      }}
      style={styles.infoBox}
    >
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: colors.bgColor, borderColor: colors.postBorder },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.SettingText, { color: colors.text }]}>
            {title}
          </Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 7,
    elevation: 1,
    borderWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  SettingText: {
    fontSize: 17,
    fontFamily: "OpenSans-Regular",
  },
  infoBox: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
});

export default SettingButton;
