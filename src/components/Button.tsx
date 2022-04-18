import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { customTheme } from "../constants/default-theme";

const Button = (props: {
  children: JSX.Element | JSX.Element[];
  bgColor: string;
  title: string;
  customProps: any[];
}) => {
  const { children, bgColor, title, customProps } = props;
  const { colors } = useTheme() as customTheme;

  return (
    <TouchableOpacity
      {...customProps}
      style={[styles.button, { backgroundColor: bgColor }]}
      activeOpacity={0.8}
    >
      {children}
      <Text style={[styles.buttonText, { color: colors.white }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    margin: 10,
    justifyContent: "center",
    borderRadius: 999,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginLeft: 10,
  },
});

export default Button;
