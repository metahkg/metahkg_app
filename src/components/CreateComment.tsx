import React, { SetStateAction, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { Send } from "./icons";
import customDefaultTheme from "../constants/default-theme";

const CreateComment = (props: {
  onPress: () => void;
  setComment: () => void;
  comment: string; 
  setIsFocused?: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const {onPress, setComment, comment, setIsFocused} = props;
  const { colors } = customDefaultTheme;
  const textInputRef = useRef<TextInput>(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.bgColor }]}>
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
        placeholder="内文"
        placeholderTextColor={colors.text}
        onFocus={() => { setIsFocused && setIsFocused(true)}}
        onBlur={() => {setIsFocused && setIsFocused(false)}}
        onChangeText={(setComment)}
        maxLength={2000}
        autoCorrect={false}
        value={comment}
      />
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          textInputRef.current.blur();

          onPress();
        }}
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
