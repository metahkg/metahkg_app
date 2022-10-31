import React from "react";
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userType } from "../types/user";
import { User } from "@metahkg/api";
const AuthContext = React.createContext<{
  authState: {
    userInfo: User | null;
    token: string | null;
    expiresAt: number | null;
  };
  signOut: () => void;
  setStorage: (
    token: string,
    expiresAt: number,
    userInfo: userType
  ) => Promise<void>;
}>({
  signOut: () => {},
  authState: { userInfo: null, token: null, expiresAt: null },
  setStorage: async () => {},
});
const { Provider } = AuthContext;

const AuthProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;
  const [authState, setAuthState] = React.useState<{
    userInfo: userType | null;
    token: string | null;
    expiresAt: number | null;
  }>({ userInfo: null, token: null, expiresAt: null });

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let token, expiresAt, userInfo;
      try {
        token = await AsyncStorage.getItem("token");
        expiresAt = await AsyncStorage.getItem("expiresAt");
        userInfo = await AsyncStorage.getItem("userInfo");
      } catch (e) {
        console.log(e);
      }

      if (new Date().getTime() / 1000 > JSON.parse(expiresAt || "{}")) {
        signOut();
      }

      setAuthState({
        token: token || "",
        expiresAt: Number(expiresAt),
        userInfo: userInfo ? JSON.parse(userInfo) : {},
      });
    };

    bootstrapAsync();
  }, []);

  const setStorage = async (
    token: string,
    expiresAt: number,
    userInfo: userType
  ) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expiresAt", JSON.stringify(expiresAt));
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.log(error);
    }

    setAuthState({ token, expiresAt, userInfo });
  };

  const signOut = async () => {
    const keys = ["token", "expiresAt", "userInfo"];

    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.log(error);
    }

    setAuthState({ token: null, expiresAt: null, userInfo: null });
  };

  return (
    <Provider value={{ authState, setStorage, signOut }}>{children}</Provider>
  );
};

export { AuthContext, AuthProvider };
