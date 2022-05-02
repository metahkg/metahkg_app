import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

import moment from "moment";

import { ArrowDown, ArrowUp, MessageSquare } from "./icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios, { api } from "../utils/fetcher";
import { WebView } from "react-native-webview";
import { customTheme } from "../constants/default-theme";
import { commentType, postType, voteType } from "../types/post";

const CommentListItem = (props: {
  index: number;
  userVotes: { [id: number]: voteType };
  comment: commentType;
  postId: number;
}) => {
  const { index, comment, userVotes, postId } = props;
  const { colors } = useTheme() as customTheme;
  const [score, setscore] = useState(comment.U || 0 - comment.D || 0);

  const [isUpVoted, setisUpVoted] = useState(userVotes?.[comment.id] === "U");
  const [isDownVoted, setisDownVoted] = useState(
    userVotes?.[comment.id] === "D"
  );
  const navigation = useNavigation();

  let commentId = comment.id;

  const css = `<style>
        video {max-width: 98%;margin-left:auto;margin-right:auto;display: block;}
        img {max-width: 98%;vertical-align: middle;}
        table {width: 100% !important;}
        table td {width: inherit;}
        table span { font-size: 12px !important; }
        .x-todo li {list-style:none;}
        .x-todo-box {position: relative; left: -24px;}
        .x-todo-box input{position: absolute;}
        blockquote{border-left: 6px solid #ddd;padding: 5px 0 5px 10px;margin: 15px 0 15px 15px;}
        hr{display: block;height: 0; border: 0;border-top: 1px solid #ccc; margin: 15px 0; padding: 0;}
        pre{padding: 10px 5px 10px 10px;margin: 15px 0;display: block;line-height: 18px;background: #F0F0F0;border-
radius: 6px;font-size: 13px; font-family: 'monaco', 'Consolas', "Liberation Mono", Courier, monospace; word-break:
break-all; word-wrap: break-word;overflow-x: auto;}
        pre code {display: block;font-size: inherit;white-space: pre-wrap;color: inherit;}
    </style>
`;
  let html = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">${css}</head><body>${comment.comment}</body></html>`;

  const sendVote = (vote: "U" | "D") => {
    api
      .post(`/posts/vote`, {
        id: postId,
        cid: commentId,
        vote,
      })
      .then(() => {
        const newscore = score + 1;
        setscore(newscore);
        setisUpVoted(true);
      })
      .catch((err) => {
        Alert.alert(
          "Error",
          err.response.data?.error || err.response.data || ""
        );
      });
  };
  const upVote = () => {
    sendVote("U");
  };

  const downVote = () => {
    sendVote("D");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.bgColor, borderColor: colors.postBorder },
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {"#"}
            {comment.id}{" "}
          </Text>
          <Text
            style={[styles.italicFont, { color: colors.blue }]}
            onPress={() =>
              navigation.navigate("User", { username: comment.user?.name })
            }
          >
            {comment.user?.name}
          </Text>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {" "}
            · {moment(comment.createdAt).fromNow()}
            {"  "}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={upVote}
            disabled={isUpVoted || isDownVoted}
          >
            <ArrowUp
              width={22}
              height={22}
              strokeWidth={4}
              color={isUpVoted ? colors.green : colors.icon}
            />
          </TouchableOpacity>
          <Text style={[styles.score, { color: colors.text }]}>{score}</Text>

          <View style={styles.centerAlign}>
            <TouchableOpacity
              onPress={downVote}
              disabled={isUpVoted || isDownVoted}
            >
              <ArrowDown
                width={22}
                height={22}
                strokeWidth={4}
                color={isDownVoted ? colors.red : colors.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ height: 200 }}>
        <WebView
          // useWebKit={true}
          scrollEnabled={true}
          // hideKeyboardAccessoryView={true}
          // keyboardDisplayRequiresUserAction={false}
          // originWhitelist={['*']}
          // dataDetectorTypes={'none'}
          // domStorageEnabled={false}
          // bounces={false}
          // javaScriptEnabled={true}
          source={{ html }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.centerAlign}
          activeOpacity={0.7}
          // onPress={() => navigation.navigate('PostDetail', {postId, category, comments})}
        >
          <MessageSquare
            color={colors.icon}
            style={styles.commentIcon}
            width={20}
            height={20}
            strokeWidth={3}
          />
          {/*<Text style={[styles.commentText, { color: colors.text }]}>
            {comments?.length}
          </Text>*/}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CommentReply", {
              postId: postId,
              commentId: commentId,
            })
          }
        >
          <Text style={[styles.italicFont, { color: colors.text }]}>
            {"reply"}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 7,
    elevation: 1,
    borderWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
    fontSize: 13,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 12
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  centerAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    fontFamily: "OpenSans-Bold",
  },
  score: {
    marginHorizontal: 5,
    fontFamily: "OpenSans-SemiBold",
  },
  commentIcon: {
    marginBottom: -3,
  },
  commentText: {
    marginLeft: 3,
    fontFamily: "OpenSans-SemiBold",
  },
  regularFont: {
    fontFamily: "OpenSans-Regular",
  },
  italicFont: {
    fontFamily: "OpenSans-Italic",
  },
  dateText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
  },
  link: {
    color: "#0064bd",
    fontWeight: "bold",
  },
});

export default CommentListItem;
