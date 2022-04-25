import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { customTheme } from "../constants/default-theme";

const TextLoader = ({ ...props }) => {
  const { colors } = useTheme() as customTheme;

  return (
    <View
      style={[styles.bgLight, props.style, { backgroundColor: colors.loader }]}
    />
  );
};

const styles = StyleSheet.create({
  bgLight: {
    width: 60,
    height: 16,
    borderRadius: 5,
  },
});

export default TextLoader;
