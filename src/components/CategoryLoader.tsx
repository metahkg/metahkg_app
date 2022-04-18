import React from "react";
import { View, StyleSheet } from "react-native";

import TextLoader from "./TextLoader";
import { customTheme } from "../constants/default-theme";
import { useTheme } from "@react-navigation/native";

const CategoryLoader = () => {
  const { colors } = useTheme() as customTheme;

  return (
    <View style={[styles.loader, { backgroundColor: colors.bgColor }]}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TextLoader key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    padding: 5,
    marginTop: 7,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CategoryLoader;
