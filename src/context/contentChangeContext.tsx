import React from "react";
// import AsyncStorage from '@react-native-community/async-storage'
// import AsyncStorage from '@react-native-async-storage/async-storage'
const ContentContext = React.createContext<any>(null);
const { Provider } = ContentContext;

const ContentProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;
  const [content, setcontent] = React.useState("");

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
  return <Provider value={{ content, changecontent }}>{children}</Provider>;
};

export { ContentProvider, ContentContext };
