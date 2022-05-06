// @flow
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { customTheme } from "../../constants/default-theme";

type Props = any;
type State = any;

export function Preview(props: { route: any }) {
  const { colors } = useTheme() as customTheme;
  const css = `<style>
  video {
    max-width: 98%;
    margin-left: auto;
    margin-right:auto; 
    display: block;
  }
  img {
    max-width: 98%;
  }
  table {
    width: 100% !important;
  }
  table td {
    width: inherit;
  }
  table span {
    font-size: 12px !important;
  }
  .x-todo li {
    list-style:none;
  }
  .x-todo-box {
    position: relative;
    left: -24px;
  }
  .x-todo-box input {
    position: absolute;
  }
  hr {
    display: block;
    height: 0;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 15px 0;
    padding: 0;
  }
  pre {
    padding: 10px 5px 10px 10px;
    margin: 15px 0;
    display: block;
    line-height: 18px;
    background: #F0F0F0;
    border-radius: 6px;
    font-size: 13px;
    font-family: 'monaco', 'Consolas', "Liberation Mono", Courier, monospace;
    word-break: break-all;
    word-wrap: break-word;
    overflow-x: auto;
  }
  pre code {
    display: block;
    font-size: inherit;
    white-space: pre-wrap;
    color: inherit;
  }
  .comment-body {
    color: ${colors.text};
  }
  .comment-body * {
      object-fit: contain !important;
      max-width: 100%;
  }
  .comment-body a {
      color: #3498db;
  }
  .comment-body img,
  .comment-body i,
  .comment-body video {
      object-fit: contain !important;
      max-height: 400px;
  }
  .comment-body {
      max-width: 100% !important;
      overflow: hidden !important;
      word-break: break-word;
  }
  .comment-body blockquote {
      color: #aca9a9;
      border-left: 2px solid #aca9a9;
      margin-left: 0;
      padding: 0;
  }
  .comment-body blockquote > div:first-child {
      margin-left: 15px;
  }
  .comment-body > blockquote * {
      color: #aca9a9;
  }
  .comment-body blockquote > .comment-body > *:first-child {
      margin-top: 5px;
  }
  .comment-body blockquote > .comment-body > *:last-child {
      margin-bottom: 5px;
  }      
</style>
`;
  console.log("props receives isssssssssss", props.route.params.html);
  const html = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">${css}</head><body>${props.route.params.html}</body></html>`;
  return (
    <SafeAreaView style={styles.container}>
      {/*<View style={styles.nav}>*/}
      {/*    <Button title={'EDITOR'} onPress={that.onHome} />*/}
      {/*</View>*/}
      <WebView
        useWebKit={true}
        scrollEnabled={false}
        hideKeyboardAccessoryView={true}
        keyboardDisplayRequiresUserAction={false}
        originWhitelist={["*"]}
        dataDetectorTypes={"none"}
        domStorageEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        source={{ html }}
        style={{backgroundColor: colors.bgColor}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
});
