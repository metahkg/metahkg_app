import { ParamListBase } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

interface RootStackParamList extends ParamListBase {
  Home?: {};
  User?: { id: number; name: string };
}

export type NavigationProps<
  Route extends keyof RootStackParamList,
  navigatorId extends string | undefined = undefined
> = NativeStackScreenProps<RootStackParamList, Route, navigatorId>;
