import React from "react";
import { Image, Dimensions, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { size } from "../../assets/size";
import { BackButton, TextBoxWithBackground } from "../Common";
import { styles } from "./style";

export function TextBox(props){
    return(
        <TextBoxWithBackground placeholder={"Enter Email"} onChangeText={props.onForgot}/>
    )
}

export function SubContainer({children}){
    return (
      <View
        style={styles.fpSubContainer}
      >
        {children}
      </View>
    )
  }
