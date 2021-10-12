import React, { Component } from 'react';

import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text
} from "react-native";
import { size } from "../../assets/size";
import { 
    MontserratBold,
    MontserratRegular,
    OpenSansBold,
    OpenSansRegular,
} from "../../assets/font";
class TrackFlight extends Component{
    constructor(props){
        super(props);
        this.state = {
            trackModal:false,
        }
    }
    render(){
        return(
<SafeAreaView>
{/* <Modal
transparent
visible={trackModal}
animationType={"slide"}
onRequestClose={() => {

this.setState({ trackModal: false });

}}

> */}

<View
style={{
flex: 1,
backgroundColor: "rgba(0,0,0,0.5)",
justifyContent: "center",
}}>
<View
style={{
width: "80%",
alignSelf: "center",
backgroundColor: "white",
borderRadius: size(20),
padding: size(15),
}}>

<TouchableOpacity
style={{
position: "absolute",
top: size(12),
right: size(15),
}}
onPress={() => {this.setState({ trackModal: false });}}
>

<Image
source={require("../../assets/Images/Close.png")}
style={{
resizeMode: "contain",
width: size(20),
height: size(20),
}}
/>
</TouchableOpacity>
<Image
source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
style={{
width: size(44),
height: size(44),
alignSelf: "center",
}}/>
<Text
style={{
fontSize: size(18),
textAlign: "center",
color: "rgb(77,43,97)",
marginTop: size(10),
fontFamily: MontserratRegular,
textShadowColor: "rgb(27,41,89)",
textShadowOffset: { width: -1, height: 1 },
textShadowRadius: 3,
}}>You are now Tracking</Text>
<Text
style={{
fontSize: size(18),
textAlign: "center",
color: "rgb(77,43,97)",
fontFamily: MontserratBold,
textShadowColor: "rgb(27,41,89)",
textShadowOffset: { width: -1, height: 1 },
textShadowRadius: 3,

}}>EK 0440
</Text>

<Text
style={{
fontSize: size(15),
textAlign: "center",
color: "black",
fontFamily: MontserratRegular,
marginTop: size(20),
paddingHorizontal: size(25),
}}>You will now receive alerts for this flight</Text>

<TouchableOpacity
style={{
//backgroundColor: "rgb(0,146,156)",
height: size(40),
alignSelf: "center",
marginTop: size(15),
width: "90%",
justifyContent: "center",
alignItems: "center",
}}
onPress={() => {this.setState({ trackModal: false });}}
>
<ImageBackground

style={{

width:'100%',

height:'100%',

justifyContent:"center",

alignItems:"center"

}}

source={require('../../assets/Images/flight_BG.jpeg')}/>
<Text style={{
color: "white",
marginTop:-30,
fontFamily: OpenSansBold,
fontSize: size(13),
}}>DONE</Text>
</TouchableOpacity>
</View>
</View>
{/* </Modal> */}
</SafeAreaView>
 )
    }
}
export default TrackFlight;