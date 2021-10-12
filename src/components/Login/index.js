import React from "react";
import { Image, Dimensions, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { size } from "../../assets/size";
import { BackButton, TextBoxWithBackground } from "../Common";
import { styles } from "./styles";
export function BackgroundImage({img}) {
  return (
    <Image
      source={img}
      style={styles.login_backGround}
    />
  );
}

export function AuthHeader({navigation,title}) {
  return (
    <View style={styles.loginHeaderContainer}>
      <BackButton onPress={()=>navigation.goBack()} />
     {title}
      <View style={styles.empty} />
    </View>
  );
}

export function LoginTextBoxes(props) {
  return (
    <View style={styles.loginTextBoxContainer}>
      <TextBoxWithBackground placeholder={"Email ID"} onChangeText={props.onEmail}/>
      <TextBoxWithBackground placeholder={"Password"} onChangeText={props.onPassword} isSecure={true} />
    </View>
  );
}

export function LoginSubContainer({children}){
  return (
    <View
      style={styles.loginSubContainer}
    >
      {children}
    </View>
  )
}