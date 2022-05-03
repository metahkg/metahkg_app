import React, { useContext, useEffect } from "react";
import { categoryType } from "../types/category";
import { api } from "../utils/fetcher";

const ContentContext = React.createContext<{
  categories: categoryType[];
}>({ categories: [] });

const { Provider } = ContentContext;

const ContentProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;
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

  return <Provider value={{ categories }}>{children}</Provider>;
};

export { ContentProvider, ContentContext as ContentContext };

export function useCategories() {
  const { categories } = useContext(ContentContext);
  return categories;
}
