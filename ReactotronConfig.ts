import Reactotron from "reactotron-react-native";
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from "@react-native-async-storage/async-storage";
export default Reactotron.setAsyncStorageHandler &&
  Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .connect();
