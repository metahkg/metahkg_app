import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { customTheme } from "../constants/default-theme";
import { useCategories } from "../context/contentChangeContext";

const CategoryPicker = (props: {
  selectedCategory: number;
  onClick?: (e: number) => void;
  addAll?: boolean;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  const { colors } = useTheme() as customTheme;
  const { selectedCategory, onClick, setFieldValue } = props;
  const categories = useCategories();
  return (
    <View {...props}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              (onClick && onClick(item.id)) ||
              (setFieldValue && setFieldValue("category", item.id))
            }
          >
            <Text
              style={[
                styles.category,
                {
                  fontWeight: item.id === selectedCategory ? "bold" : "normal",
                  borderBottomColor:
                    item.id === selectedCategory ? colors.yellow : "transparent",
                  color: item.id === selectedCategory ? colors.yellow2 : colors.text,
                },
              ]}
            >
              {item.name}
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
