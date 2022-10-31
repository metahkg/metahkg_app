import React, {
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Send } from "./icons";
import { customTheme } from "../constants/default-theme";
import { useTheme } from "@react-navigation/native";
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import { ThemeContext } from "../context/themeSwichContext";
import { api } from "../utils/api";

const CreateComment = (props: {
  postId: number;
  setIsFocused?: React.Dispatch<SetStateAction<boolean>>;
  setReload: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { setIsFocused, postId, setReload } = props;
  const { colors } = useTheme() as customTheme;
  const { theme } = useContext(ThemeContext);
  const textInputRef = useRef<TextInput>(null);
  const [rtoken, setRtoken] = useState("");
  const [comment, setComment] = useState("");
  const [createComment, setCreateComment] = useState(false);
  const recaptcha = useRef<RecaptchaHandles>(null);
  useEffect(() => {
    if (comment && createComment && rtoken) {
      api
        .commentCreate(postId, {
          comment: `<p>${comment}</p>`,
          rtoken,
        })
        .then(() => {
          setComment("");
          setRtoken("");
          setCreateComment(false);
          setReload((reload) => !reload);
        })
        .catch((err) => {
          Alert.alert(
            "Error",
            err.response?.data?.error || err.response?.data || err
          );
          setCreateComment(false);
          setRtoken("");
        });
    }
  }, [createComment, rtoken, comment]);
  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      <Recaptcha
        ref={recaptcha}
        siteKey={
          process.env.REACT_APP_recaptchasitekey ||
          "6LcX4bceAAAAAIoJGHRxojepKDqqVLdH9_JxHQJ-"
        }
        baseUrl="https://dev.metahkg.org"
        onVerify={setRtoken}
        onExpire={() => {
          setRtoken("");
        }}
        theme={theme}
      />
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        ref={textInputRef}
        placeholder="Comment"
        placeholderTextColor={colors.text}
        onFocus={() => {
          setIsFocused && setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused && setIsFocused(false);
        }}
        onChangeText={(comment) => {
          setComment(comment);
          if (!comment && createComment) setCreateComment(false);
        }}
        maxLength={2000}
        autoCorrect={false}
        value={comment}
      />
      <TouchableOpacity
        onPress={() => {
          textInputRef.current?.blur();
          if (!rtoken) recaptcha.current?.open();
          setCreateComment(true);
        }}
        disabled={!comment}
      >
        <Send color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    paddingHorizontal: 5,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    margin: 5,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});

export default CreateComment;
