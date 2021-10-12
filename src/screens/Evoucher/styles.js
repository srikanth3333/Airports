import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const size = (value)=>RFValue(value);
import {
  BodyText_14,
  BodyText_16B,
  BodyText_15,
  BodyText_20,
  BodyText_20B
} from "../../themes/common";
import { fontResize, fonts } from "../../assets/Fonts/font";
let ViewArea = styled.View`
  flex:1;
  background-color:white;
  height:${hp('100%')};
`;
let bgm =styled.Image`
width: ${wp("22%")};
  height: ${hp("17%")};
  margin-top: ${hp("-40%")};
  margin-left:${wp("29%")};
  `;
  export const AboutText = styled(BodyText_16B)`
  font-weight:bold;
  margin-top:${size(5)};
  font-family:Montserrat-Bold;
  justify-content:center;
  margin-left:${wp("15.17%")};
  color: #FFFFFF;
  `
  let HeadTitle = styled(BodyText_20B)`
  margin-left:${wp("-3.17%")};
  color: #000;
  font-family:Montserrat-Bold;
  margin-top:${size(-5)};
`;
let boldTitle = styled(BodyText_20B)`
color: #FFFFFF;
font-family:Montserrat-Bold;
margin-left:${wp("13.17%")};
`;
export const Evoucherstyles = {
    ViewArea,
    bgm,
    AboutText,
    boldTitle,
    HeadTitle
   
    
   }