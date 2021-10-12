import { isIphoneX } from "react-native-iphone-x-helper";
import { Platform, StatusBar, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight; 

const deviceHeight =
  isIphoneX() || Platform.OS === "android"
    ? standardLength - offset
    : standardLength;

export function size(Size, standardScreenHeight = 680) {
  const heightPercent = (Size * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}
