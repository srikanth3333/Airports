import { rgb } from "chalk";
import React from "react";
import {  StyleSheet} from "react-native";
import { white } from "../../assets/colors";
import { size } from "../../assets/size";
import {  height } from "./constant";
export const styles = StyleSheet.create({
    container:{
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
    login_backGround:{
        width:'100%',
        height:height /2.9,
        position:"absolute",
        resizeMode:"stretch",
    },
    loginHeaderContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    loginTitle:{
        fontSize: size(30),
        textAlign: 'center',
        color: 'rgb(77,43,97)',
    },
    loginImg:{
        height:size(60),
        width:size(90),
        resizeMode:"contain"
    },
    empty:{
        height:size(17),
        width:size(17),
    },
    loginTextBoxContainer:{
        justifyContent: "space-between",
        height: size(55 * 2),
    },
   loginSubContainer:{
    flex:1,
    justifyContent:"center",
    padding:size(23)
}

})
