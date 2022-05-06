import React, { useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Send } from "./icons";
import { TextEditor } from "./TextEditorArea/TextEditor";
import { ThemeContext } from "../context/themeSwichContext";
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import { api } from "../utils/fetcher";

const CommentReply = (props: { navigation: any; route: any }) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const [comment, setComment] = useState("");
  const { theme } = React.useContext(ThemeContext);
  const recaptcha = useRef<RecaptchaHandles>(null);
  const [rtoken, setRtoken] = useState("");
  const [createComment, setCreateComment] = useState(false);
  useEffect(() => {
    if (createComment && rtoken) {
      api
        .post(`/posts/comment`, {
          comment,
          rtoken,
          id: route.params.postId,
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => {
          Alert.alert(
            "Error",
            err.response.data?.error ||
              err.response.data ||
              "Something went wrong. Please try again later."
          );
          setCreateComment(false);
          setRtoken("");
        });
    }
  }, [createComment, rtoken]);
  const onVerify = (token: string) => {
    setRtoken(token);
    console.log(token);
  };
  const onExpire = () => {
    setRtoken("");
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <React.Fragment>
          <Recaptcha
            ref={recaptcha}
            siteKey={
              process.env.REACT_APP_recaptchasitekey ||
              "6LcX4bceAAAAAIoJGHRxojepKDqqVLdH9_JxHQJ-"
            }
            baseUrl="https://dev.metahkg.org"
            onVerify={onVerify}
            onExpire={onExpire}
            theme={theme}
          />
          <TouchableOpacity
            onPress={() => {
              if (!rtoken) recaptcha.current?.open();
              setCreateComment(true);
            }}
          >
            <Send color={colors.text} />
          </TouchableOpacity>
        </React.Fragment>
      ),
    });
  }, [navigation, rtoken]);

  return (
    <React.Fragment>
      <TextEditor
        navigation={navigation}
        onChange={(comment) => {
          setComment(comment);
        }}
      />
    </React.Fragment>
  );
};

export default CommentReply;
