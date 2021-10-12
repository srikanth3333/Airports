import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { MontserratBold, MontserratRegular, OpenSansRegular } from "../../assets/font";
import { size } from "../../assets/size";
import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export const HeaderContainer = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:baseline;
`

export const TimerCon = styled.View`
    width:30%;
    margin-right:${size(10)};
    padding-vertical:${size(8)};
    align-items:center;
`

export const Timer = styled.View`
    
    padding-horizontal:${size(5)};
    padding-vertical:${size(2)};
    border-radius:${size(20)};
    justify-content:center;
    align-items:center;
    width:100%;
`

export const TimerText = styled.Text`
color:'rgb(46,50,97)';
    font-size:${size(30)};
    font-weight:bold;
`

export const TimeLeft = styled.Text`
    color:'rgb(46,50,97)';
    fontSize:${size(13)};
    fontWeight:bold,
    font-family:${MontserratBold}
`

export const DestiontionContainer = styled.View`

  shadow-color: #000;
  shadow-offset: {width: 2, height: 2};
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
  elevation: 5;
 
`
export const DestinationInput = styled.TextInput`
width:100%;      
height:${size(40)};    
border-radius:${size(30)};
border-color: rgb(233,82,138);
border-width:1;
padding-horizontal:${size(15)};
text-align-vertical:center;
background-color:white;
font-size:${size(14)};


`

export const TransportType = styled.Pressable`
  width:23%;
  padding-vertical: ${size(10)};
  height: ${size(100)};
  margin-horizontal:${size(2)};
  
`

export const TransportIcon = styled.Image`
  height: ${size(90)};
  flex:1;
  resize-mode: contain;
`

export function TravelDropDown({
    list,
    placeholder,
    setValue,
    value,
    extraStyle,
  }) {
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(placeholder);
    const [items, setItems] = useState(list);
  
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        zIndex={100}
    
        placeholder={placeholder}
        style={style.dropDownStyle}
        textStyle={style.dropDownTextStyle}
        dropDownContainerStyle={{
          borderColor: "rgb(233,82,138)",
        
          
        }}
        containerStyle={[style.dropDownContainer, extraStyle]}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    );
  }

export const style = StyleSheet.create({
    dropDownStyle:{
        height: size(35),
        borderColor: "rgb(233,82,138)",
        borderRadius: size(25),
        backgroundColor:'white',
        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex:100,
        elevation: 5,
    },
    dropDownTextStyle:{
        fontSize: size(15),
        fontFamily: MontserratRegular,
        backgroundColor:'white',       
    },
    dropDownContainer:{
        width: "100%",
        borderRadius: size(25),
       
    },
})