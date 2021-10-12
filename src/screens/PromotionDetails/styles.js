import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const size = (value)=>RFValue(value);
import {
  BodyText_14,
  BodyText_14B,
  BodyText_15B,
  BodyText_20B,
  BodyText_20
} from "../../themes/common";
import { fontResize, fonts } from "../../assets/Fonts/font";
let ViewArea = styled.View`
  flex:1;
  background-color:white;
  height:${hp('100%')};
`;
let HeadeView = styled.View`
  margin-Top:${hp("20%")} ;
  align-items:center;
  width:${wp('100%')};
  height: ${wp('15%')};
  flex-direction: row;
  background-Color: #F36D21;
  border-Top-Left-Radius:25;
  border-Top-Right-Radius:25;
  justify-content:space-between;
  padding-left:${wp('5.17%')} ;
  padding-right:${wp('5.17%')};
`;
let container = styled.View`
  flex:1;
  background-color:#FDF2F7;
  padding-left:${wp('5.17%')} ;
  padding-right:${wp('5.17%')};
  padding-bottom:${wp('18.17%')};
  padding-top:${wp('5.17%')};
`;

  let subText = styled(BodyText_14B)`
  color:#030000;
  margin-top:10;
  font-weight:100;
 font-family: ${fonts.OpenSansRegular};
 margin-Top:${hp("5%")} ;
 margin-Left:${wp("8%")} ;
 margin-Right:${wp("8%")} ;

`;
export const PromotionDetailstyles = {

    ViewArea,
    HeadeView,
    container,
    subText
  
    
    
   
  }