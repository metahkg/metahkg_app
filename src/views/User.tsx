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

import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeSwichContext";

import { LogOut, Moon, Sun } from "../components/icons";
import Post from "../components/Post";
import PostLoader from "../components/PostLoader";
import { customTheme } from "../constants/default-theme";
import { NavigationProps } from "../types/navigation";
import type { Thread, ThreadMeta, User } from "@metahkg/api";
import { api } from "../utils/api";

const HeaderComponent = (props: { username: string; postCount: number }) => {
  const { username, postCount } = props;
  const { signOut, authState } = React.useContext(AuthContext);
  const { theme, changeTheme } = React.useContext(ThemeContext);
  const { colors } = useTheme() as customTheme;
  const navigation = useNavigation();
  console.log("username", username, "authstate", authState.userInfo?.name);
  return (
    <View style={[styles.userInfo, { backgroundColor: colors.bgColor }]}>
      <View style={styles.infoBox}>
        <Text style={[styles.label, { color: colors.text }]}>Username</Text>
        <Text style={{ color: colors.text }}>
          {username ?? authState.userInfo?.name}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.label, { color: colors.text }]}>Post Count</Text>
        <Text style={{ color: colors.text }}>{postCount}</Text>
      </View>
      {username === authState.userInfo?.name && (
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
              navigation.navigate("Home" as never);
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

const UserThreads = (props: any) => {
  const { route, navigation } = props;
  const { authState } = React.useContext(AuthContext);
  const { colors } = useTheme();
  console.log("ggg", navigation);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userPosts, setuserPosts] = React.useState<ThreadMeta[] | null>(null);

  if (!route.params) {
    if (!authState.userInfo) {
      return <View />;
    }
  }

  const { id, name } = (route.params || authState.userInfo) as User;

  const getUserPostDetail = React.useCallback(async () => {
    setIsLoading(true);
    const data = await api.userThreads(id, "created");
    setuserPosts(data);
    setIsLoading(false);
  }, [authState.userInfo?.name, name]);

  React.useEffect(() => {
    getUserPostDetail();
  }, [getUserPostDetail]);

  /* const deletePost = async (postId: number, index: number) => {
    setIsLoading(true);
    const { status } = await api.delete(`post/${postId}`);
    if (status === 200) {
      setuserPosts((prevData) => {
        prevData?.splice(index, 1);
        return prevData;
      });
    }
    setIsLoading(false);
  };*/

  return (
    <SafeAreaView style={styles.boxCenter}>
      {userPosts ? (
        <FlatList
          data={userPosts}
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
            <HeaderComponent
              username={name || ""}
              postCount={userPosts.length}
            />
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponentStyle={styles.headerComponentStyle}
          renderItem={({ item, index }) => (
            <Post
              postId={item.id}
              score={item.score}
              title={item.title}
              author={item.op}
              category={item.category}
              comments={item.count}
              created={item.createdAt}
              // TODO: originally this was setUserPosts, but it was as array thus incompatible with postType
              deleteButton={true}
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

export default UserThreads;
