import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const size = (value) => RFValue(value);
import {
  BodyText_14,
  BodyText_14B,
  BodyText_15,
  BodyText_20B,
  BodyText_20,
  BodyText_16B,
} from "../../themes/common";
import { fontResize, fonts } from "../../assets/Fonts/font";
let ViewArea = styled.View`
  flex: 1;
  background-color: white;
  height: ${hp("100%")};
`;
let mainText = styled(BodyText_20B)`
  color: #FFF;
  font-weight: 700;
`;

let container  = styled.View`
  margin-top: ${hp("10%")};
  width: ${wp("100%")};
  height: ${hp("75%")};
  z-index: 1;
  background-color: #fff;
  border-top-left-radius: 25;
  border-top-right-radius: 25;
  border-width: 0.75;
  `;
  
let icon =styled.Image`
width: ${wp("4%")};
  height: ${hp("2.2%")};
  `;
  let images =styled.Image`
  width: ${wp("43%")};
    height: ${hp("15.2%")};
    border-radius:15
    `;
let HeadeView = styled.View`
flex:1;
  width: ${wp("100%")};
  background-color: #ffffff;
`;
let lightTitle = styled(BodyText_15)`
  
  color: #000;
`;

let CategoryLabel = styled(BodyText_16B)`
  color: #000;
  font-family:Montserrat-Bold;
`;

let boldTitle = styled(BodyText_20B)`
  margin-left:${wp("-3.17%")};
  color: #000;
  font-family:Montserrat-Bold;
`;
let Alignment = styled.View`
  flex-direction: row;
  margin-top: ${hp("4.5%")};
  justify-content: space-between;
  padding-right: ${wp("4.17%")};
  padding-left: ${wp("4.17%")};
  width: ${wp("100%")};
`;
let AlignmentII = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: ${hp("2%")};
  padding-right: ${wp("35.17%")};
  padding-left: ${wp("4.17%")};
  width: ${wp("100%")};
`;


export const Storestyles = {
  ViewArea,
  mainText,
  HeadeView,
  container,
  boldTitle,
  lightTitle,
  Alignment,
  AlignmentII,
  CategoryLabel,
  icon,
  images
};
