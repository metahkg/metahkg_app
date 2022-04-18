/**
 *
 * @author tangzehua
 * @sine 2020-07-07 20:21
 */
// wtf coding practice is this
// @flow
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export function InsertLinkModal(props: {
  color: string;
  placeholderColor: string;
  backgroundColor: string;
  onDone?: (props: { title: string; url: string }) => void;
}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  let title: string;
  let url: string;
  function setModalVisible(visible: boolean) {
    setIsModalVisible(visible);
  }

  function setTitle(newTitle: string) {
    title = newTitle;
  }

  function setURL(newUrl: string) {
    url = newUrl;
  }

  function onDone() {
    const Title = title;
    const Url = url;
    setModalVisible(false);
    props.onDone && props.onDone({ title: Title, url: Url });
  }

  const { color, placeholderColor, backgroundColor } = props;
  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      coverScreen={false}
      isVisible={isModalVisible}
      backdropColor={color}
      backdropOpacity={0.3}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={[styles.dialog, { backgroundColor }]}>
        <View style={styles.linkTitle}>
          <Text style={{ color }}>Insert Link</Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={[styles.input, { color }]}
            placeholderTextColor={placeholderColor}
            placeholder={"title"}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.item}>
          <TextInput
            style={[styles.input, { color }]}
            placeholderTextColor={placeholderColor}
            placeholder="http(s)://"
            onChangeText={(text) => setURL(text)}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onDone}>
            <Text style={styles.text}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 40,
  },
  linkTitle: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#b3b3b3",
  },
  dialog: {
    borderRadius: 8,
    marginHorizontal: 40,
    paddingHorizontal: 10,
  },

  buttonView: {
    flexDirection: "row",
    height: 36,
    paddingVertical: 4,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#286ab2",
  },
});
