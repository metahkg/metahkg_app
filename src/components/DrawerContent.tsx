import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../context/themeSwichContext";
import {
  Avatar,
  Caption,
  Drawer,
  Switch,
  Text,
  Title,
} from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/authContext";
import { customTheme } from "../constants/default-theme";

export function DrawerContent(props: { navigation: any }) {
  const { signOut, authState } = React.useContext(AuthContext);
  const { theme, changeTheme } = React.useContext(ThemeContext);
  const { colors } = useTheme() as customTheme;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <Avatar.Image
                source={{
                  uri: `https://dev.metahkg.org/api/avatars/${authState.userInfo?.id}`,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={[styles.title, { color: colors.text }]}>
                  {authState.userInfo?.name}
                </Title>
                <Caption style={[styles.caption, { color: colors.text }]}>
                  #{authState.userInfo?.id}
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="pencil-outline" color={color} size={size} />
              )}
              label="Create post"
              onPress={() => {
                props.navigation.navigate("CreatePost");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("User");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Setting");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <View style={styles.preference}>
              <Text
                onPressIn={() => {}}
                onPressOut={() => {}}
                style={[styles.title, { color: colors.text }]}
              >
                Dark Theme
              </Text>
              <Switch
                onChange={() => {
                  changeTheme(theme === "light" ? "dark" : "light");
                }}
                value={theme === "dark"}
              />
            </View>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 15,
    margin: 0,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
