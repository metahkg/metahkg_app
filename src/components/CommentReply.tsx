import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Send } from "./icons";
import { Example } from "./TextEditorArea/TextEditor";
import { ThemeContext } from "../context/themeSwichContext";
import { ContentContext } from "../context/contentChangeContext";
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import axios, { api } from "../utils/fetcher";
// import Tinymce from "./Tinymce";
// import {RichEditor} from "react-native-pell-rich-editor";
// import {RichEditor} from "react-native-pell-rich-editor";
const Reply = (props: { navigation: any; route: any }) =>
  // { children, bgColor, title, ...props }
  {
    const { navigation, route } = props;
    const { colors } = useTheme();
    const { content, changecontent } = React.useContext(ContentContext);
    const { theme, changeTheme } = React.useContext(ThemeContext);
    const recaptcha = useRef<RecaptchaHandles>(null);
    const [rtoken, setRtoken] = useState("");

    console.log(
      "reply called, themes is  ",
      colors,
      "theme is ",
      theme,
      "route,route"
    );
    const createComment = (comment: any) => {
      console.log("create comment called");
      api
        .post(`/posts/comment`, {
          comment,
          rtoken,
          id: route.params.postId,
        })
        .then(() => {
          console.log("comment created");
        });

      // setPost(data)
      // setComment('')
    };
    const [count, setCount] = React.useState(0);
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
            <TouchableOpacity
              onPress={() => {
                console.log("content is now", content);
                console.log(!rtoken);
                if (!rtoken) {
                  recaptcha.current?.open();
                  return;
                }
                createComment(content);
                console.log("creating comment");
                // send(content)
                // onPress()
              }}
            >
              <Send color={colors.text} />
            </TouchableOpacity>
          </React.Fragment>
          // <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
        ),
      });
    }, [navigation, setCount, rtoken]);

    return (
      // <TouchableOpacity
      //     {...props}
      //     style={[styles.button, { backgroundColor: bgColor }]}
      //     activeOpacity={0.8}
      // >
      <>
        <View
          style={{
            // backgroundColor: '#00B8D4',
            width: 250,
            height: 80,
            borderLeftColor: colors.text,
            borderLeftWidth: 5,
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text style={[{ color: colors.text }]}>
            {" "}
            Text With Only Right Border{" "}
          </Text>
        </View>
        {/*<Tinymce />*/}
        <Example theme={theme} navigation={navigation} />
        {/*<TextEditor/>*/}

        {/*<RichEditor*/}
        {/*    ref={(r) => this.richtext = r}*/}
        {/*    initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}*/}
        {/*    editorInitializedCallback={() => this.onEditorInitialized()}*/}
        {/*/>*/}
      </>

      // </TouchableOpacity>
    );
  };

export default Reply;
