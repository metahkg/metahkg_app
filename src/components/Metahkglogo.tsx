import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

/**
 * @description Metahkg logo, in different formats
 */
export default function MetahkgLogo(props: {
  light?: boolean;
  dark?: boolean;
  ua?: boolean;
  text?: boolean;
  filled?: boolean;
  svg?: boolean;
  height: number;
  width: number;
  sx?: StyleProp<ImageStyle>;
}) {
  const { light, dark, ua, text, filled, svg, height, width, sx } =
    props;
  return (
    <Image
      style={sx}
      source={{
        uri:
          (svg && "https://metahkg.org/images/logo.svg") ||
          (light &&
            (filled
              ? "https://metahkg.org/images/logo-white-filled.png"
              : "https://metahkg.org/images/logo-white.png")) ||
          (text && "https://metahkg.org/images/logo_with_text.png") ||
          (dark && "https://metahkg.org/images/logo.png") ||
          (ua && "https://metahkg.org/images/metahkg-ua.png") ||
          "https://metahkg.org/images/logo.png",
      }}
      height={height}
      width={width}
    />
  );
}
