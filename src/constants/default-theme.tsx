import { DefaultTheme, Theme } from "@react-navigation/native";

export type customTheme = {
  colors: {
    blue: string;
    text: string;
    border: string;
    green: string;
    red: string;
    white: string;
    bgColor: string;
    signUpButton: string;
    signInButton: string;
    icon: string;
    loader: string;
    postBorder: string;
  };
} & Theme;

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: "#6495ed",
    text: "#424242",
    border: "#ecedf0",
    green: "#80bdab",
    red: "#d31f4f",
    white: "white",
    bgColor: "white",
    signUpButton: "#ce815e",
    signInButton: "#6495ed",
    icon: "#888a8c",
    loader: "#eeeeee",
    postBorder: "#ecedf0",
  },
};

export default customDefaultTheme;
