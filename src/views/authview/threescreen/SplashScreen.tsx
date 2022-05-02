import React, { useContext } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "@react-navigation/native";
import { customTheme } from "../../../constants/default-theme";
import { ThemeContext } from "../../../context/themeSwichContext";

const SplashScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const { colors } = useTheme() as customTheme;
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#222" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require("../../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          Metahkg Forum
        </Text>
        <Text style={styles.text}>Sign in to Metahkg.</Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 30
          }}
        >
          <TouchableOpacity
            onPress={() => {
              changeTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <MaterialCommunityIcons
              name={theme === "light" ? "weather-night" : "weather-sunny"}
              color={colors.text}
              size={30}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <LinearGradient
                colors={[colors.yellow2, colors.yellow]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
