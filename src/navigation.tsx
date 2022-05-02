import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { ThemeContext } from "./context/themeSwichContext";
import DefaultTheme from "./constants/default-theme";
import DarkTheme from "./constants/dark-theme";
import HomeScreen from "./views/Home";
import PostDetail from "./views/PostDetail";
import CreatePostScreen from "./views/CreatePost";
import UserScreen from "./views/User";
import SettingScreen from "./views/Setting";
import CommentReply from "./components/CommentReply";
import AboutScreen from "./views/About";
import TermsScreen from "./views/Terms";
import { Preview } from "./components/TextEditorArea/preview";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/DrawerContent";
import { AuthContext } from "./context/authContext";

import SplashScreen from "./views/authview/threescreen/SplashScreen";
import SignInScreen from "./views/authview/threescreen/SignInScreen";
import SignUpScreen from "./views/authview/threescreen/SignUpScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const RootStack = createStackNavigator();
const SettingStack = createStackNavigator();

function SignScreens() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
}

function HomeScreens(props: { navigation: any }) {
  const { navigation } = props;
  const { theme } = React.useContext(ThemeContext);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <FontAwesome
                name="bars"
                size={20}
                color={theme === "light" ? "black" : "white"}
                style={{
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={(props: { route: any }) => {
          const { route } = props;
          return {
            headerShown: true,
            headerTitle: route.params.category,
            headerStyle: { height: 40 },
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: "center",
          };
        }}
      />
      <HomeStack.Screen
        name="preview"
        component={Preview}
        options={(props: { route: any }) => {
          const { route } = props;
          return {
            headerTitle: route.params.category,
            headerStyle: { height: 40 },
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: "center",
          };
        }}
      />

      <HomeStack.Screen
        name="CommentReply"
        component={CommentReply}
        options={(props: { route: any }) => {
          const { route } = props;
          return {
            headerTitle: route.params.category,
            headerStyle: { height: 40 },
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: "center",
          };
        }}
      />
    </HomeStack.Navigator>
  );
}

function SettingScreens() {
  return (
    <SettingStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <SettingStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: true }}
      />
      <SettingStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerTitle: "關於我地",
          headerStyle: { height: 40 },
          headerTitleStyle: {
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
      <SettingStack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{
          headerTitle: "服務條款",
          headerStyle: { height: 40 },
          headerTitleStyle: {
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
    </SettingStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreens} />
      <Drawer.Screen name="CreatePost" component={CreatePostScreen} />
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="Setting" component={SettingScreens} />
    </Drawer.Navigator>
  );
}

function RootScreen() {
  const { authState } = React.useContext(AuthContext);
  const { theme } = React.useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
      {authState.token ? <MyTabs /> : <SignScreens />}
    </NavigationContainer>
  );
}

export default RootScreen;
