import { View } from "react-native";
import { Editor, Provider, Tools } from "react-native-tinymce";

export default function Tinymce() {
  return (
    <Provider>
      <View>
        <Editor value="<p>Hello world!</p>" />
        <Tools />
      </View>
    </Provider>
  );
}
