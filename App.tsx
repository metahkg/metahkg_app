import { StyleSheet } from "react-native";

import useCachedResources from "./src/hooks/useCachedResources";
import App1 from "./src/app";
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <View style={styles.container}>
      //   <Text>Open up App.tsx to start working on your app!</Text>
      //   {/*<Example/>*/}
      //   <StatusBar style="auto" />
      // </View>
      <App1 />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
