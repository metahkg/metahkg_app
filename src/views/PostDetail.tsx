import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, View } from "react-native";

import axios from "../utils/fetcher";
import { AuthContext } from "../context/authContext";

import Post from "../components/Post";
import CommentListItem from "../components/CommentListItem";
import CreateComment from "../components/CreateComment";
import CommentLoader from "../components/CommentLoader";
import PostLoader from "../components/PostLoader";
import { postType } from "../types/post";

const PostDetail = (props: { route: any; navigation: any }) => {
  const { route, navigation } = props;
  const { authState } = React.useContext(AuthContext);
  const flatListRef = React.useRef<FlatList>(null);

  const [post, setPost] = React.useState<null | postType>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(null);

  const { postId } = route.params;
  const { comments } = route.params;

  const getPostData = React.useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.get(`post/${postId}`);
    setPost(data);
    // console.log("the postsssss are ", data)
    setIsLoading(false);
  }, [postId]);

  React.useEffect(() => {
    getPostData();
  }, [getPostData]);

  React.useEffect(() => {
    isFocused &&
      flatListRef.current &&
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }, [isFocused]);

  const createComment = async () => {
    const { data } = await axios.post(`/post/${postId}`, {
      comment,
    });
    setPost(data);
    setComment("");
  };

  const deleteComment = async (commentId: any) => {
    setIsLoading(true);
    const { data } = await axios.delete(`/post/${postId}/${commentId}`);
    setPost(data);
    setIsLoading(false);
  };

  const deletePost = async (postId: any) => {
    setIsLoading(true);
    const { status } = await axios.delete(`post/${postId}`);
    if (status === 200) {
      navigation.push("Home");
    }
    setIsLoading(false);
  };

  return (
    <View as={SafeAreaView} style={styles.container}>
      {post ? (
        <>
          <FlatList
            ref={flatListRef}
            data={post.comments.sort(
              (a: { created: number }, b: { created: number }) =>
                a.created - b.created
            )}
            refreshing={isLoading}
            onRefresh={() => getPostData()}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Post
                postId={post.id}
                userId={authState.userInfo.id}
                score={post.score}
                type={post.type}
                title={post.title}
                author={post.author}
                category={post.category}
                text={post.text}
                comments={post.comments}
                created={post.created}
                url={post.url}
                votes={post.votes}
                views={post.views}
                setIsLoading={setIsLoading}
                setData={setPost}
                postType="item"
                deleteButton={true}
                deletePost={() => deletePost(post.id)}
              />
            }
            ListHeaderComponentStyle={styles.headerComponentStyle}
            renderItem={({ item, index }) => (
              <CommentListItem
                index={index}
                wholeitem={item}
                body={item.body}
                author={item.author}
                created={item.created}
                deleteComment={() => deleteComment(item.id)}
                userId={authState.userInfo.id}
                postId={postId}
              />
            )}
          />
          {authState.token && (
            <CreateComment
              onPress={createComment}
              setComment={setComment}
              setIsFocused={setIsFocused}
              comment={comment}
            />
          )}
        </>
      ) : (
        <>
          <PostLoader />
          {comments.map((i: { id: React.Key | null | undefined }) => (
            <CommentLoader key={i.id} />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerComponentStyle: {
    marginVertical: 7,
  },
});

export default PostDetail;