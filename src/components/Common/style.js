import React from "react";
import { StyleSheet } from "react-native";
import { white } from "../../assets/colors";
import { OpenSansBold, MontserratRegular, OpenSansRegular, MontserratBold, CenturyGothicRegular } from "../../assets/font";
import { fonts } from "../../assets/Fonts/font";
import { size } from "../../assets/size";
import { height } from "../Login/constant";

export const commanStyle = StyleSheet.create({
  backButton: {
    height: size(27),
    width: size(27),
    resizeMode: "contain"
  },

  dropDownText: {
    fontFamily: CenturyGothicRegular,
  },



  textBoxBackground: {
    height: size(43),
    width: "100%",
  },
  DropDownBackground: {
   // height: size(55),
    width: "100%",
    //borderColor: '#000'
  },
  textBox: {
    width: "100%",
    textAlignVertical: "center",
    height: size(47),
    // paddingHorizontal: size(20),
    fontSize: size(16),
    borderColor: '#B31F8472',
    paddingStart: 14,
    paddingEnd: 20,
    borderWidth:1,
    fontFamily: CenturyGothicRegular
  },
  DownArrow: {
    paddingHorizontal: size(10),
    height: 10,
    width: 10,
    marginLeft: -27,
    marginTop: 15

  },
  buttonBackground: {
    width: '100%',
    height: size(52),
    justifyContent: "center",
    alignItems: "center",
    marginTop: size(50)
  },
  buttonTxt: {
    color: white,
    fontSize: size(15),
    fontFamily: MontserratBold,
  },
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  loginTitle: {
    fontSize: size(30),
    textAlign: 'center',
    color: 'rgb(77,43,97)',
  },

empty:{
  height:size(17),
  width:size(17),
},
authContainer:{
  width:'100%',
  marginTop:height /3.7,
  zIndex:1,
  flex:1,
  backgroundColor:'rgb(253,251,249)',
  borderTopLeftRadius:size(30),
  borderTopRightRadius:size(30),
  borderWidth:1,
  borderBottomWidth:0,
  borderColor:'rgba(0,0,0,0.6)',
  padding:size(30),
},
backConatiner:{
  flexDirection:"row",
  paddingHorizontal:size(10),
  paddingVertical:size(8),
  alignItems:"center"
},
backTitle:{
  fontSize:size(24),
  color:'rgb(81,45,109)',
  //color:'gray',
  marginLeft:size(20),
  // fontWeight:"bold",
  fontFamily:fonts.MontserratBold
},
generalTitle:{
  fontSize:size(24),
  //color:'rgb(81,45,109)',
  color:'gray',
  marginLeft:size(20),
  // fontWeight:"bold",
  fontFamily:fonts.MontserratBold
},
// General screen
generalContainer:{
  height:size(150),
  flex:1,
 justifyContent:"space-between",
 paddingVertical:size(40),
 alignItems:"center"
},
generalItemIcon:{
  height:size(28),
  width:size(28),
  resizeMode:"contain"
},
generalItemText:{
  fontSize:size(17),
  color:'rgb(81,45,109)',
  bottom:size(0),
  fontFamily:fonts.CenturyGothicRegular
},
  empty: {
    height: size(17),
    width: size(17),
  },
  authContainer: {
    width: '100%',
    marginTop: height / 3.7,
    zIndex: 1,
    flex: 1,
    backgroundColor: 'rgb(253,251,249)',
    borderTopLeftRadius: size(30),
    borderTopRightRadius: size(30),
    padding: size(30),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 8
  },
  backConatiner: {
    flexDirection: "row",
    paddingHorizontal: size(15),
    paddingVertical: size(15),
    alignItems: "center"
  },
  backTitle: {
    fontSize: size(24),
    color: 'rgb(81,45,109)',
    marginLeft: size(20),
    // fontWeight:"bold",
    fontFamily: fonts.MontserratBold
  },
  // General screen
  generalContainer: {
    height: size(150),
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: size(40),
    alignItems: "center"
  },
  generalItemIcon: {
    height: size(28),
    width: size(28),
    resizeMode: "contain"
  },
  generalItemText: {
    fontSize: size(17),
    color: 'rgb(81,45,109)',
    bottom: size(0),
    fontFamily: fonts.CenturyGothicRegular
  },

  cancelButton: {
    height: size(22),
    width: size(22),
    resizeMode: "contain",
    marginTop: 4,
    justifyContent: 'flex-end'
  },
  detailText: {
    color: 'rgb(77,43,97)',
    marginLeft: -20,
    marginTop: 10,
    fontSize: 15
  },

  bodycontainer: {
    flexDirection: 'row'
    , alignContent: 'space-around',
    justifyContent: 'space-around',
    marginLeft: 8
  },
  image: { height: 27, width: 27 },
  camerIcon: {
    height: 40,
    width: 40,
    marginTop: -60,
    marginRight: 55
  },
  circleIcon: {
    backgroundColor: '#fff',
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    height: 110,
    width: 110,
    marginTop: -8,
    marginRight: -5
  },

  textBox2: {
    width: "100%",
    textAlignVertical: "center",
    height: size(43),
    paddingHorizontal: size(20),
    fontSize: size(16),
  },

  CameraEditContainer: {
    width: '100%',
    marginTop: height / 1.7,
    zIndex: 1,
    flex: 1,
    backgroundColor: 'rgb(253,251,249)',
    borderTopLeftRadius: size(30),
    borderTopRightRadius: size(30),
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(0,0,0,0.6)',
    padding: size(30),
  },
  ProfileContainer: {
    width: '100%',
    backgroundColor: 'rgb(253,251,249)',
    padding: size(30),
    zIndex: 1,
    flex: 1,
  }

})
