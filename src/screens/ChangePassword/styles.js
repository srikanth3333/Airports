import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BodyText_14,
    BodyText_14B,
    BodyText_20B } from "../../themes/common";
import { OpenSansBold, MontserratRegular, OpenSansRegular, CenturyGothicRegular, MontserratBold, CenturyGothicBold } from "../../assets/font";


export const ViewArea = styled.View`
     flex:1;
    background-color:white;
`;
export const Container = styled.View`
  width:${wp('100%')};
  background-color:'rgb(253,251,249)';
  
`;
export const BackArrow = styled.Image`
    width:${wp('8%')};
    height:${hp('3%')};
    margin-top:3;
    margin-left: 20;
`;
export const HeaderText = styled(BodyText_20B)`
        font-family: ${MontserratBold};
        margin-left:20;
        color: 'rgb(77,43,97)';
    
`;
export const BorderPadding = styled.View`
    margin-Top:40;
     border-bottom-width: 0.92;
      border-bottom-color: #d3d3d3; 
      margin-Right:${hp("4%")} ;
      margin-Left:${hp("4%")} ;
`;
export const SettingsIcon = styled(BodyText_14B)`
     color:black;
     margin-Top:${hp("4%")} ;
     font-weight:500;
     font-family: OpenSansRegular;
     margin-Left:${wp("-4%")} ;
     `;
     export const Subcontainer = styled.View`
     flex-Direction:row;
     justify-Content:space-evenly;
     `;

export const Icon = styled.Image`
width:${wp('6.5%')};
height:${hp('3.5%')};

margin-Top:${hp("4%")} ;

`;

