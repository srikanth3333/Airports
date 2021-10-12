import React, { useState } from "react";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MontserratBold, MontserratRegular } from "../../assets/font";
import { size } from "../../assets/size";
import styles from "../../assets/styles";
import { style } from "./style";
import SeeMore from 'react-native-see-more-inline';
import { black } from "chalk";

export function TravelDropDown({ list, placeholder,setValue,value }) {
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
        borderColor: "#B31F84",
        marginLeft:size(30)
      }}
      containerStyle={style.dropDownContainer}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
export function AssistItems({ length, index, item, navigation }) {
   //console.log(item.klia1,"check array");
  return (
    <Pressable
      style={[
        style.assistemItemContainer,
       { borderBottomWidth: length - 1 == index ? 1 : 0 }, 
      ]}
      onPress={() => {
        navigation.navigate(item.navigateTo,{
          klia1: item.klia1,
          klia2: item.klia2,
          title: item.text,
          screen: item.screen
        });
      }}
    >
      <View style={style.asistemItemIconCon}>
        <Image source={item.icon} style={style.assitemItemIcon} />
      </View>
      <View
        style={{
          width: "70%",
        }}
      >
        <Text style={style.assistemItemText}>{item.text}</Text>
      </View>
      <View style={style.rightIconCon}>
        <Image
          source={require("../../assets/Images/Expand.png")}
          style={style.rightIcon}
        />
      </View>
    </Pressable>
  );
}
function GetImage(title){
  switch(title){
    case 'Baby Care Room': 
      return require('../../assets/Images/baby.png');
    case 'Unaccompanied Minor Service': 
    return require('../../assets/Images/stroller.png');
    case 'Children Play Area': 
    return require('../../assets/Images/game-controller-outline.png');
    case 'Baby Stroller': 
    return require('../../assets/Images/stroller.png');
    case 'Reduced Mobility': 
      return require('../../assets/Images/Reduced_Mobility.png');
    case 'Hidden Disabilities': 
      return require('../../assets/Images/Hidden_Disabilities.png');
    case 'Airlines Assistance': 
      return require('../../assets/Images/Assistance.png');
    case 'Medical Services': 
      return require('../../assets/Images/stethoscope.png');
    default:
      return require('../../assets/Images/wheelchair.png');
  }
}

export function TravelingChildItems({ item, length, index, onExpand }) {
  let desc = item.description && item.description.replace(/<(.|)*?>/g, '\n');
  return (
    <View
      style={[
        style.travellingItemContainer,
        { borderBottomWidth: length - 1 == index ? 1 : 0 },
      ]}
    >
      <Pressable style={style.rowAlign} onPress={onExpand}>
        <View style={style.widthAlign}>
       {/* <Image source={require("../../assets/Images/favorite.png")} style={style.travellingItemIcon} /> */}
       <Image source={GetImage(item.title)} style={style.travellingItemIcon} />
        </View>

        <View
          style={{
            width: "70%",
          }}
        >
          <Text style={style.travellingItemTitle}>{item.title}</Text>
        </View>
        <View
          style={{
            width: "15%",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={
              item.isExpandable
                ? require("../../assets/Images/collapse.png")
                : require("../../assets/Images/Expand.png")
            }
            style={style.rightIcon}
          />
        </View>
      </Pressable>
      {item.isExpandable && (
        <View
          style={{
            width: "100%",
            marginTop: size(10),
            flexDirection: "row",
          }}
        >
          <View style={{ width: "15%" }}>
            <Text>{""}</Text>
          </View>
          <View
            style={{
              width: "85%",
            }}
          >
            <Image
            source={require("../../assets/Images/SAbackground.png")}

            /*  source={{
                uri: "https://www.niehs.nih.gov/research/supported/translational/peph/podcasts/2016/mar29_childcare/img842390.jpg",
              }} */
              style={style.travellingItemImage}
            />
            {/* <Text style={style.travellingInfo}>{item.text}</Text> */}
            <View style={{marginTop: 10}}>
              <SeeMore numberOfLines={2}>
                  {desc}
                </SeeMore>
              {/* <HTMLView
                value={<div>${item.description}</div>}
                stylesheet={StyleSheet.create({
                  div: {
                    fontSize: size(15),
                    color: black,
                    fontFamily: MontserratRegular,
                    // marginLeft: "17%",
                    marginTop: size(10),
                    paddingRight: size(5),
                  },
                })}
              /> */}
            </View>
          </View>
        </View>
      )}
      {/* {!item.isExpandable && !item.expand && (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "15%" }}>
            <Text>{""}</Text>
          </View>
        </View>
      )} */}
    </View>
  );
}