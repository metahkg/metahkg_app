import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeSwichContext";
import Navigation from "./navigation";
import { ContentProvider } from "./context/contentChangeContext";
import ReactotronConfig from "../ReactotronConfig";
if (__DEV__) {
  ReactotronConfig;
  console.log("Reactotron Configured");
}

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <ContentProvider>
            <Navigation />
          </ContentProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
