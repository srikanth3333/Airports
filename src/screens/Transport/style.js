import { StyleSheet } from "react-native";
import { MontserratBold, MontserratRegular, OpenSansRegular } from "../../assets/font";
import { size } from "../../assets/size";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HeaderContainer = styled.View`
  padding-horizontal:${size(15)};
  height:${size(60)};
  flex-direction:row;
  align-items:center;       
`
export const HeaderText = styled.Text`
  font-family:${MontserratBold};
  font-size:${size(22)};
  color:'rgb(24,39,89)';
  margin-left:${size(15)};
`

export const TopBack = styled.View`
  background-color:#522D6D;
  position:absolute;
  width:100%;
  height:10%;
`

export const RegionContainer = styled.View`
  flex-direction:row;
  align-items:center;
  width:100%;
  height:10%;
  position:relative;
  justify-content:space-between;
  padding-horizontal:${size(20)};
`
export const SwapIcon = styled.Image`
  height:${size(18)};
  width:${size(18)};
  resize-mode:contain;
`
export const DestiontionContainer = styled.View`
  width:43%;
  height:${size(35)};
  border-radius:${size(30)};
  background-color:white;
  justify-content:center;
  padding-horizontal:${size(15)};
  border-color: rgb(233,82,138);
  border-width:1;
`
export const DestinationInput = styled.TextInput`
width:100%;
height:120%;               
text-align-vertical:center;
font-size:${size(14)};
`
export const TransportTypeContainer = styled.View`
  flex-direction: row;
  width:100%;
  justify-content:center;
`
export const TransportType = styled.Pressable`
  width:23%;
  padding-vertical: ${size(10)};
  height: ${size(100)};
  margin-horizontal:${size(2)};
`

export const TransportIcon = styled.Image`
  height: ${size(90)};
  width:100%;
  resize-mode: contain;
`
export const RowAlignMent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const TravelDetail = styled.Text`
  color: rgb(26,141,193);
  font-size: ${size(20)};
  font-family: ${MontserratBold};
`
export const Row = styled.View`
  flex-direction: row;
`
export const TimeIcon = styled.Image`
  width: ${size(24)};
  height: ${size(24)};
  resize-mode: contain;
  `
  export const TimeContainer = styled.View`
  margin-left: ${size(10)};
`
export const Estimation = styled.Text`
  color: rgb(26,141,193);
  font-size: ${size(7)};
  font-family: ${MontserratBold};
  position:absolute;
  top:${size(-3)};
`

export const Time = styled.Text`
  color: rgb(179,60,123);
  font-size: ${size(18)};
  margin-top:${3};
  font-family: ${MontserratBold};
`
export const TransportContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom:size(80)
  },
}))`
  flex: 1;
  padding-horizontal: ${size(20)};
  margin-top: ${size(20)};
`
export const ToDepartContainer = styled.View`
  flex-direction:row;
  margin-top:${size(10)};
  width:100%;
  border-top-width:1;
  border-color:lightgrey;
  padding-horizontal:${size(5)};
`

export const HaldBox = styled.View`
  width:50%;
  padding-vertical:${size(10)};
`
export const TitleValue = styled.Text`
  font-size:${size(15)};
  color:grey;
  font-weight:bold;
`

export const TravelByVehicleContainer = styled.View`
  flex-direction:row;
  padding-vertical:${size(10)};
  padding-horizontal:${size(10)};
  border-topWidth:1;
  border-bottomWidth:1;
  align-items:center;
  border-color:lightgrey;
`
export const BXWalk = styled.Image`
  height:${size(20)};
  width:${size(20)};
  resize-mode:contain;
`
export const MarginLeft17 = styled.View`
  margin-left:${size(17)};
`
export const RightArrow=styled.Image`
  height:${size(13)};
  width:${size(13)};
  resize-mode:contain;
`

export const TravelMapConatiner = styled.View`
  flex-direction:row;
  padding-top:${size(15)};
  padding-horizontal:${size(10)};
`
export const TravelMapTime = styled.Text`
  font-size:${size(16)};
  color:rgb(26,141,193);
  font-weight:bold;
`
export const MapViewConatainer  = styled.View`
  margin-left:${size(25)};
  align-items:center;
`
export const Reached = styled.View`
  width:${size(25)};
  height:${size(25)};
  background-color:rgb(179,60,123);
  border-radius:${size(20)};
  border-width:${3};
  border-color:rgb(26,141,193);
`
export const VerticalLines = styled.View`
  height:${size(70)};
  margin-left:${size(2)};
`

export const OnWayContainer = styled.View`
  height:${size(200)};
  width:${size(28)};
  border-radius:${size(20)};
  background-color:rgb(73,40,94);
  justify-content:space-between;
  border-width:${3};
  border-color:rgb(26,141,193);
`

export const PinkRound = styled.View`
  width:${size(22)};
  height:${size(22)};
  background-color:rgb(179,60,123);
  border-radius:${size(20)};
  border-color:rgb(26,141,193);
`
export const LocationInTextContainer = styled.View`
margin-left: ${size(20)};
`

export const ReachedTextCon = styled.View`
height: ${size(25)};
`

export const ReachedText = styled.Text`
font-size: ${size(16)};
color: black;
font-weight: bold;
`
export const OnwayTextCon = styled.View`
height: ${size(70)};
flex-direction:row;
align-items:center;
`

export const HowFarAway = styled.Text`
font-size: ${size(12)};
color: grey;
margin-left:${size(10)};
font-weight: bold;
`
export const OnTheWay = styled.View`
height:${size(200)};
width:90%;
justify-content:space-between
`

export const RowAlign = styled.View`
flex-direction:row;
align-items:center;
`
export const HorizontalLine = styled.View`
width:100%;
margin-top:${size(10)};
height:${size(1)};
background-color:lightgrey;
`
export const BlockContainer = styled.Pressable`
margin-horizontal:${size(10)};
background-color:rgb(235,248,255);
border-width:1;
border-color:rgb(150,218,255);
border-radius:${size(23)};
flex:1;
`
export const BlockPadding = styled.View`
width:230;
height:120;
padding-horizontal:${size(15)};
padding-vertical:${size(10)};

`

export const BlockText = styled.Text`
font-size:${size(17)};
font-weight:bold;
`
export const LightBoldText = styled.Text`
font-size:${size(12)};
margin-top:${size(5)};
`
export const BlockImage = styled.Image`
width:100%;
height:${size(200)};
resize-mode:stretch;
border-bottom-right-radius:${size(20)};
border-bottom-left-radius:${size(20)};
`
export const BlueText = styled.Text`
color: rgb(26,141,193);
font-size: ${size(19)};
font-weight: bold;
`
export const AboutText = styled.Text`
font-weight:bold;
font-size:${size(18)};
margin-top:${size(10)};
`
export const DetailsText = styled.Text`
font-size:${size(14)};
margin-top:${size(10)};
`
export const style = StyleSheet.create({
    dropDownStyle:{
        height: size(35),
        borderColor: "rgb(233,82,138)",
        borderRadius: size(25),
        backgroundColor:'white',
        zIndex:100
    },
    dropDownTextStyle:{
        fontSize: size(15),
        fontFamily: MontserratRegular,
        backgroundColor:'white',       
    },
    dropDownContainer:{
        width: "43%",
        borderRadius: size(25),
    },
})