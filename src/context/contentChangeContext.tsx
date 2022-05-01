import React, { useContext, useEffect } from "react";
import { categoryType } from "../types/category";
import { api } from "../utils/fetcher";
// import AsyncStorage from '@react-native-community/async-storage'
// import AsyncStorage from '@react-native-async-storage/async-storage'
const ContentContext = React.createContext<{
  content: string;
  changecontent: (value: string) => void;
  categories: categoryType[];
}>({ content: "", changecontent: () => {}, categories: [] });

const { Provider } = ContentContext;

const ContentProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;
  const [content, setcontent] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    api
      .get("/category/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // React.useEffect(() => {
  //     const bootstrapAsync = async () => {
  //         try {
  //             const content = await AsyncStorage.getItem('content')
  //             if (content) {
  //                 setcontent(content)
  //             }
  //         } catch (error) {
  //             console.log(error)
  //         }
  //     }
  //
  //     bootstrapAsync()
  // }, [])

  const changecontent = async (value: string) => {
    console.log("content set in context ");
    setcontent(value);
    console.log("content len ", content.length);
    // try {
    //     await AsyncStorage.setItem('content', value)
    // } catch (error) {
    //     console.log(error)
    // }
  };
  return (
    <Provider value={{ content, changecontent, categories }}>
      {children}
    </Provider>
  );
};

export { ContentProvider, ContentContext };

export function useCategories() {
  const { categories } = useContext(ContentContext);
  return categories;
}
