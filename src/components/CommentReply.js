import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import CreateComment from "./CreateComment";
import NewCreateComment from "./NewCreateComment";

import { Button, Image } from "react-native";
import { Send } from "./icons";
import { Example } from "./TextEditorArea/TextEditor";
import { ThemeContext } from "../context/themeSwichContext";
import { ContentContext } from "../context/contentChangeContext";
import axios from "../utils/fetcher";
// import {RichEditor} from "react-native-pell-rich-editor";
// import {RichEditor} from "react-native-pell-rich-editor";
const Reply = ({ navigation, route }) =>
  // { children, bgColor, title, ...props }
  {
    const { colors } = useTheme();
    const { content, changecontent } = React.useContext(ContentContext);
    const { theme, changeTheme } = React.useContext(ThemeContext);

    console.log(
      "reply called, themes is  ",
      colors,
      "theme is ",
      theme,
      "route,route"
    );
    const createComment = async (comment) => {
      console.log("create comment called");
      const { data } = await axios.post(`/post/${route.params.postId}`, {
        comment,
      });
      console.log("comment created");

      // setPost(data)
      // setComment('')
    };
    const [count, setCount] = React.useState(0);
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              console.log("content is now", content);
              createComment(content);
              // send(content)
              // onPress()
            }}
          >
            <Send color={colors.text} />
          </TouchableOpacity>
          // <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
        ),
      });
    }, [navigation, setCount]);

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
