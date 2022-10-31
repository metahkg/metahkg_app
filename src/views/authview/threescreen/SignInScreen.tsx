import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import hash from "hash.js";
import { useTheme } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import { api } from "../../../utils/api";
import { AuthContext } from "../../../context/authContext";
import { jwtTokenType } from "../../../types/user";
import MetahkgLogo from "../../../components/Metahkglogo";
import { customTheme } from "../../../constants/default-theme";
import { styles } from "./styles/signin.styles";
import { Type } from "@sinclair/typebox";
import { ajv } from "../../../utils/ajv";

const SignInScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const { setStorage } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme() as customTheme;

  const textInputChange = (val: string) => {
    const valid = Boolean(val.match(/^\S{1,15}$/));
    setData({
      ...data,
      username: val,
      check_textInputChange: valid,
      isValidUser: valid,
    });
  };

  const handlePasswordChange = (val: string) => {
    const valid = Boolean(val.match(/^\S{8,}$/));
    setData({
      ...data,
      password: val,
      isValidPassword: valid,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val: string) => {
    const valid = Boolean(val.match(/^\S{1,15}$/));
    setData({
      ...data,
      isValidUser: valid,
    });
  };

  const loginHandle = async (userName: string, password: string) => {
    const values = {
      name: userName,
      pwd: hash.sha256().update(password).digest("hex"),
    };
    /*const schema = Type.Object({
      name: Type.RegEx(/^\S{1,15}$/),
      pwd: Type.RegEx(/^[a-f0-9]{64}$/i),
    });*/
    /*if (!ajv.validate(schema, values))
      return Alert.alert(
        "Error",
        `Your username or password is invalid:
- Username must be between 1 and 15 characters`
      );*/
    setLoading(true);
    api
      .usersLogin(values)
      .then((data) => {
        setLoading(false);
        const { token } = data;
        const decoded = jwtDecode(token) as jwtTokenType;
        const expiresAt = decoded?.exp;
        const userInfo = decoded;
        setStorage(token, expiresAt, userInfo);
      })
      .catch((error) => {
        console.log(error);
        if (error?.error?.includes?.("email"))
          return Alert.alert("Please verify your email first.");
        setLoading(false);
        Alert.alert(
          "Error",
          typeof error?.error === "string" ? error?.error : "Something went wrong. Please try again later."
        );
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.dark }]}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: colors.dark }]}>
        <MetahkgLogo height={50} width={40} sx={styles.tinylogo} light />
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor={colors.grey}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>
        {!data.isValidUser && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 1 - 15 characters long, and without any spaces.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor={colors.grey}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <Feather
              name={data.secureTextEntry ? "eye-off" : "eye"}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        {!data.isValidPassword && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          {loading ? (
            <ActivityIndicator color={colors.yellow} size="large" />
          ) : (
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}
            >
              <LinearGradient
                colors={["#ffc100", "#f5bd1f"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[
              styles.signIn,
              {
                borderColor: "#ffc100",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: colors.yellow2,
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
