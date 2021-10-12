import { StyleSheet, Platform } from "react-native";
import { I18nManager } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fontResize, fonts } from "../../../assets/Fonts/font";

let IconStyle = styled.Image`
  width: ${wp("4.27%")};
  height: ${hp("2.0%")};
`;

let ContainerView = styled.View`
  height: ${hp("6%")};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

let DropDownInput = styled.TextInput`
  background-color: transparent;
  align-content: center;
  font-size: ${fontResize(16)};
  height: ${hp("7%")};
  text-align: ${I18nManager.isRTL ? 'right' : 'auto'};
`;

let MainContainer = styled.View`
  align-items: center;
  border-width: 1;
  width: ${wp("20%")};
  padding-left: ${wp("3.20%")};
  padding-right: ${wp("3.20%")};
`;

let FlatListContainer = styled.View`
  border-radius: 2;
  position: absolute;
`;

let styles = StyleSheet.create({
  accessory: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  triangle: {
    width: 8,
    height: 8,
    transform: [
      {
        translateY: -4,
      },
      {
        rotate: "45deg",
      },
    ],
  },

  triangleContainer: {
    width: 12,
    height: 6,
    overflow: "hidden",
    alignItems: "center",

    backgroundColor: "transparent" /* XXX: Required */,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  item: {
    textAlign: I18nManager.isRTL ? "right" : "left",
  },

  scroll: {
    flex: 1,
    borderRadius: 2,
  },

  scrollContainer: {
    paddingVertical: 8,
  },
});

export const MADropDownStyles = {
  styles,
  IconStyle,
  ContainerView,
  MainContainer,
  DropDownInput,
  FlatListContainer,
};
