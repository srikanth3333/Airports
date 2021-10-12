import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { height } from "../components/Login/constant";
import {
  white,
  lightgrey,
  red,
  lightBlue,
  maroon,
  pinkwhite,
  pink,
} from "./colors";
import { width } from "../components/Login/constant";
import {
  MontserratBold,
  MontserratRegular,
  CenturyGothicBold,
  CenturyGothicRegular,
  OpenSansBold,
  OpenSansLight,
  OpenSansRegular,
} from "./font";

const size = (value) => RFValue(value);
const styles = StyleSheet.create({
    container:{
        flex:1,
        height: '100%',
        backgroundColor: 'white',
    },
    marginContainer:{
      flex:1,
      // marginTop:'4%',
    },
    smallFlex:{
      flex:0.15,
      marginHorizontal:size(20)
  },
      // extra
      tabSectionCon:{
        // width:width-size(21),
        flex:1,
        marginTop: 20,
        marginBottom: 20
    },
    flexwithPadding: {
      flex: 1,
      padding: size(20),
    },
    thumbIcon: {
      height: size(40),
      width: size(40),
      alignSelf: "center",
      resizeMode: "contain",
    },
      flexWithjustifyCenter:{
        flex: 1,
        justifyContent: "center",
      },
    //   alignStart:{
    //     alignItems:"flex-start",
    //     paddingLeft:'7%'
    // },
   whiteLines:{
      //height:size(150),
      width:'1.3%',
    },
    bottomTabCon: {
      flexDirection: "row",
      width: "100%",
      height: RFValue(70),
      position: "absolute",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  bottomTab: {
    flex: 1,
    alignItems: "center",
    zIndex: 1,
    justifyContent: "center",
    marginTop: 10,
  },
  tabWrapper: {
    width: "73%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  infoIcon: {
    height: size(25),
    width: size(25),
    resizeMode: "contain",
  },
  aboutTitle: {
    color: "#522D6D",
    fontSize: size(19),
    marginLeft: size(20),
    fontFamily: MontserratRegular,
  },
  /*  loginTitle: {
  fontSize: size(30),
  textAlign: "center",
  color: "rgb(77,43,97)",
  fontFamily:MontserratBold
  },
  infoIcon: {
    height: size(22),
    width: size(22),
    resizeMode: "contain",
  },
  aboutTitle: {
    color: "rgb(77,43,97)",
    fontSize: size(23),
    marginLeft: size(10),
    fontFamily: MontserratRegular,
  },
  forgotPassTxt:{
    fontSize:size(16),
    fontWeight:'bold',
    textAlign:"center",
    marginVertical:size(10),
    color:'rgb(26,41,92)',
    fontFamily:MontserratBold
  },
  signUpText:{
  fontSize:size(19),
  fontWeight:'bold',
  textAlign:"center",
  marginVertical:size(15),
  color:'rgb(71,96,128)',
  fontFamily:OpenSansRegular
  },
  horizontalLine:{
    width:'100%',
    height:size(0.8),
    marginTop:7,
    backgroundColor:'rgb(157,197,218)'
  }, */
  // extra finish

  //  general screen
  gradientBox: {
    height: size(180),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backPressPos: {
    position: "absolute",
    top: size(20),
    left: size(23),
  },
  logoutTxt: {
    position: "absolute",
    top: size(20),
    right: size(23),
  },
  backArrowGenral: {
    height: size(27),
    width: size(27),
    resizeMode: "contain",
    tintColor: white,
  },
  generalTxt: {
    fontSize: size(20),
    fontFamily: MontserratBold,
    color: white,
  },
  helloTxt: {
    fontSize: size(17),
    fontFamily: "Montserrat-Regular",
    color: white,
  },
  editModalCon: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalWhiteCon: {
    flex: 0.8,
    backgroundColor: "white",
    borderTopRightRadius: size(20),
    padding: size(20),
    borderTopLeftRadius: size(20),
  },
  closeCon: {
    position: "absolute",
    top: size(23),
    right: size(23),
  },
  closeIcon: {
    width: size(23),
    height: size(23),
  },
  clear: {
    fontFamily: MontserratBold,
    fontSize: size(15),
    color: "rgb(72,39,97)",
    textAlign: "center",
  },
  // contact screen
  contactItemsContainer: {
    width: "100%",
    paddingVertical: size(15),
    //flexDirection: "row",
    borderTopWidth: 1,
    alignItems: "flex-start",
    paddingHorizontal: size(5),
  },
  iconTitle: {
    flexDirection: "row",
   // width: "35%",
  },
  contactIcon: {
    width: size(21),
    height: size(21),
    resizeMode: "contain",
  },
  contactTitle: {
    fontFamily: "CenturyGothic-Regular",
    fontSize: size(17),
    marginLeft: size(18),
  },
  contactTxt: {
    fontFamily: "CenturyGothic-Bold",
    fontSize: size(17),
    color: "rgb(77,43,97)",
    marginLeft:size(37)
  },
  // PrivacyPolicy screen
  regularParagraph: {
    fontSize: size(17),
    fontFamily: "CenturyGothic-Regular",
    color:"#37183C"
  },
boldColorLines:{
  color: "rgb(77,43,97)",
  fontSize: size(20),
  fontFamily: "CenturyGothic-Regular",
},

// My Profile Screen
profileContainer:{
  flexDirection:"row",
  width:'100%',
  justifyContent:"space-evenly",
  alignItems:"center",
  position:"absolute",
  bottom:size(-60)
},
profileUpdateicon:{
  height:size(50),
  width:size(50),
 resizeMode:"contain",
 backgroundColor: red
},

profilePic:{
  height:size(120),
  width:size(120),
  borderRadius:size(100),
},
// Logout screen
  dontWantLogout:{
    fontFamily:MontserratRegular,
    fontSize:size(16),
    color:'rgb(26,41,92)',
    alignSelf:"center",
    //fontWeight:"bold"
},
    headerContainer:{
        width:'100%',
        flexDirection:"row",
        alignItems:"center",
        height:size(55),

        justifyContent:"space-between"
    },
    backArrow:{
        width:size(23),
        height:size(23),
        resizeMode:"contain"
    },
    headerText:{
        fontSize:size(16),
        fontFamily:OpenSansBold,
        marginLeft:size(5)
    },
    headerCalIcon:{
        width:size(25),
        height:size(25),
        marginLeft:size(8)
    },
    headerCalText:{
        fontFamily:OpenSansBold,
        fontSize:size(12),
        textAlign:"right"
    },
    headerCalContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    flightType:{
        height:size(47),
        width:size(47),
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderRadius:size(40),


    },
    flightTypeText:{
        fontFamily:OpenSansLight,
        fontSize:size(10),

    },
    searchBarContainer:{
        flexDirection:"column",
        //alignItems:"center",
        justifyContent:"flex-start",
        marginTop:size(45),
        padding:size(20),
        marginLeft:size(-20)

    },
    searchBoxContainer:{
        borderWidth:1,
        borderRadius:size(30),
        flex:1,
        paddingHorizontal:size(15),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderColor:'#B31F84'
    },
    searchIcon:{
        width:size(20),
        height:size(20),
        resizeMode:"contain"
    },
    searchInputTextBox:{
        flex:1,
        borderRadius:size(30),
        backgroundColor:white,
        padding:size(8),
        fontSize:size(17),
        fontFamily:OpenSansBold,
    },
    departureIcon:{
        width:size(28),
        height:size(28),
        resizeMode:"contain",
    },
    placeName:{
        fontFamily:OpenSansBold,
        fontSize:size(12),
        color:lightBlue,

    },
    flightTimeText:{
        fontFamily:OpenSansBold,
        fontSize:size(11),
        color:'#666666',
        marginTop:size(3)
    },
    flightDetailContainer:{
        flexDirection: 'row',
        alignItems: 'center',

        borderBottomWidth: 1,
        borderColor: lightgrey,
        paddingVertical: size(10),

        justifyContent: 'space-between',
    },
    flighImageDetailContainer:{
            flexDirection: 'row',
            alignItems: 'center',
    },
    flightLogo:{
        height: size(40),
        width: size(40),
        resizeMode: 'contain',
    },
    flightStatusContainer:{
        padding: size(5),
        backgroundColor: red,
        borderRadius: size(20),
        width: size(115),

    },
    flightStatus:{
        fontFamily: OpenSansBold,
        fontSize: size(10),
        color: white,
        textAlign: 'center',
      },
    //   Splash Screen Styles
    splashBG:{
        width: "100%",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    flex:{
        flex: 1,
    },
    splashLogo:{
        width: size(200),
        height: size(150),
        alignSelf: "center",
        resizeMode: "contain",
        marginTop: size(10),
    },
    splashInfo:{
        // width: "50%",
        // backgroundColor: "rgb(248,0,106)",
        // height: size(150),
        // paddingHorizontal: size(54),
        // justifyContent: "space-between",
        // paddingVertical: size(15),
        width: "87%",
        backgroundColor: "rgb(248,0,106)",
        height: size(150),
        paddingHorizontal: size(54),
        justifyContent: "space-between",
        paddingVertical: size(15),
      },
      splashInfoTxt:{
        // fontSize: size(14),
        // color: white,
        // alignItems: "center",
        // fontFamily: OpenSansRegular,
        fontSize: size(14),
        color: white,
        alignItems: "center",
        fontFamily: OpenSansRegular,
      },
      splashSmallTxt:{
        fontSize: size(12),
        color: white,
        fontFamily: OpenSansRegular,
      },
      be:{
        width: "13%",
        height: size(150),
        backgroundColor: "rgb(248,0,106)",
      },
      changeLanguage:{
        textAlign: "center",
        fontFamily: OpenSansRegular,
        color: white,
        fontSize: size(15),
        marginTop:size(-18),
      },
      border:{
        width: "10%",
        height: size(3),
        borderRadius: size(2),
        alignSelf: "center",
        marginVertical: size(10),
        backgroundColor: white,
      },
      rowCenter:{
        flexDirection: "row",
        alignSelf: "center",
      },
      languageTxt:{
        textAlign: "center",
        // fontFamily: OpenSansBold,
        //fontWeight: "bold",
        color: "white",
        fontSize: size(15),
      },
      authText:{
        textAlign: "center",
        fontFamily: OpenSansRegular,
        fontWeight: "800",
        color: white,
        fontSize: size(17),
      },

    //   Home Screen
    homeHeaderContainer:{
        flexDirection:"row",
        width:'100%',
        justifyContent:"space-between",
        paddingHorizontal:size(20),
    },
    malasiaLogo:{
        height:size(65),
        width:size(110),
        resizeMode:'contain',
    },
    userIconContainer:{
        justifyContent:"flex-start",
        alignItems:"center",
        marginBottom:size(15),
        marginHorizontal:5,
    },
    spaIconContainer:{
      justifyContent:"flex-start",
      alignItems:"center",
      marginBottom:size(15),
      marginLeft: 60,

      // marginRight:-20

  // My Profile Screen
    },
  profileContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: size(-60),
  },
  profileUpdateicon: {
    height: size(50),
    width: size(50),
    resizeMode: "contain",
  },
  profilePic: {
    height: size(120),
    width: size(120),
    borderColor: white,
    borderRadius: size(100),
  },
  // Logout screen
  dontWantLogout: {
    fontFamily: MontserratRegular,
    fontSize: size(16),
    color: "rgb(26,41,92)",
    alignSelf: "center",
    fontWeight:"bold"
  },
    userIcon:{
        height:size(25),
        width:size(25),
        resizeMode:'contain'
    },
    userTxt:{
        fontFamily:OpenSansBold,
        fontSize:size(11),
        color:maroon,
        textAlign:"center",
        marginTop: 4
    },
    flexRow:{
        flexDirection:"row"
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
        position:"absolute",
        zIndex:-1,
        flexDirection:"row",
        backgroundColor:"white",
        height:size(65),
        width:'100%'
    },
    linearContainer:{
        height:size(70),
        width:'100%',
        flexDirection:"row",
        paddingHorizontal:size(20),
        alignItems:"center",
        justifyContent:"space-between"
    },
    socialIcon: {
        width: size(26),
        height: size(26),
        resizeMode: "contain",
        margin: size(15),
      },
    carIconContainer:{
        height:size(40),
        width:size(40),
        backgroundColor:pinkwhite,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:size(40)
    },
    carIcon:{
        height:size(20),
        width:size(20),
        resizeMode:'contain'
    },
    happyJrnyTxt:{
        fontSize:size(15),
        fontFamily:MontserratBold,
        color:white,
        marginRight: size(40),
        width:'70%'
    },
    upDownAroContainer:{
        justifyContent:"space-between",
        height:size(65),
        paddingVertical:size(10)
    },
    arrow:{
        height:size(13),
        width:size(13),
        resizeMode:"contain"
    },
    whiteLinesContainer:{
        backgroundColor:maroon,
        width:'12%',

    },
    lines:{
        width: "100%",
        height: size(65),
   },
   searchBoxContainer:{
    height:size(40),
    width:'100%',
    borderRadius:size(40),
    backgroundColor:white,
    borderWidth:0.75,
    borderColor:'#B31F84',
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
   },
   searchPlaceHolder:{
    fontFamily:OpenSansRegular,
    fontSize:size(13),
    paddingStart: 10,
    paddingEnd: 10,
    width: "80%",
  },
  magniIcon: {
    height: size(27),
    width: size(27),
    resizeMode: "contain",
    tintColor: "blue",
  },
  headerTitleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favTitle: {
    fontSize: size(17),
    fontFamily: OpenSansBold,
  },
  exploreTitle: {
    fontSize: size(14),
    fontFamily: OpenSansLight,
  },
  favBoxContainer: {
    flex: 1,
    height: size(100),
    justifyContent: "center",
    alignItems: "center",
    marginTop: size(-15),
    marginLeft: size(25),
    
  },
  favIconContainer: {
    height: size(50),
    width: size(60),
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  favIcon: {
    height: size(33),
    width: size(33),
    resizeMode: "contain",
  },
  favText: {
    fontFamily: CenturyGothicRegular,
    color: "#231F20",
    fontSize: size(13.5),
  },
  sideIcon: {
    width: size(20),
    paddingHorizontal: size(15),
    height: size(20),
    resizeMode: "contain",
    marginTop: size(20),
  },
  // Menu
  menuContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    alignSelf: "center",
    position: "absolute",
    zIndex: -1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    marginTop: size(15),
  },
  menuWhiteContainer: {
    width: "100%",
    height: "100%",
    borderRadius: size(35),
    backgroundColor: "white",
    paddingVertical: size(20),
  },
  malsiyaLogo: {
    height: "13%",
    width: "35%",
    resizeMode: "stretch",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  listItemContainer: {
    borderTopWidth: 1,
    paddingHorizontal: size(35),
    paddingVertical: size(15),
    marginHorizontal: size(15),
    borderColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
  },
  listItemImage: {
    height: width / 15,
    width: width / 16,
    resizeMode: "stretch",
  },
  listItemText: {
    fontFamily: MontserratBold,
    color: "#522D6D",
    fontSize: size(17),
    marginLeft: 40,
  },
  //Login Screen styles
  forgotPassTxt: {
    fontSize: size(16),
    textAlign: "center",
    //textShadowColor: "rgba(0, 0, 0, 0.5)",
    //textShadowOffset: { width: -1, height: 1 },
    //textShadowRadius: 2,
    marginVertical: size(10),
    color: "#232E69",
    fontFamily: MontserratBold,
  },
  horizontalLine: {
    width: "100%",
    height: size(0.8),
    marginTop: 12,
    backgroundColor: "rgb(157,197,218)",
  },
  signUpText: {
    fontSize: size(16),
    textAlign: "center",
    marginVertical: size(15),
    //color: "rgb(71,96,128)",
    fontFamily: MontserratBold,
    color: "#232E69",
    //textShadowColor: "rgba(0, 0, 0, 0.5)",
    //textShadowOffset: { width: -1, height: 1 },
    //textShadowRadius: 4,
    
  },
  loginTitle: {
    fontSize: size(25),
    textAlign: "center",
    color: "rgb(77,43,97)",
    //textShadowColor: "rgba(0, 0, 0, 0.5)",
    //textShadowOffset: { width: -1, height: 1 },
    //textShadowRadius: 4,
    marginRight: 15,
    fontFamily: MontserratBold
},

editProfileTitle:{
  fontSize: size(25),
  textAlign: 'center',
  color: 'rgb(77,43,97)',
  fontWeight:"bold",
  marginLeft:20,
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 4,
},
  editCameraTitle:{
      fontSize: size(20),
      textAlign: 'center',
      color: 'rgb(77,43,97)',
      fontWeight:"700",
      marginLeft:30,
      marginTop:30
  },

  editProfileTitle: {
    fontSize: size(22),
    textAlign: "center",
    color: "rgb(77,43,97)",
    fontWeight: "bold",
    marginLeft: 20,
  },
  editCameraTitle: {
    fontSize: size(20),
    textAlign: "center",
    color: "rgb(77,43,97)",
    fontWeight: "700",
    marginLeft: 30,
    marginTop: 30,
  },

  // Feedback done
  feedbackThank: {
    fontFamily: MontserratRegular,
    color: white,
    fontSize: size(23),
  },
  feedBackSubmit: {
    fontFamily: MontserratBold,
    color: white,
    fontSize: size(23),
    marginVertical: size(10),
  },
  // Feedback
  textArea: {
    paddingHorizontal: size(15),
    paddingVertical: size(10),
    borderWidth:1,
    fontSize: size(17),
    height: size(90),
    fontFamily: MontserratRegular,
    borderColor: "#F1DDE9",
    textAlignVertical: "top",
  },
  boldTitle: {
    fontSize: size(25),
    textAlign: "center",
    color: "rgb(77,43,97)",
    marginLeft: size(15),
    fontFamily: MontserratBold,
    textShadowColor: "rgb(27,41,89)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  lightTitle: {
    fontSize: size(25),
    textAlign: "center",
    color: "rgb(77,43,97)",
    marginLeft: size(10),
    fontFamily: MontserratRegular,
    textShadowColor: "rgb(27,41,89)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  searchBoxContainer:{
    height:size(40),
    width:'100%',
    borderRadius:size(40),
    backgroundColor:white,
    borderWidth:0.75,
    borderColor:'#B31F84',
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center"
   },
   searchPlaceHolder:{
    fontFamily:OpenSansRegular,
    fontSize:size(13),
    paddingStart: 10,
    paddingEnd: 10,
    width: '80%'
   },
   magniIcon:{
    height:size(25),
    width:size(25),
    marginRight:10,
    resizeMode:"contain",
    tintColor:'#232E69'
   },
});
export default styles;
