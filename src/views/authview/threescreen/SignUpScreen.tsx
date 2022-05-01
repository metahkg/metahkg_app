import React, { useRef } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios, { api } from "../../../utils/fetcher";
import { AuthContext } from "../../../context/authContext";
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import jwtDecode from "jwt-decode";
import { jwtTokenType } from "../../../types/user";
import RNPickerSelect from "react-native-picker-select";
import hash from "hash.js";
import MetahkgLogo from "../../../components/Metahkglogo";
import EmailValidator from "email-validator";

const SignInScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const { setStorage } = React.useContext(AuthContext);
  const [state, setState] = React.useState({
    username: "",
    password: "",
    email: "",
    rtoken: "",
    sex: "",
    confirm_password: "",
    check_usernameChange: false,
    check_emailChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const recaptcha = useRef<RecaptchaHandles>(null);

  const usernameChange = (val: string) => {
    if (val.match(/^\S{1,15}$/)) {
      setState({
        ...state,
        username: val,
        check_usernameChange: true,
      });
    } else {
      setState({
        ...state,
        username: val,
        check_usernameChange: false,
      });
    }
  };

  const emailChange = (val: string) => {
    if (EmailValidator.validate(val)) {
      setState({
        ...state,
        email: val,
        check_emailChange: true,
      });
    } else {
      setState({
        ...state,
        email: val,
        check_emailChange: false,
      });
    }
  };

  const handlePasswordChange = (val: string) => {
    setState({
      ...state,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val: string) => {
    setState({
      ...state,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setState({
      ...state,
      secureTextEntry: !state.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setState({
      ...state,
      confirm_secureTextEntry: !state.confirm_secureTextEntry,
    });
  };

  const signupHandler = async () => {
    const { username, password, email, rtoken, sex } = state;
    const values = {
      name: username,
      pwd: hash.sha256().update(password).digest("hex"),
      email,
      rtoken,
      sex,
    };
    console.log(values);
    try {
      await api.post("/users/register", values);
      setState({ ...state, rtoken: "" });
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
              api
                .post("/users/signin", {
                  name: username,
                  pwd: hash.sha256().update(password).digest("hex"),
                })
                .then((res) => {
                  const { token } = res.data;
                  console.log(token);
                  const decoded = jwtDecode(token) as jwtTokenType;
                  console.log(decoded);
                  const expiresAt = decoded?.exp;
                  const userInfo = decoded;
                  setStorage(token, expiresAt, userInfo);
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
      //const { token } = data;
      //const decoded = jwtDecode(token) as jwtTokenType;
      //const expiresAt = decoded?.exp;
      //const userInfo = decoded;
      //setStorage(token, expiresAt, userInfo);
      // navigation.navigate('Home')
      // resetForm({})
    } catch (error: any) {
      setState({ ...state, rtoken: "" });
      Alert.alert(
        error?.response?.data?.error ||
          error?.response?.data ||
          error ||
          "Something went wrong."
      );
      // setStatus(error.response.data.message)
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <MetahkgLogo sx={styles.tinylogo} height={50} width={40} light />
        <Text style={styles.text_header}>Register</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={usernameChange}
            />
            {state.check_usernameChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, styles.mt20]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={emailChange}
            />
            {state.check_emailChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="#ffc100" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, styles.mt20]}>Sex</Text>
          <RNPickerSelect
            onValueChange={(value) => setState({ ...state, sex: value })}
            items={[
              { label: "Male", value: "M" },
              { label: "Female", value: "F" },
            ]}
            value={state.sex}
          />

          <Text style={[styles.text_footer, styles.mt20]}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={state.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {state.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.text_footer, styles.mt20]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={state.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={handleConfirmPasswordChange}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {state.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivacy}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
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
              console.log("recaptcha token expired");
              setState({ ...state, rtoken: "" });
            }}
            onClose={() => {
              console.log("closing recaptcha");
            }}
            onError={(err) => {
              console.log(err);
            }}
            onLoad={() => {
              console.log("recaptcha loaded");
            }}
            size="normal"
            //theme="dark"
          />
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                if (!state.rtoken) {
                  recaptcha.current?.open();
                  return;
                }
                signupHandler();
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
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                    color: "#f5bd1f",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  header: {
    flex: 1,
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    flexDirection: "row"
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#f5bd1f",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivacy: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  tinylogo: {
    width: 40,
    height: 50,
  },
  mt20: {
    marginTop: 20,
  },
});
