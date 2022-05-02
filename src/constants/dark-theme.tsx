import { DarkTheme } from "@react-navigation/native";
import { customTheme } from "./default-theme";

const customDarkTheme: customTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#18191a",
    blue: "#6495ed",
    grey: "#666666",
    border: "#888888",
    green: "#438a5e",
    yellow: "#ffc100",
    yellow2: "#f5bd1f",
    dark: "#222",
    dark2: "#171717",
    red: "#d31f4f",
    white: "white",
    bgColor: "#1b1b2f",
    signUpButton: "#ce815e",
    signInButton: "#6495ed",
    icon: "#888a8c",
    loader: "#393e46",
    postBorder: "transparent",
  },
};

export default customDarkTheme;
