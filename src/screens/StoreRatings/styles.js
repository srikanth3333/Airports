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
  BodyText_20B,
  BodyText_20
} from "../../themes/common";
import { fontResize, fonts } from "../../assets/Fonts/font";
let ViewArea = styled.View`
  flex:1;
  background-color:white;
  height:${hp('100%')};
`;
let lightTitle = styled(BodyText_15)`
  color: #000;
  font-family:Montserrat-Regular;
`;
let desc = styled(BodyText_14)`
  color: #000;
  font-family:Montserrat-Regular;
  margin-left: ${wp("6%")};
  margin-top :${hp("1%")};
`;

let CategoryLabel = styled(BodyText_20B)`
  color: #000;
  font-family:Montserrat-Bold;
`;
let bgm =styled.Image`
width: ${wp("100%")};
  height: ${hp("18.8%")};
  `;
  export const AboutText = styled.Text`
  font-weight:bold;
  font-size:${size(18)};
  margin-top:${size(20)};
  padding-horizontal:${size(20)};
  `
  export const DetailsText = styled.Text`
  font-size:${size(16)};
  margin-top:${size(10)};
  font-family:Centurygothic-Regular;
  padding-horizontal:${size(20)};
  `
  let icon =styled.Image`
  width: ${wp("5.5%")};
    height: ${hp("2.9%")};
    margin-top:${size(-20)};
    margin-left:${wp("4.5%")};
    
    `;
export const StoreRatingsstyles = {
    ViewArea,
    CategoryLabel,
    lightTitle,
    bgm,
    AboutText,
    DetailsText,
    icon
   
    
   }