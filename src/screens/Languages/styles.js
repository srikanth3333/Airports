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

let ViewArea = styled.View`
  flex:1;
  background-color:white;
`;

let Container = styled.View`
  width:${wp('100%')};
  background-color:'rgb(253,251,249)';
`;

let BackArrow = styled.Image`
  width:${wp('8%')};
  height:${hp('3%')};
  margin-top:3;
  margin-left: 20;
`;

let HeaderText = styled(BodyText_20B)`
  margin-left:20;
  color: 'rgb(77,43,97)';
  font-family: ${fonts.MontserratBold};
`;

let BorderPadding = styled.View`
  margin-Top:40;
  border-bottom-width: 0.92;
  border-bottom-color: #d3d3d3;
  margin-Right:${hp("4%")} ;
  margin-Left:${hp("4%")} ;
`;

let SettingsIcon = styled(BodyText_14B)`
  color:#231F20;
  margin-Top:${hp("4%")} ;
  font-weight:500;
  font-family: ${fonts.CenturyGothicRegular};
  margin-Left:${wp("10%")} ;
`;
let SettingsIcons = styled(BodyText_14B)`
  color:#231F20;
  margin-Top:${hp("4%")} ;
  font-weight:500;
  font-family: ${fonts.CenturyGothicRegular};
  margin-Left:${wp("-20%")} ;
`;

let ContainerTouch = styled.TouchableOpacity`
  width: ${wp('80%')};
`;

let Subcontainers = styled.View`
  flex-Direction:row;
  justify-content: space-evenly;
  margin-Left:${wp("-2%")} 
`;
let Subcontainer = styled.View`
  flex-Direction:row;
  justify-content: center;
`;

let Icon = styled.Image`
  width:${wp('5.5%')};
  height:${hp('3.5%')};
  margin-Top:${hp("4%")} ;
`;

let HeaderContainer = styled.View`
  margin-top: ${hp('-0.02%')};
  margin-left: ${wp('4.64%')};
`;

export const LanguageStyles = {
  ViewArea,
  Container,
  BackArrow,
  HeaderText,
  BorderPadding,
  SettingsIcon,
  SettingsIcons,
  Subcontainer,
  Subcontainers,
  Icon,
  HeaderContainer,
  ContainerTouch
}

