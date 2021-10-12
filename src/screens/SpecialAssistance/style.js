import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { MontserratBold, MontserratRegular } from "../../assets/font";
import { size } from "../../assets/size";
import { height } from "../../components/Login/constant";
export const styles = StyleSheet.create({
    container:{
        width: "100%",
        marginTop: height / 3.7,
        zIndex: 1,
        flex: 1,
        backgroundColor: "rgb(241,249,236)",
        borderTopLeftRadius: size(30),
        borderTopRightRadius: size(30),
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: "rgba(0,0,0,0.6)",
        padding: size(30),
      },
      rowAlign:{
        flexDirection: "row",
        alignItems: "center",
      },
      boldTitle:{
        fontSize: size(23),
        textAlign: "center",
        color: "#232E69",
        marginLeft: size(15),
        fontFamily: MontserratBold,
        //textShadowColor: "rgb(27,41,89)",
        //textShadowOffset: { width: -1, height: 1 },
        //textShadowRadius: 3,
      },
      lightTitle:{
        fontSize: size(23),
        textAlign: "center",
        color: "#232E69",
        marginLeft: size(10),
        fontFamily: MontserratRegular,
        //textShadowColor: "rgb(27,41,89)",
        //textShadowOffset: { width: -1, height: 1 },
        //textShadowRadius: 3,
      }
})