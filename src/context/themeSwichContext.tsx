import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  changeTheme: (value: "light" | "dark") => Promise<void>;
}>({
  theme: "light",
  changeTheme: () => Promise.resolve(),
});
const { Provider } = ThemeContext;

const ThemeProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;
  const [theme, setTheme] = useState<"light" | "dark">("light");

  React.useEffect(() => {
    (async () => {
      try {
        const theme = await AsyncStorage.getItem("theme");
        if (theme === "light" || theme === "dark") setTheme(theme);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const changeTheme = async (value: "light" | "dark") => {
    setTheme(value);
    try {
      await AsyncStorage.setItem("theme", value);
    } catch (error) {
      console.log(error);
    }
  };
  return <Provider value={{ theme, changeTheme }}>{children}</Provider>;
};

export { ThemeProvider, ThemeContext };
