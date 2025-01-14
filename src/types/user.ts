export type userSex = "M" | "F";

export type userRole = "user" | "admin";

export type userType = {
  id: number;
  name: string;
  sex: userSex;
  role: userRole;
};

export type jwtTokenType = userType & { iss: string; aud: string; exp: number };
