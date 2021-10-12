import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fontResize, fonts } from "../../assets/Fonts/font";
import {
  BodyText_33B,
  BodyText_20,
  BodyText_10,
  BodyText_17,
  BodyText_11,
} from "../../themes/common";
import { color } from "react-native-reanimated";
import { red } from "../../assets/colors";

let MainContainer = styled.SafeAreaView`
  margin-left: ${wp("2.27%")};
  margin-right: ${wp("2.27%")};
  /* background-color: ${(props) => props.theme.primary}; */
`;

let FlightHeadeView = styled.View`
  padding-left: ${wp("4.17%")};
  padding-right: ${wp("4.17%")};
  padding-top: ${wp("4.17%")};
  padding-bottom: ${wp("4.17%")};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

let TextName = styled(BodyText_33B)`
  color: ${(props) => props.theme.InputBorderActive};
`;

let Container = styled.View`
  height: ${hp("75%")};
`;

let boldTitle = styled.View`
text-align: center;
color: "rgb(77,43,97)";
  margin-left: ${wp("15%")};
`;

let lightTitle = styled.View`
  text-align: "center";
  color: "rgb(77,43,97)";
  margin-left: ${wp("10%")};
  text-shadow: "rgb(27,41,89)";
`;

let headerContainer = styled.View`
  width:${wp("100%")};
  flex-direction:"row";
  align-items:"center";
  height:size(55);
  justify-content:"space-between";
  `;

  let flightType = styled.View`
    height:${hp("47%")};
    width:${wp("47%")}; 
    justify-content:"center";
    align-items:"center";
    border-width:1;
    border-radius:40;
    `;

let flightTypeText = styled.View`
  font-family: ${fonts.OpenSansLight};
`;

let searchBarContainer = styled.View`
    flex-direction:"row";
    align-items:"center";
    margin-top:${hp("15%")};
    
    `;

let searchBoxContainer = styled.View`
    border-width:1;
    border-radius:size(30);
    flex:1;
    padding-right:size(15);
    flex-direction:"row";
    align-items:"center";
    justify-content:"space-between";
    border-color:'#B31F84';
`;

let searchIcon = styled.View`
    width:${wp("20%")};
    height:${hp("20%")};
    resize:"contain";
    `;

let searchInputTextBox = styled.View`
    flex:1;
    border-radius:size(30);
    background-color:white;
    padding:size(8);
    font-family: ${fonts.OpenSansBold};
`;

let departureIcon = styled.View`
    width:${wp("28%")};
    height:${hp("28%")};
    resize:"contain";
  `;

let placeName = styled.View`
  font-family: ${fonts.OpenSansBold};
  color: lightBlue;
`;

let flightTimeText = styled.View`
    font-family: ${fonts.OpenSansBold};
    color:'#666666';
    margin-top:size(3);
`;

let flightDetailContainer = styled.View`
    flex-direction: 'row';
    align-items: 'center';
    border-bottom: 1;
    border-color: lightgrey;
    padding-right: size(10);
    justify-content: 'space-between';
`;

let flighImageDetailContainer = styled.View`
        flex-direction: 'row';
        align-items: 'center';
        `;

let flightLogo = styled.View`
    height:${hp("40%")};
    width:${wp("40%")};
    resize:'contain';
`;

let flightStatusContainer = styled.View`
    padding: size(5);
    background-color: red;
    border-radius: size(20);
    width:${wp("115%")};
`;

let flightStatus = styled.View`
    font-family: ${fonts.OpenSansBold};
    color: white;
    align-items: 'center';
  `;

export const FlightInfoStyle = {
  MainContainer,
  TextName,
  Container,
  boldTitle,
  lightTitle,
  headerContainer,
  flightType,
  flightTypeText,
  searchBarContainer,
  searchBoxContainer,
  searchIcon,
  searchInputTextBox,
  departureIcon,
  placeName,
  flightTimeText,
  flightDetailContainer,
  flighImageDetailContainer,
  flightLogo,
  flightStatusContainer,
  flightStatus,
  FlightHeadeView,
};
