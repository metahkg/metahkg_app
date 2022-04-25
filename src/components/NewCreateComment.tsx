import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { customTheme } from "../constants/default-theme";
import EmojiSelector from 'react-native-emoji-selector'
const CreateComment = (props: {
  onPress: any;
  setComment: any;
  comment: any;
  setIsFocused: any;
}) => {
  const { colors } = useTheme() as customTheme;
  //const textInputRef = React.useRef();

  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
      {/*<TextInput*/}
      {/*    style={[*/}
      {/*        styles.textInput,*/}
      {/*        {backgroundColor: colors.background, borderColor: colors.border, color: colors.text}*/}
      {/*    ]}*/}
      {/*    ref={textInputRef}*/}
      {/*    placeholder="内文"*/}
      {/*    placeholderTextColor={colors.text}*/}

      {/*    onFocus={setIsFocused?() => setIsFocused(true):null}*/}
      {/*    onBlur={setIsFocused?() => setIsFocused(false):null}*/}

      {/*    onChangeText={setComment}*/}
      {/*    maxLength={2000}*/}
      {/*    autoCorrect={false}*/}
      {/*    value={comment}*/}
      {/*/>*/}
      <EmojiSelector onEmojiSelected={(emoji: any) => console.log(emoji)} />
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
