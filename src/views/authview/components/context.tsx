import React from "react";
import { jwtTokenType } from "../../../types/user";

export const AuthContext = React.createContext<{
  authState?: {
    token?: string;
    userInfo?: jwtTokenType;
  };
}>({});
