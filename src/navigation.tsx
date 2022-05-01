import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
// import SignInScreen from './views/SignIn'
// import SignUpScreen from './views/SignUp'
import CommentReply from "./components/CommentReply";
import AboutScreen from "./views/About";
import TermsScreen from "./views/Terms";
import { Preview } from "./components/TextEditorArea/preview";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/DrawerContent";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "./context/authContext";

import SplashScreen from "./views/authview/threescreen/SplashScreen";
import SignInScreen from "./views/authview/threescreen/SignInScreen";
import SignUpScreen from "./views/authview/threescreen/SignUpScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();
const SignStack = createStackNavigator();
const RootStack = createStackNavigator();
const SettingStack = createStackNavigator();

// new version
function SignScreens() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
}

// old version
// function SignScreens() {
//     return (
//         <SignStack.Navigator
//             headerMode="screen"
//             screenOptions={{
//                 initialRouteName: 'SignModal',
//                 gestureEnabled: true,
//                 gestureDirection: 'vertical',
//                 ...TransitionPresets.ModalSlideFromBottomIOS,
//                 cardStyle: {
//                     backgroundColor: 'transparent'
//                 },
//                 headerShown: false
//             }}
//         >
//             <SignStack.Screen name="SignModal" component={SignModal}/>
//             <SignStack.Screen name="SignUp" component={SignUpScreen}/>
//             <SignStack.Screen name="SignIn" component={SignInScreen}/>
//         </SignStack.Navigator>
//     )
// }

function HomeScreens(props: { navigation: any }) {
  const { navigation } = props;
  const { theme } = React.useContext(ThemeContext);
  console.log("navigation is received,", navigation);
  return (
    <HomeStack.Navigator
    // screenOptions={{
    //     gestureEnabled: true,
    //     gestureDirection: 'horizontal',
    //     ...TransitionPresets.SlideFromRightIOS
    // }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <FontAwesome
              name="bars"
              size={20}
              color={theme === "light" ? "black" : "white"}
              style={{
                marginLeft: 20,
              }}
              onPress={() => {
                console.log("trying open drawer");
                navigation.openDrawer();
              }}
            />
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
        //gestureDirection: "horizontal",
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
        options={({ route }) => ({
          headerTitle: "關於我地",
          headerStyle: { height: 40 },
          headerTitleStyle: {
            fontSize: 16,
          },
          headerTitleAlign: "center",
        })}
      />
      <SettingStack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={({ route }) => ({
          headerTitle: "服務條款",
          headerStyle: { height: 40 },
          headerTitleStyle: {
            fontSize: 16,
          },
          headerTitleAlign: "center",
        })}
      />
    </SettingStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        // TODO: WARNING: don't know what is the children
        <DrawerContent {...props}>?</DrawerContent>
      )}
      // screenOptions={{
      //     animationEnabled: true
      // }}
      // options={{
      //     title: "Overview",
      //     headerLeft: () => (
      //         <Icon.Button name="ios-menu" size={25} backgroundColor="#009387"
      //                      onPress={() => navigation.openDrawer()}></Icon.Button>
      //     ),
      // }}
    >
      <Drawer.Screen name="吹水台" component={HomeScreens} />
      <Drawer.Screen name="CreatePost" component={CreatePostScreen} />
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="Setting" component={SettingScreens} />
    </Drawer.Navigator>
  );
}

function RootScreen() {
  const { authState } = React.useContext(AuthContext);
  const { theme } = React.useContext(ThemeContext);
  console.log(authState.userInfo);
  return (
    <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
      {authState.token ? <MyTabs /> : <SignScreens />}
      {/*<RootStack.Navigator*/}
      {/*    // screenOptions={{*/}
      {/*    //     headerShown: true,*/}
      {/*    //     cardStyle: {backgroundColor: 'transparent'},*/}
      {/*    //     cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,*/}
      {/*    //     gestureEnabled: true,*/}
      {/*    //     gestureDirection: 'vertical'*/}
      {/*    // }}*/}
      {/*    // mode="modal"*/}
      {/*>*/}
      {/*    <RootStack.Screen name="Tab" component={MyTabs}/>*/}
      {/*    <RootStack.Screen name="SignModal" component={SignScreens}/>*/}
      {/*</RootStack.Navigator>*/}
    </NavigationContainer>
  );
}

export default RootScreen;
