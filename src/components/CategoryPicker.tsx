import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import categories from "../constants/categories";
import { customTheme } from "../constants/default-theme";

const CategoryPicker = (props: {
  selectedCategory: string;
  onClick?: (e: string) => void;
  addAll?: boolean;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  const { colors } = useTheme() as customTheme;
  const { selectedCategory, onClick, addAll, setFieldValue } = props;
  return (
    <View {...props}>
      <FlatList
        data={addAll ? ["all", ...categories] : categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              (onClick && onClick(item)) ||
              (setFieldValue && setFieldValue("category", item))
            }
          >
            <Text
              style={[
                styles.category,
                {
                  fontWeight: item === selectedCategory ? "bold" : "normal",
                  borderBottomColor:
                    item === selectedCategory
                      ? colors.blue
                      : "transparent",
                  color:
                    item === selectedCategory
                      ? colors.blue
                      : colors.text,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    fontFamily: "OpenSans-SemiBold",
  },
});

export default CategoryPicker;
