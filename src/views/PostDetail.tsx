import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";

import { api } from "../utils/fetcher";
import { AuthContext } from "../context/authContext";
import CommentListItem from "../components/CommentListItem";
import CreateComment from "../components/CreateComment";
import CommentLoader from "../components/CommentLoader";
import { commentType, threadType, voteType } from "../types/post";

const PostDetail = (props: { route: any; navigation: any }) => {
  const { route } = props;
  const { authState } = useContext(AuthContext);
  const flatListRef = useRef<FlatList>(null);

  const [thread, setThread] = useState<null | threadType>(null);
  const [userVotes, setUserVotes] = useState<null | { [id: number]: voteType }>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { postId } = route.params;

  const getPostData = useCallback(async () => {
    setIsLoading(true);
    const { data } = await api.get(`/posts/thread/${postId}`);
    setThread(data);
    setIsLoading(false);
  }, [postId]);

  useEffect(() => {
    setIsLoading(true);
    let done = false;
    api.get(`/posts/thread/${postId}`).then((res) => {
      setThread(res.data);
      done && setIsLoading(false);
      done = true;
    });
    api.get(`/posts/uservotes/${postId}`).then((res) => {
      setUserVotes(res.data);
      done && setIsLoading(false);
      done = true;
    });
  }, [getPostData, postId]);

  useEffect(() => {
    isFocused &&
      flatListRef.current &&
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }, [isFocused]);

  const createComment = async () => {
    const { data } = await api.post(`/post/${postId}`, {
      comment,
    });
    setThread(data);
    setComment("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {thread && userVotes ? (
        <React.Fragment>
          <FlatList
            ref={flatListRef}
            data={thread.conversation}
            refreshing={isLoading}
            onRefresh={() => getPostData()}
            keyExtractor={(item) => String(item.id)}
            ListHeaderComponentStyle={styles.headerComponentStyle}
            renderItem={(props: { item: commentType }) => {
              const { item: comment } = props;
              return (
                <CommentListItem
                  thread={thread}
                  comment={comment}
                  userVotes={userVotes}
                />
              );
            }}
          />
          {authState.token && (
            <CreateComment
              onPress={createComment}
              setComment={setComment}
              setIsFocused={setIsFocused}
              comment={comment}
            />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {[...Array(10)].map((i, index) => (
            <CommentLoader key={index} />
          ))}
        </React.Fragment>
      )}
    </SafeAreaView>
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
