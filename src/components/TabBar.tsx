import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { AuthContext } from "../context/authContext";
import { Home, PlusSquare, User, Setting } from "./icons/index";
import { customTheme } from "../constants/default-theme";

function TabBar(props: {
  state: {
    index: number;
    routes: { key?: React.Key; name: string }[];
  };
  descriptors: {
    [index: React.Key]: {
      options: { tabBarIcon?: any; tabBarLabel?: string; title?: string };
    };
  };
  navigation: any;
}) {
  const { authState } = React.useContext(AuthContext);
  const { colors } = useTheme() as customTheme;
  const { state, descriptors, navigation } = props;
  return (
    <View
      style={[
        styles.tabBarContainer,
        { backgroundColor: colors.bgColor, borderColor: colors.border },
      ]}
    >
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key || ""];
        const label =
          (options.tabBarLabel && options.tabBarLabel) ||
          (options.title && options.title) ||
          route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (authState.token) {
              navigation.navigate(route.name, {
                username: authState.userInfo.username,
              });
            } else {
              navigation.navigate("SignModal");
            }
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.button}
          >
            {label === "Home" && (
              <Home color={isFocused ? colors.blue : colors.text} />
            )}
            {label === "CreatePost" && (
              <PlusSquare color={isFocused ? colors.blue : colors.text} />
            )}
            {label === "User" && (
              <User color={isFocused ? colors.blue : colors.text} />
            )}
            {label === "Setting" && (
              <Setting color={isFocused ? colors.blue : colors.text} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
});

export default TabBar;
