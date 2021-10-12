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
let opacityArea = styled.View`
  flex-direction: column;
  background-color:white;
  height:${hp('18%')};
  width: ${wp("90%")}; 
  margin-top: ${hp("-7%")};
  border-color:#707070;
  border-radius:20;
  border-width:0.5;
  background-color:#FFEBF4;
  margin-left: ${wp("5%")};

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
let icon =styled.Image`
width: ${wp("6%")};
  height: ${hp("3.8%")};
  `;
  let bgm =styled.Image`
  width: ${wp("100%")};
    height: ${hp("18.8%")};
    `;

export const StoreDetailstyles = {
     ViewArea,
     CategoryLabel,
     lightTitle,
     icon,
     desc,
     bgm,
     opacityArea
    }