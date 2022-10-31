import React, { useEffect } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

import { api } from "../utils/api";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeSwichContext";

import CategoryPicker from "../components/CategoryPicker";
import Post from "../components/Post";
import PostLoader from "../components/PostLoader";
import CategoryLoader from "../components/CategoryLoader";
import { customTheme } from "../constants/default-theme";
import { ThreadMeta } from "@metahkg/api";

const Home = () => {
  const { authState } = React.useContext(AuthContext);
  const { theme } = React.useContext(ThemeContext);
  const { colors } = useTheme() as customTheme;

  const [postData, setPostData] = React.useState<ThreadMeta[] | null>(null);
  const [category, setCategory] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const getPostData = React.useCallback(async () => {
    setIsLoading(true);
    const data = await api.categoryThreads(Number(category) || 1)
    setPostData(data);
    setIsLoading(false);
  }, [category]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={colors.background}
      />
      {postData ? (
        <FlatList
          /*@ts-ignore*/
          data={postData}
          extraData={isLoading}
          refreshing={isLoading}
          onRefresh={() => getPostData()}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={
            <CategoryPicker selectedCategory={category} onClick={setCategory} />
          }
          ListHeaderComponentStyle={[
            styles.categoryPicker,
            { backgroundColor: colors.bgColor },
          ]}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.text }]}>
              Not posts found!
            </Text>
          }
          renderItem={({ item }) => (
            <Post
              postId={item.id}
              score={item.score}
              title={item.title}
              author={item.op}
              category={item.category}
              comments={item.count}
              created={item.lastModified}
              deleteButton={false}
            />
          )}
        />
      ) : (
        <>
          <CategoryLoader />
          {[1, 2, 3, 4, 5].map((i) => (
            <PostLoader key={i} />
          ))}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryPicker: {
    padding: 5,
    marginVertical: 7,
    elevation: 3,
  },
  empty: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    fontSize: 22,
  },
});

export default Home;
