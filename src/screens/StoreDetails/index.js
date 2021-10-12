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
import { ScrollView } from 'react-native-gesture-handler';
import { size } from "../../assets/size";
import {
    MarginTop
  } from "../../components/Common";
import Header from "../../components/Header";
import { BackgroundImage } from '../../components/Login';
import { StoreDetailstyles } from "../StoreDetails/styles";
class StoreDetails extends React.Component{
    constructor(props) {
        super(props)
        console.log(this.props.route.params)
        this.state = {
            }
        }
        render(){
            const routeData = this.props.route.params
            return(
                <StoreDetailstyles.ViewArea>
                    <View style={{flexDirection:"row",marginLeft:20,marginTop:10}}>
                    <Header routeNameData={this.props.navigation} /> 
                    <View style={{flexDirection:"column"}}>
                        <StoreDetailstyles.CategoryLabel>{routeData.title.length > 15 ? routeData.title.substring(0, 15) + "..." : routeData.title}</StoreDetailstyles.CategoryLabel>
                        <StoreDetailstyles.lightTitle>{this.props.route.params.subCategory}</StoreDetailstyles.lightTitle>
                        </View>
                        </View>
                        <MarginTop top={size(10)} />
                        {/* <BackgroundImage
          img={require("../../assets/Images/Promo_BG.png")}
        /> */}
      
        <StoreDetailstyles.bgm  source={require("../../assets/Images/Promo_BG.png")}/>
       
        <StoreDetailstyles.opacityArea>
            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
            <StoreDetailstyles.CategoryLabel>{routeData.title.length > 15 ? routeData.title.substring(0, 15) + "..." : routeData.title}</StoreDetailstyles.CategoryLabel>
            <TouchableOpacity 
            //style={{ justifyContent:"flex-end",marginLeft:size(95) }}
                                    onPress={() => this.props.navigation.navigate('StoreRatings', {"title":routeData.title,"subCategory":routeData.subCategory,"description":routeData.description})}>
            <StoreDetailstyles.icon source={require("../../assets/Images/Maximize.png")}/>
            </TouchableOpacity>
                </View>
                <StoreDetailstyles.desc>{routeData.description.length > 25 ? routeData.description.substring(0, 55) + "..." : routeData.description}</StoreDetailstyles.desc>

            </StoreDetailstyles.opacityArea>
         <ScrollView>
        <Text>{routeData.description}</Text>
        </ScrollView>
                    </StoreDetailstyles.ViewArea>
                
                
            )
        }
    }
    export default StoreDetails;