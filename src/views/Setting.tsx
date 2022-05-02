import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

import { ThemeContext } from "../context/themeSwichContext";

import { Moon, Sun } from "../components/icons";
import SettingButton from "../components/SettingButton";
import { customTheme } from "../constants/default-theme";

const Setting = () => {
  const { colors } = useTheme() as customTheme;
  const { theme, changeTheme } = React.useContext(ThemeContext);
  const menuList = [
    {
      title: "服務條款",
      // icon: 'language',
      // color: '#09f',
      onPressGoTo: "TermsScreen",
    },
    {
      title: "關於我地",
      // icon: 'language',
      // color: '#09f',
      onPressGoTo: "AboutScreen",
    },

    // {
    //     title: "關於我地~~~",
    //     // icon: 'language',
    //     // color: '#09f',
    //     onPress:()=>{
    //         this.props.navigation.navigate('AboutScreen')
    //     }
    // },
    // {
    //     title: t('settings.feedback'),
    //     icon: 'feedback2',
    //     color: '#0c9',
    //     onPress() {
    //         this.props.navigation.navigate('Feedback')
    //     }
    // },
    // {
    //     title: t('settings.about'),
    //     icon: 'about1',
    //     color: '#fc3',
    //     onPress() {
    //         this.props.navigation.navigate('About')
    //     }
    // }
  ];

  return (
    <SafeAreaView style={styles.boxCenter}>
      {menuList.map((item, i) => (
        <View style={styles.list} key={i}>
          {/*<ListItem*/}
          {/*    containerStyle={viewStyles.listItem}*/}
          {/*    chevron*/}
          {/*    topDivider*/}
          {/*    bottomDivider*/}
          {/*    title={item.title}*/}
          {/*    onPress={item.onPress.bind(this)}*/}
          {/*    leftIcon={<Icon style={{ marginTop: 4 }} name={item.icon} color={item.color}/>}*/}
          {/*/>*/}
          <SettingButton title={item.title} onPressGoTo={item.onPressGoTo} />
        </View>
      ))}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxCenter: {
    flex: 1,
  },
  list: {
    marginTop: 10,
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

export default Setting;
