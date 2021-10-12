import React from "react";
import { StyleSheet} from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white } from "../../assets/colors";
import {BodyText_14B, } from "../../themes/common";
import {fontResize, fonts} from '../../assets/Fonts/font'

let MainContainer = styled.View`
  flex: 1;
`;

let PresssableComp = styled.Pressable`
  /* height:size(150),
  flex:1,
 justifyContent:"space-between",
 paddingVertical:size(40),
 alignItems:"center" */
`;

let IconImgView = styled.Image`
  width: ${25};
  height: ${25};
`;

let IconContainer = styled.View`
  margin-bottom: ${wp('2%')};
  margin-right:${wp('1%')};
  align-items: center;
`;

let TxtLbl  = styled(BodyText_14B)`
  color:#522D6D;
  font-weight:800;
  font-family: ${fonts.CenturyGothicRegular};
`;

export const MAGeneralListItemStyles = {
  MainContainer,
  PresssableComp,
  TxtLbl,
  IconContainer,
  IconImgView
}