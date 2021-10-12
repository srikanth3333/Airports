import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  BodyText_14,
  BodyText_14B,
  BodyText_15B,
  BodyText_20B,
} from "../../themes/common";
import { fontResize, fonts } from "../../assets/Fonts/font";
let ViewArea = styled.View`
  flex:1;
  background-color:white;
`;
let mainText = styled(BodyText_20B)`
  color:#030000;
  margin-Top:${hp("5%")} ;
  font-weight:700;
  font-family: ${fonts.OpenSansRegular};
`;

let subText = styled(BodyText_14B)`
  color:#030000;
  margin-top:10;
  font-weight:100;
 font-family: ${fonts.MontserratRegular};
`;
let Icon = styled.Image`
  width:${wp('8.5%')};
  height:${hp('4.5%')};
  margin-left:${wp('8.5%')};
`;

let button = styled.View`
   width:${wp('60.5%')};
  height:${hp('7.5%')};
  background-color:#E72176 ;
  border-radius:27;
  margin-Top:${hp("20%")} ;
  margin-left: 20;
  top: 0;
  bottom: 0;
  position:absolute;
`;

let ButtonText = styled(BodyText_15B)`
  color:#FFFFFF;
  margin-top: 15;
  text-align: center;
  justify-content: center;
  font-weight:500;
 font-family: ${fonts.OpenSansRegular};
`;

export const KeyInfoDetailsstyles = {

    ViewArea,
    mainText,
    subText,
    Icon,
    button,
    ButtonText
   
  }