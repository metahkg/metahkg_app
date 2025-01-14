import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";

import { ArrowDown, ArrowUp, MessageSquare } from "./icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../utils/api";
import AutoHeightWebView from "react-native-autoheight-webview";
import { customTheme } from "../constants/default-theme";
import { commentType, threadType, voteType } from "../types/post";
import { ThemeContext } from "../context/themeSwichContext";
import { Comment, Thread, Vote } from "@metahkg/api";

const CommentListItem = (props: {
  userVotes: {
    cid: number;
    vote: Vote;
  }[];
  comment: Comment;
  thread: Thread;
}) => {
  const { comment, userVotes, thread } = props;
  const { colors } = useTheme() as customTheme;
  const { theme } = useContext(ThemeContext);
  const [upVotes, setUpVotes] = useState(comment.U || 0);
  const [downVotes, setDownVotes] = useState(comment.D || 0);
  const [isUpVoted, setisUpVoted] = useState(
    userVotes?.find((item) => item.cid === comment.id)?.vote === "U"
  );
  const [isDownVoted, setisDownVoted] = useState(
    userVotes?.find((item) => item.cid === comment.id)?.vote === "D"
  );
  const navigation = useNavigation();

  const commentId = comment.id;

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
  const html = `<html>
  <head>
    <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
    ${css}
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism${
        theme === "dark" ? "-tomorrow" : ""
      }.min.css"
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <body class="comment-body">
    ${comment.comment}
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-core.min.js"
      integrity="sha512-9khQRAUBYEJDCDVP2yw3LRUQvjJ0Pjx0EShmaQjcHa6AXiOv6qHQu9lCAIR8O+/D8FtaCoJ2c0Tf9Xo7hYH01Q=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/plugins/autoloader/prism-autoloader.min.js"
      integrity="sha512-fTl/qcO1VgvKtOMApX2PdZzkziyr2stM65GYPLGuYMnuMm1z2JLJG6XVU7C/mR+E7xBUqCivykuhlzfqxXBXbg=="
      crossorigin="anonymous" 
      referrerpolicy="no-referrer"
    ></script>
  </body>
</html>`;

  const vote = (vote: "U" | "D") => {
    api
      .commentVote({ vote }, thread.id, commentId)
      .then(() => {
        if (vote === "U") {
          setisUpVoted(true);
          setUpVotes(upVotes + 1);
        } else {
          setisDownVoted(true);
          setDownVotes(downVotes + 1);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Error",
          err.response.data?.error || err.response.data || ""
        );
      });
  };
  const upVote = () => {
    vote("U");
  };

  const downVote = () => {
    vote("D");
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
          <Text
            style={[
              styles.dateText,
              {
                color:
                  comment.user.id === thread.op.id
                    ? colors.yellow
                    : colors.text,
              },
            ]}
          >
            {"#"}
            {comment.id}{" "}
          </Text>
          <Text
            style={[
              styles.italicFont,
              { color: comment.user.sex === "M" ? colors.blue : colors.red },
            ]}
            onPress={() =>
              navigation.navigate("User" as never, { name: comment.user?.name, id: comment.user?.id } as never)
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
          <Text style={[styles.score, { color: colors.text }]}>{upVotes}</Text>

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
            <Text style={[styles.score, { color: colors.text }]}>
              {downVotes}
            </Text>
          </View>
        </View>
      </View>

      <AutoHeightWebView
        // useWebKit={true}
        scrollEnabled={true}
        // hideKeyboardAccessoryView={true}
        // keyboardDisplayRequiresUserAction={false}
        // originWhitelist={['*']}
        // dataDetectorTypes={'none'}
        // domStorageEnabled={false}
        // bounces={false}
        // javaScriptEnabled={true}
        style={{
          backgroundColor: colors.bgColor,
        }}
        source={{ html }}
      />

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
            navigation.navigate("CommentReply" as never, {
              postId: thread.id,
              commentId: commentId,
            } as never)
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
    paddingHorizontal: 10,
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
