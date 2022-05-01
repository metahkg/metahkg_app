import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";

import axios from "../utils/fetcher";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeSwichContext";

import { LogOut, Moon, Sun } from "../components/icons";
import Post from "../components/Post";
import PostLoader from "../components/PostLoader";
import { customTheme } from "../constants/default-theme";
import { postType } from "../types/post";

const HeaderComponent = (props: { username: string; postCount: number }) => {
  const { username, postCount } = props;
  const { signOut, authState } = React.useContext(AuthContext);
  const { theme, changeTheme } = React.useContext(ThemeContext);
  const { colors } = useTheme() as customTheme;
  const navigation = useNavigation();
  console.log("username", username, "authstate", authState.userInfo.username);
  return (
    <View style={[styles.userInfo, { backgroundColor: colors.bgColor }]}>
      <View style={styles.infoBox}>
        <Text style={[styles.label, { color: colors.text }]}>Username</Text>
        <Text style={{ color: colors.text }}>
          {username ?? authState.userInfo.username}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.label, { color: colors.text }]}>Post Count</Text>
        <Text style={{ color: colors.text }}>{postCount}</Text>
      </View>
      {username === authState.userInfo.username && (
        <>
          <View style={[styles.line, { borderColor: colors.border }]} />
          <TouchableOpacity
            onPress={() => changeTheme(theme === "light" ? "dark" : "light")}
            style={styles.infoBox}
          >
            {theme === "light" ? (
              <Moon color={colors.icon} />
            ) : (
              <Sun color={colors.icon} />
            )}
            <Text style={{ color: colors.text }}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => {
              signOut();
              navigation.navigate("Home");
            }}
          >
            <LogOut color={colors.red} />
            <Text style={{ color: colors.red }}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const User = (props: { route: any, otherProps: any[] }) => {
  const { route, otherProps } = props;
  const { authState } = React.useContext(AuthContext);
  const { colors } = useTheme();
  console.log("ggg", otherProps);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userPosts, setuserPosts] = React.useState<postType[] | null>(null);

  const username = route.params?.username;

  const getUserPostDetail = React.useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `user/${username || authState.userInfo.username}`
    );
    setuserPosts(data);
    setIsLoading(false);
  }, [authState.userInfo.username, username]);

  React.useEffect(() => {
    getUserPostDetail();
  }, [getUserPostDetail]);

  const deletePost = async (postId: number, index: number) => {
    setIsLoading(true);
    const { status } = await axios.delete(`post/${postId}`);
    if (status === 200) {
      setuserPosts((prevData) => {
        prevData?.splice(index, 1);
        return prevData;
      });
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.boxCenter}>
      {userPosts ? (
        <FlatList
          data={userPosts.sort((a, b) => a.created - b.created)}
          extraData={isLoading}
          refreshing={isLoading}
          onRefresh={() => getUserPostDetail()}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.text }]}>
              Ups! Not found any post!
            </Text>
          }
          ListHeaderComponent={
            <HeaderComponent username={username} postCount={userPosts.length} />
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponentStyle={styles.headerComponentStyle}
          renderItem={({ item, index }) => (
            <Post
              postId={item.id}
              userId={authState.userInfo.id}
              score={item.score}
              type={item.type}
              title={item.title}
              author={item.author}
              category={item.category}
              text={item.text}
              comments={item.comments}
              created={item.created}
              url={item.url}
              votes={item.votes}
              views={item.views}
              setIsLoading={setIsLoading}
              // TODO: originally this was setUserPosts, but it was as array thus incompatible with postType
              setData={item.setData}
              deleteButton={true}
              deletePost={() => deletePost(item.id, index)}
            />
          )}
        />
      ) : (
        <>
          {[1, 2, 3, 4, 5].map((i) => (
            <PostLoader key={i} />
          ))}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: "red",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 5,
    elevation: 3,
  },
  infoBox: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  headerComponentStyle: {
    marginBottom: 7,
    elevation: 3,
  },
  empty: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    fontSize: 22,
  },
  line: {
    borderLeftWidth: 1,
    height: "100%",
  },
});

export default User;