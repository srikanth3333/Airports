import React, { Component } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  Pressable
} from "react-native";
import { size } from "../../assets/size";
import { 
    MontserratBold,
    MontserratRegular,
    OpenSansBold,
    OpenSansRegular,
} from "../../assets/font";
import { Evoucherstyles } from "./styles";
import Header from "../../components/Header";
import {
    MarginTop
  } from "../../components/Common";
import {ButtonWithBackground } from "../../components/Common/index";
class Evoucher extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <Evoucherstyles.ViewArea>
            <View style={{flexDirection: 'row', alignItems: 'center',marginTop:20,paddingHorizontal:17}}>
            <Header/> 
           <Evoucherstyles.HeadTitle>E-VOUCHERS</Evoucherstyles.HeadTitle>
           </View>
           <ImageBackground    style={{height:'98%',width:"100%"}}
          resizeMode={"cover"} source={require("../../assets/Images/E-Vouchers_Image.png")}>
           <View style={{padding:30,justifyContent:"center",flex:1,marginTop:100,flexDirection:"column"}}>
           <Evoucherstyles.bgm source={require("../../assets/Images/Shop_Like_Here.png")}/>
           <MarginTop top={size(20)} />
           <Evoucherstyles.boldTitle>CONGRATULATIONS!</Evoucherstyles.boldTitle>
           <MarginTop top={size(20)} />
           <Evoucherstyles.AboutText>           NOW YOU CAN {"\n"}       SHOP LIKE A HERO!</Evoucherstyles.AboutText>
           <MarginTop top={size(50)} />
           <Evoucherstyles.AboutText>HERE’S A RM1000 WORTH OF {"\n"}E-VOUCHERS TO START YOUR {"\n"}        SHOPPING JOURNEY.</Evoucherstyles.AboutText>
           <MarginTop top={size(40)} />
           <ButtonWithBackground onPress={this.submitPasswordChange} text={"SHOP NOW"}/>
              </View>
              </ImageBackground>
          </Evoucherstyles.ViewArea>
            
        )
    }
    
}
export default Evoucher;