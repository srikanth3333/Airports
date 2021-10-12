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
import { StoreRatingsstyles } from "../StoreRatings/styles";
function RatingStars({ array }) {
    return (
      <View
        style={{
          flexDirection: "row",
          height: "20%",
        }}
      >
        {array.map((item) => (
          <Image
            source={require("../../assets/Images/RatingStartDim.png")}
            style={{
              height: 50,
              width: 40,
              resizeMode: "contain",
              marginHorizontal: 9,
              marginTop:10
            }}
          />
        ))}
      </View>
    );
  }
function Stars({ array }) {
    return (
      <View
        style={{
          flexDirection: "row",
          height: "20%",
          width: "100%"
        }}
      >
        {array.map((item) => (
          <Image
            source={require("../../assets/Images/RatingStar.png")}
            style={{
              height: 13,
              width: 13,
              resizeMode: "contain",
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
    );
  }
function RateBar({ width }) {
    return (
      <View
        style={{
          height: 20,
          width: "90%",
        }}
      >
        <View
          style={{
            height: 10,
           backgroundColor: "#E82176",
            width: "100%",
            borderRadius:20,
            marginRight:30
          }}
        >
          <View
            style={{
              width: `${width}%`,
              height: 10,
              //backgroundColor: "rgb(0,149,222)",
            }}
          />
        </View>
      </View>
    );
  }
class StoreRatings extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            avgRate: "",
            ratings: {
                one_star: 0,
                second_star: 0,
                third_star: 0,
                fourth_star: 0,
                fifth_star: 0,
              },
          
            }
        }
        render(){
            const { avgRate } = this.state;
            const routeData = this.props.route.params
            return(
                
                <StoreRatingsstyles.ViewArea>
                <View style={{flexDirection:"row",marginLeft:20,marginTop:10}}>
                    <Header routeNameData={this.props.navigation}/> 
                    <View style={{flexDirection:"column"}}>
                        <StoreRatingsstyles.CategoryLabel>{routeData.title.length > 15 ? routeData.title.substring(0, 15) + "..." : routeData.title}</StoreRatingsstyles.CategoryLabel>
                        <StoreRatingsstyles.lightTitle>{routeData.subCategory}</StoreRatingsstyles.lightTitle>
                        </View>
                        </View>
                        <MarginTop top={size(15)} />
        <StoreRatingsstyles.bgm  source={require("../../assets/Images/Promo_BG.png")}/>
        <StoreRatingsstyles.AboutText>ABOUT</StoreRatingsstyles.AboutText>
        <View style={{flexDirection:"row",justifyContent:"flex-end",marginRight:30}}>
          <StoreRatingsstyles.icon  source={require("../../assets/Images/Fav.png")}/>
          <StoreRatingsstyles.icon  source={require("../../assets/Images/share.png")}/>
          </View>
          <MarginTop top={size(10)} />
        <StoreRatingsstyles.DetailsText>
        {routeData.description}
               </StoreRatingsstyles.DetailsText>
               <View
                  style={{
                    marginTop: size(20),
                    marginHorizontal:size(20),
                
                    
                  }}
                >
                  <Text
                    style={{
                      fontSize: size(16),
                      color: "#231F20",
                      fontFamily:"Montserrat-Bold",
                   // fontWeight:"900"
                    }}
                  >
                    RATING REVIEW
                  </Text>
                  <View
                    style={{
                      height: 110,
                      width: "100%",
                      flexDirection: "row",
                      marginTop: size(5),
                      justifyContent: "space-between",
                    }}
                  >
                      <View>
                    <View
                      style={{
                        height: "80%",
                        width: "150%",
                 justifyContent: "center",
                       alignItems: "center",
                       borderRadius:50,
                       borderColor:"#707070",
                       borderWidth:1,
                       backgroundColor:"#FFE3EF",
                       marginHorizontal:size(-5)
                      }}
                    
                    >
                        <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: size(25),
                        }}
                      >
                          3.6
                          
                        {/* {Number(avgRate).toFixed(1)} */}
                      </Text>
                      <Text
                        style={{
                          fontSize: size(18),
                        }}
                      >
                        Out of 5
                      </Text>

                        </View>
                        
                      
                      </View>
                    
                    <View
                      style={{
                        width: "30%",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stars array={[0, 0, 0, 0, 0]} />
                      <Stars array={[0, 0, 0, 0]} />
                      <Stars array={[0, 0, 0]} />
                      <Stars array={[0, 0]} />
                      <Stars array={[0]} />
                    </View>
                    <View
                      style={{
                        width: "40%",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <RateBar width={this.state.ratings.fifth_star} />
                      <RateBar width={this.state.ratings.fourth_star} />
                      <RateBar width={this.state.ratings.third_star} />
                      <RateBar width={this.state.ratings.second_star} />
                      <RateBar width={this.state.ratings.one_star} />
                    </View>
                  </View>
                  
                </View>
                <View
                  style={{
                    marginTop: size(20),
                    marginHorizontal:size(20),
                
                    
                  }}
                >
                  <Text
                    style={{
                      fontSize: size(16),
                      color: "#231F20",
                      fontFamily:"Montserrat-Bold",
                   // fontWeight:"900"
                    }}
                  >
                    TAP TO RATE
                  </Text>
                  <RatingStars array={[0, 0, 0, 0, 0]} />

                  </View>
                </StoreRatingsstyles.ViewArea>
            )}}
            export default StoreRatings;