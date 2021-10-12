import React from 'react';
import { ImageBackground, View,Image ,Text,StyleSheet, SafeAreaView,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from '../../assets/styles';
import { size } from '../../assets/size';
//import detailsstyles from './style'
import {
    SafeView, 
    MarginTop,
    EndText,HeaderEnd,
    ProfileDetailsContainer
    
  } from '../../components/Common/index';
class ProfileDetails extends React.Component{
    render(){
        return(
            <SafeView>
                <View style={detailsstyles.backgroundheader}>
                <MarginTop top={size(30)} />
            <HeaderEnd
              navigation={this.props.navigation}
              title={
                <Text style={styles.EndTitle}>
                  <EndText text={"Logout"} />
                  {""}
                </Text>
              }/>
              <MarginTop top={size(10)} />
              <View style={{marginLeft:'42%'}}>
                  <Text style={{fontSize:20,color:'#fff'}}>Hello</Text>
                  <Text style={detailsstyles.name}>Full Name</Text>
              </View>
                <MarginTop top={size(10)} />
              <View style={detailsstyles.iconsbar}>
            <Image style={detailsstyles.imageIcon} source={require('../../assets/Images/Edit_Camera.png')}/>
                  <View style={detailsstyles.image}/>
            <Image style={detailsstyles.imageIcon} source={require('../../assets/Images/Edit_Profile.png')}/>
            </View>
        <MarginTop top={size(30)} />

        <ProfileDetailsContainer/>

</View>

            </SafeView>
        )
    }
}
export  default ProfileDetails;
export const detailsstyles = StyleSheet.create({
    backgroundheader:{
      backgroundColor: '#fff',
      backgroundColor:'#522D6D55',
      borderWidth: 0.5,
      borderColor: '#000',
      height:'33%',
      width:'100%',
      
    },
    name:{fontSize:25,
        color:'#fff',
        fontWeight:'700',
        marginLeft:'-15%'
    },
    imageIcon:{
        height: 50,
         width: 50,
         marginTop:70,
         //marginLeft:55
      },
      iconsbar:{flexDirection:'row',
      justifyContent:'space-evenly',
      alignContent:'center'
    },
      image:{
        backgroundColor: '#fff',
        borderRadius: 60,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 20,
        height:120,
        width:120,
        marginTop:22,
        marginRight:10
        },
        bodycontainer:{
            flexDirection:'row'
        ,alignContent:'space-around',
        justifyContent:'space-around',
        marginLeft:8
    },

        

      
  })