import React, { SetStateAction } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import moment from "moment";

import axios from "../utils/fetcher";
import { AuthContext } from "../context/authContext";

import { ArrowDown, ArrowUp, MessageSquare, Trash } from "./icons/index";
import { authorType, commentType, postType } from "../types/post";
import { customTheme } from "../constants/default-theme";
import { userType } from "../types/user";
import { useCategories } from "../context/contentChangeContext";

const Post = (props: {
  postId: number;
  userId: number;
  score: number;
  title: string;
  author: userType;
  category: number;
  //text: string;
  comments: number;
  created: number;
  //votes: any[];
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<postType | null>>;
  postType?: string;
  deleteButton?: any;
  deletePost?: any;
}) => {
  const {
    postId,
    userId,
    score,
    title,
    author,
    category,
    //text,
    comments,
    created,
    //votes,
    setIsLoading,
    setData,
    deleteButton,
    deletePost,
  } = props;
  const { colors } = useTheme() as customTheme;
  const navigation = useNavigation();
  const { authState } = React.useContext(AuthContext);
  const categories = useCategories();
  const route = useRoute();

  /*const isUpVoted = () => {
    return votes.find((v) => v.user === userId)?.vote === 1;
  };

  const isDownVoted = () => {
    return votes.find((v) => v.user === userId)?.vote === -1;
  };*/

  const upVote = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`post/${postId}/upvote`);
    setData(data);
    setIsLoading(false);
  };

  const downVote = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`post/${postId}/downvote`);
    setData(data);
    setIsLoading(false);
  };

  const unVote = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`post/${postId}/unvote`);
    setData(data);
    setIsLoading(false);
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
              styles.italicFont,
              { color: author.sex === "M" ? colors.blue : colors.red },
            ]}
            onPress={() =>
              navigation.navigate("User", { username: author.name })
            }
          >
            {author?.name} ·{" "}
          </Text>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {moment(created).fromNow()}
            {"  "}
          </Text>
        </View>
        <View style={styles.headerRight}>
          {/*<TouchableOpacity onPress={() => (isUpVoted() ? unVote() : upVote())}>*/}
          {score >= 0 ? (
            <ArrowUp
              width={22}
              height={22}
              strokeWidth={4}
              color={colors.icon}
            />
          ) : (
            <ArrowDown
              width={22}
              height={22}
              strokeWidth={4}
              color={colors.icon}
            />
          )}
          {/*</TouchableOpacity>*/}
          <Text style={[styles.score, { color: colors.text }]}>{score}</Text>

          <Text style={[styles.regularFont, { color: colors.text }]}>
            {"  "}
            {categories.find((c) => c.id === category)?.name}{" "}
          </Text>

          {deleteButton && author?.id === authState.userInfo.id && (
            <TouchableOpacity
              style={styles.trash}
              activeOpacity={0.5}
              onPress={deletePost}
            >
              <Trash color={colors.red} width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text
        style={[styles.title, { color: colors.text }]}
        onPress={() =>
          navigation.navigate("PostDetail", { postId, category, comments })
        }
      >
        {title}
      </Text>
      {/*<Text
        numberOfLines={route.name === "PostDetail" ? 10000 : 10}
        style={[
          styles.regularFont,
          { color: colors.text },
        ]}
        onPress={() =>
            navigation.navigate("PostDetail", { postId, category, comments })
        }
      >
        {text}
      </Text>*/}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.centerAlign}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("PostDetail", { postId, category, comments })
          }
        >
          <MessageSquare
            color={colors.icon}
            style={styles.commentIcon}
            width={20}
            height={20}
            strokeWidth={3}
          />
          <Text style={[styles.commentText, { color: colors.text }]}>
            {comments}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles: any = StyleSheet.create({
  container: {
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

export default Post;
