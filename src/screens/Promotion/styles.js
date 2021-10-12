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
  BodyText_15B,
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
  color: #030000;
  margin-top: ${hp("5%")};
  font-weight: 700;
  font-family: ${fonts.OpenSansRegular};
`;

let HeadeView = styled.View`
  margin-top: ${hp("20%")};
  align-items: center;
  width: ${wp("100%")};
  height: ${wp("15%")};
  flex-direction: row;
  background-color: #f36d21;
  border-top-left-radius: 25;
  border-top-right-radius: 25;
  justify-content: space-between;
  padding-left: ${wp("5.17%")};
  padding-right: ${wp("5.17%")};
`;

let container = styled.View`
flex:1;
  width: ${wp("100%")};
  background-color: #FDF2F7;
`;
let lightTitle = styled(BodyText_20)`
  text-align: center;
  color: #ffffff;
`;

let CategoryLabel = styled(BodyText_20B)`
  color: #000;
  padding-bottom: ${wp("5%")};
`;

let boldTitle = styled(BodyText_16B)`
  text-align: center;
  color: #ffffff;
`;
let Alignment = styled.View`
  flex-direction: row;
  margin-top: ${hp("3.5%")};
  justify-content: space-between;
  padding-right: ${wp("4.17%")};
  padding-left: ${wp("4.17%")};
  width: ${wp("100%")};
`;

export const Promotionstyles = {
  ViewArea,
  mainText,
  HeadeView,
  container,
  boldTitle,
  lightTitle,
  Alignment,
  CategoryLabel
};
