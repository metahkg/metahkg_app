import { DefaultTheme, Theme } from "@react-navigation/native";

export type customTheme = {
  colors: {
    blue: string;
    grey: string;
    yellow: string;
    yellow2: string;
    dark: string;
    dark2: string;
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

const customDefaultTheme: customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: "#6495ed",
    text: "#424242",
    border: "#ecedf0",
    green: "#80bdab",
    grey: "#666666",
    red: "#d31f4f",
    yellow: "#ffc100",
    yellow2: "#f5bd1f",
    dark: "#222",
    dark2: "#171717",
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
