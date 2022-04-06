import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import {Example} from "./src/RichEditor/example.hooks";

import useCachedResources from './hooks/useCachedResources';
import App1 from './src/app';
import useColorScheme from "../appnameee1-typescript-sth/hooks/useColorScheme";
import Navigation from "../appnameee1-typescript-sth/navigation";
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
        <App1/>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
