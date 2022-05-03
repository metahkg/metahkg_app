import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

export default function TermsScreen() {
  return (
    <View style={viewStyles.container}>
      {/*<Header*/}
      {/*    leftComponent={<HeaderButton text={t('global.back')} icon={'ios7arrowleft'} onPressButton={_ => {*/}
      {/*        this.props.navigation.goBack()*/}
      {/*    }}/>}*/}
      {/*    centerComponent={{*/}
      {/*        text: t('global.about'),*/}
      {/*        style: styles.modalHeader.center*/}
      {/*    }}*/}
      {/*    containerStyle={{*/}
      {/*        backgroundColor: config.mainColor,*/}
      {/*    }}*/}
      {/*/>*/}
      <Text></Text>
      <View style={viewStyles.textContainer}>
        <View style={viewStyles.copyrightView}>
          <Text style={viewStyles.copyrightText}>
            Copyright © 2022 Metahkg Contributors.{" "}
            <Text
              style={[
                viewStyles.copyrightText,
                { textDecorationLine: "underline" },
              ]}
              onPress={() => {
                Linking.openURL(
                  "https://www.gnu.org/licenses/agpl-3.0.en.html"
                );
              }}
            >
              AGPL-3.0
            </Text>
            .
          </Text>
        </View>
      </View>
    </View>
  );
}

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 35,
  },
  logoView: {
    width: 90,
    height: 90,
    borderColor: "#dfdfdf",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
  },
  logo: {
    width: 75,
    height: 75,
    alignSelf: "center",
  },
  appNameView: {
    marginTop: 15,
  },
  appNameText: {
    fontSize: 20,
    color: "#666",
  },
  infoView: {
    flexGrow: 1,
    marginTop: 30,
    alignItems: "center",
  },
  infoText: {
    marginTop: 10,
    color: "#666",
  },
  copyrightView: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
  },
  copyrightText: {
    color: "#666",
    alignSelf: "center",
  },
});
