import { black } from 'chalk'
import {StyleSheet} from 'react-native'
import { MontserratBold, MontserratRegular } from '../../assets/font'
import { size } from '../../assets/size'

export const style  = StyleSheet.create({
    dropDownStyle:{
        height: size(32),
        width: size(100),
        borderColor: "#B31F84",
        borderRadius: size(25),
        backgroundColor:'white',
        zIndex:100,
        marginLeft:size(30),
        marginTop:size(-3)
    },
    dropDownTextStyle:{
        fontSize: size(16),
        fontWeight:'600',
        fontFamily: MontserratRegular,
        backgroundColor:'white',

    },
    dropDownContainer:{
        width: "30%",
        marginRight: size(27),
        position: "absolute",
        borderRadius: size(25),
        top: 0,
        right: size(1),
        
        // zIndex:1
    },
    assistemItemContainer:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#707070",
        paddingVertical: size(20),
    },
    asistemItemIconCon:{
        width: "17%",
        alignItems: "center",
    },
    assitemItemIcon:{
        width: size(30),
        height: size(30),
        resizeMode: "contain",
    },
    assistemItemText:{
        color: "black",
        fontFamily: MontserratBold,
        fontSize: size(16),
    },
    rightIconCon:{
        width: "13%",
        alignItems: "flex-end",
    },
    rightIcon:{
        height: size(15),
        width: size(10),
        tintColor: "rgb(233,82,138)",
    },
    travellingItemContainer:{
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#707070",
       paddingVertical: size(20),
    },
    rowAlign:{
        flexDirection: "row",
        alignItems: "center",
    },
    widthAlign:{
        width: "15%",
        alignItems: "center",
    },
    travellingItemIcon:{
        width: size(30),
        height: size(30),
        resizeMode: "contain",
    },
    travellingItemTitle:{
        color: "black",
        fontFamily: MontserratBold,
        fontSize: size(16),
    },
    travellingItemImage:{
        width: '95%',
        height: size(100),
    },
    travellingInfo:{
        fontSize: size(13),
        color: black,
        marginTop: size(10),
      },
      travellingText:{
        fontSize: size(13),
        color: black,
        // marginLeft: "17%",
        marginTop: size(10),
        paddingRight: size(5),
      },
      div:{
        fontSize: size(13),
        color: black,
        // marginLeft: "17%",
        marginTop: size(10),
        paddingRight: size(5),
      }
})