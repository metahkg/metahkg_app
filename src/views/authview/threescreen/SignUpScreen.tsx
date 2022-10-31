import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
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
import { api } from "../../../utils/api";
import { AuthContext } from "../../../context/authContext";
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import jwtDecode from "jwt-decode";
import { jwtTokenType } from "../../../types/user";
import hash from "hash.js";
import MetahkgLogo from "../../../components/Metahkglogo";
import EmailValidator from "email-validator";
import { useTheme } from "@react-navigation/native";
import { customTheme } from "../../../constants/default-theme";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../../../context/themeSwichContext";
import { styles } from "./styles/signup.styles";
import { Type } from "@sinclair/typebox";
import { ajv } from "../../../utils/ajv";
import { UserSex } from "@metahkg/api";

const SignInScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const { setStorage } = useContext(AuthContext);
  const { colors } = useTheme() as customTheme;
  const { theme } = useContext(ThemeContext);
  const [state, setState] = useState<{
    username: string;
    password: string;
    email: string;
    rtoken: string;
    sex: UserSex | null,
    check_usernameChange: boolean;
    check_emailChange: boolean;
    secureTextEntry: boolean;
  }>({
    username: "",
    password: "",
    email: "",
    rtoken: "",
    sex: null,
    check_usernameChange: false,
    check_emailChange: false,
    secureTextEntry: true,
  });
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const recaptcha = useRef<RecaptchaHandles>(null);

  useEffect(() => {
    if (signup && state.rtoken) {
      setSignup(false);
      setLoading(true);
      const { username, password, email, rtoken, sex } = state;
      if (!sex) return;
      api
        .usersRegister({
          name: username,
          pwd: hash.sha256().update(password).digest("hex"),
          email,
          rtoken,
          sex,
        })
        .then(() => {
          setState({ ...state, rtoken: "" });
          setLoading(false);
          Alert.alert(
            "Verify your email",
            "A email has been sent to your email address for verification. Press ok after you have verified.",
            [
              {
                text: "Cancel",
                onPress: () => Alert.alert("You can sign in after verifying."),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  setLoading(true);
                  api
                    .usersLogin({
                      name: username,
                      pwd: hash.sha256().update(password).digest("hex"),
                    })
                    .then((data) => {
                      setLoading(false);
                      const { token } = data;
                      const decoded = jwtDecode(token) as jwtTokenType;
                      if (decoded) setStorage(token, decoded?.exp, decoded);
                      else
                        Alert.alert(
                          "Error",
                          "Couldn't sign you in. Please try again later."
                        );
                    })
                    .catch(() => {
                      setLoading(false);
                      Alert.alert(
                        "Error",
                        "Couldn't sign you in. Please make sure you are verified and sign in using the sign in page."
                      );
                    });
                },
                style: "default",
              },
            ],
            {
              cancelable: true,
              onDismiss: () => Alert.alert("You can sign in after verifying."),
            }
          );
        })
        .catch((error) => {
          setState({ ...state, rtoken: "" });
          setLoading(false);
          Alert.alert(
            "Error",
            error?.response?.data?.error ||
              error?.response?.data ||
              error ||
              "Something went wrong."
          );
        });
    }
  }, [signup, state.rtoken]);

  const usernameChange = (val: string) => {
    setState({
      ...state,
      username: val,
      check_usernameChange: Boolean(val.match(/^\S{1,15}$/)),
    });
  };

  const emailChange = (val: string) => {
    setState({
      ...state,
      email: val,
      check_emailChange: EmailValidator.validate(val),
    });
  };

  const handlePasswordChange = (val: string) => {
    setState({
      ...state,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setState({
      ...state,
      secureTextEntry: !state.secureTextEntry,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.dark }]}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <View style={styles.header}>
        <MetahkgLogo sx={styles.tinylogo} height={50} width={40} light />
        <Text style={styles.text_header}>Register</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <ScrollView>
          <Text style={[styles.text_footer, { color: colors.text }]}>
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor={colors.grey}
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
              onChangeText={usernameChange}
            />
            {state.check_usernameChange && (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            )}
          </View>

          <Text
            style={[styles.text_footer, styles.mt20, { color: colors.text }]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Email"
              style={[styles.textInput, { color: colors.text }]}
              placeholderTextColor={colors.grey}
              autoCapitalize="none"
              onChangeText={emailChange}
            />
            {state.check_emailChange && (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            )}
          </View>

          <Text
            style={[styles.text_footer, styles.mt20, { color: colors.text }]}
          >
            Sex
          </Text>

          <View>
            <Picker
              selectedValue={state.sex}
              onValueChange={(sex) => setState({ ...state, sex })}
              style={{ color: colors.text }}
            >
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
            </Picker>
          </View>

          <Text
            style={[styles.text_footer, styles.mt20, { color: colors.text }]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor={colors.grey}
              secureTextEntry={state.secureTextEntry ? true : false}
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              <Feather
                name={state.secureTextEntry ? "eye-off" : "eye"}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textPrivacy}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Terms of services
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "normal" }]}
                >
                  {" "}
                  and
                </Text>{" "}
                Privacy policy
              </Text>
              .
            </Text>
          </View>
          <Recaptcha
            ref={recaptcha}
            siteKey={
              process.env.REACT_APP_recaptchasitekey ||
              "6LcX4bceAAAAAIoJGHRxojepKDqqVLdH9_JxHQJ-"
            }
            baseUrl="https://dev.metahkg.org"
            onVerify={(rtoken) => {
              setState({ ...state, rtoken });
            }}
            onExpire={() => {
              setState({ ...state, rtoken: "" });
            }}
            theme={theme}
          />
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator color={colors.yellow} size="large" />
            ) : (
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  const schema = Type.Object({
                    username: Type.RegEx(/^\S{1,15}$/),
                    email: Type.String({ format: "email" }),
                    sex: Type.Union([Type.Literal("M"), Type.Literal("F")]),
                    password: Type.RegEx(/^\S{8,}$/),
                  });
                  if (!ajv.validate(schema, state))
                    return Alert.alert(
                      "Error",
                      `Please check if:
- Username is between 1 and 15 characters and without space
- Email is valid
- You have selected a sex
- Password has at least 8 characters`
                    );
                  if (!state.rtoken) recaptcha.current?.open();
                  setSignup(true);
                }}
              >
                <LinearGradient
                  colors={[colors.yellow, colors.yellow2]}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: colors.yellow,
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
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
