import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white } from "../../assets/colors";
// import { BodyText_24B,BodyText_20, BodyText_17B, BodyText_24, BodyText_18, BodyText_16 } from "../../themes/common";
// import { OpenSansBold, MontserratRegular, OpenSansRegular } from "../../assets/font";
import { BodyText_24B,BodyText_20, BodyText_20B, BodyText_17B, BodyText_24, BodyText_18, BodyText_18B,BodyText_16 } from "../../themes/common";
import { OpenSansBold, MontserratRegular, OpenSansRegular, CenturyGothicRegular, MontserratBold } from "../../assets/font";

let LeftText = styled(BodyText_20B)`
padding-left:${wp('4.17%')}; 
color:${(props)=>props.theme.HeaderText};
font-family: ${MontserratBold};

`;

let PromotionText = styled(BodyText_20)`
padding-left:${wp('4.17%')}; 
font-family:${CenturyGothicRegular};
color:${(props)=>props.theme.white};
`;

let RightText = styled(BodyText_16)`
font-family:${MontserratRegular};
padding-left:${wp('2.17%')}; 
color:${(props)=>props.theme.HeaderText};
`;

let MainView = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

let BackArrow = styled.Image`
height:${wp('6.18%')} ;
width:${wp('6.18%')} ;
`;


export const HeaderStyle = {
    LeftText,
    RightText,
    MainView,
    BackArrow,
    PromotionText
}