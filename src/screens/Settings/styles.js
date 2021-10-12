import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  BodyText_14,
  BodyText_14B,
  BodyText_20B
} from "../../themes/common";
import { fontResize, fonts } from "../../assets/Fonts/font";

let MainText = styled(BodyText_14)`
  color: white;
  align-self: flex-start;
  padding-left: ${wp("10%")};
  padding-right: ${wp("12%")};
`;

let ViewArea = styled.View`
  flex:1;
  background-color:white;
`;

let SettingsIcon = styled(BodyText_14B)`
  color:black;
  margin-Top:${hp("2%")} ;
  font-weight:500;
  text-align: center;
  font-family: ${fonts.CenturyGothicRegular};
`;
let SettingsIcons = styled(BodyText_14B)`
  color:black;
  margin-Top:${hp("5%")} ;
  font-weight:500;
  text-align: center;
  font-family: ${fonts.CenturyGothicRegular};
`;
let HeaderText = styled(BodyText_20B)`
  font-family:${fonts.CenturyGothicRegular};;
  margin-left:20;
  color: 'rgb(77,43,97)';
  font-weight:700;
  margin-top: ${hp('1%')};
`;

let BackArrow = styled.Image`
  width:${wp('8%')};
  height:${hp('3%')};
  margin-top:3;
  margin-left: 20;
`;

let Icon = styled.Image`
  width:${wp('8.75%')};
  height:${hp('4.75%')};
  margin-left: 20;
`;

let BorderPadding = styled.View`
  margin-Top:40;
  border-bottom-width: 0.92;
  border-bottom-color: #d3d3d3;
  margin-Right:${hp("4%")} ;
  margin-Left:${hp("4%")} ;
`;

let HorizontalSpaceView = styled.View`
  margin-Left:${hp("4%")} ;
`;
let HorizontalSpaceViewII = styled.View`
  margin-Left:${hp("-1.5%")} ;
`;

let Container = styled.View`
  width:${wp('100%')};
  background-color:'rgb(253,251,249)';

`;
let Subcontainer = styled.View`
  flex-Direction:row;
  justify-Content:center;
  margin-top: ${hp("-0.6%")};
  margin-bottom: ${hp("-1%")};
  font-family: ${fonts.CenturyGothicRegular};
`;

let HeaderContainer = styled.View`
  margin-top: ${hp('1.2%')};
  margin-left: ${wp('4.64%')};
`;

export const SettingsStyle = {
  MainText,
  ViewArea,
  SettingsIcon,
  SettingsIcons,
  HeaderText,
  BackArrow,
  HeaderContainer,
  Icon,
  BorderPadding,
  Container,
  Subcontainer,
  HorizontalSpaceView,
  HorizontalSpaceViewII
}