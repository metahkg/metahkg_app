import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { customTheme } from "../constants/default-theme";

import TextLoader from "./TextLoader";

const PostLoader = ({ ...props }) => {
  const { colors } = useTheme() as customTheme;

  return (
    <View
      style={[styles.loader, { backgroundColor: colors.bgColor }]}
      {...props}
    >
      <TextLoader style={{ width: "30%", marginTop: 10 }} />
      {[1, 2, 3].map((i) => (
        <TextLoader key={i} style={{ width: "100%", marginTop: 10 }} />
      ))}
      <TextLoader style={{ width: "80%", marginTop: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 7,
    elevation: 1,
  },
});

export default PostLoader;
