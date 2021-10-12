import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white } from "../../assets/colors";
import { BodyText_14B, BodyText_10 } from "../../themes/common";

let KeyInfoHeaderText = styled(BodyText_14B)`
  align-self: center;
  margin-left: ${wp("1.17%")};
`;

let KeyInfoSubText = styled(BodyText_10)`
  align-self: center;
  margin-left: ${wp("5.17%")};
  width: ${wp("74.17%")};
`;

let KeyInfoImage = styled.Image`
  height: ${wp("3.20%")};
  width: ${wp("2.17%")};
  margin-right: ${wp("4.17%")};
`;

let KeyInfoLeftImage = styled(KeyInfoImage)`
  height: ${wp("5.17%")};
  width: ${wp("5.17%")};
  margin-right: ${wp("4.17%")};
  margin-left: ${wp("4.17%")};
`;

let KeyInfoHeaderView = styled.View`
  margin-left: ${wp("4.17%")};
  margin-right: ${wp("4.17%")};
  height: ${wp("14.17%")};
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 0.3;
`;
let keyInfoHeaderSub = styled.View`
  flex-direction: row;
  justify-content: center;
  align-self: center;
`;

let keyInfoHeaderSubtwo = styled(keyInfoHeaderSub)`
  justify-content: flex-end;
`;

let keyInfoSubView = styled(KeyInfoHeaderView)`
  height: ${wp("15.17%")};
  align-items: center;
`;

let KeyInfoHeadeView = styled.View`
  padding-left: ${wp("8.17%")};
  padding-right: ${wp("4.17%")};
  align-items: center;
  padding-bottom: ${wp("5.17%")};
  flex-direction: row;
  justify-content: space-between;
`;

let SearchView = styled.View`
  bottom: 0;
  position: absolute;
  margin-left: ${wp("4.17%")};
  margin-right: ${wp("4.17%")};
`;

export const KeyInfoStyle = {
  KeyInfoHeaderText,
  KeyInfoImage,
  KeyInfoLeftImage,
  KeyInfoHeaderView,
  keyInfoHeaderSub,
  keyInfoHeaderSubtwo,
  keyInfoSubView,
  KeyInfoSubText,
  KeyInfoHeadeView,
  SearchView,
};
