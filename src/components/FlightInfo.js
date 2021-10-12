import React, {PureComponent} from 'react';
import moment from 'moment';
import {
  SafeAreaView,
  FlightInfoStyleheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { size } from "../assets/size";
//import { FlightInfoStyle } from '../screens/FlightInfo/style';
import Header from "../components/Header";
import { TravelDropDown } from './SpecialAssistance';
import styles from "../assets/styles";
import { isEmpty } from 'lodash'
import { statusCodeMap, DEFAULT_STATUS_CODE,DEFAULT_STATUS_TEXT } from '../general/constants/flightStatuses'
import styled from 'styled-components';


export function FlightInfoHeader({ onDatePress, date, time, setValue, placeholder, dropDown, value }) {
  return (
    <View style={[styles.headerContainer,{paddingHorizontal: RFValue(14),}]} >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
       {/* <Image
          source={require('../assets/Images/Back_Arrow.png')}
          style={styles.backArrow}
       /> */}
      <Header/>
        <Text style={[styles.boldTitle,{fontSize:size(20),marginLeft:size(-5)}]}>Flight</Text>
        <Text style={[styles.lightTitle,{fontSize:size(20)}]}>Information</Text>
      </View>

      <TravelDropDown
       list={dropDown}
       placeholder={placeholder}
       setValue={setValue}
       value={value}
       extraStyle={{
       right:10,
       top:10,
       width:'26%'
       }}
        />
    </View>
  );
}
export function KLIA({color, text,onChangeKlia,number}) {

  return (
    <TouchableOpacity
    onPress={()=>{
      onChangeKlia(number)
    }}
      style={[
        styles.flightType,
        {
          backgroundColor: color ? 'rgb(0,104,176)' : 'white',
          marginLeft: 10,
          borderWidth: color ? 0 : 1,
        },
      ]}>
      <Text style={[styles.flightTypeText, {color: color ? 'white' : 'black'}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
export function SearchBar({onChangeHandler, onFocusHandler,onChangeKlia,selected}) {
  return (
    // <View>
    <View style={styles.searchBarContainer}>
      <View
      style={{
        //borderWidth: 1,
        borderRadius: size(30),
        width: "100%",
        marginTop: size(20),
        paddingRight: size(15),
        marginLeft: size(12),
        // paddingVertical:size(0),
        height:size(40),
        flexDirection: "row",
        backgroundColor:'white',
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >

        <TextInput
          style={styles.searchInputTextBox}
          onChange={onChangeHandler}
         onFocus={onFocusHandler}
          placeholder={'Search Flight'}
        />
        <Image
          source={require('../assets/Images/Departure_Icon.png')}
          style={styles.departureIcon}
        />
      </View>

      {/* </View> */}


      <View
        style={{
          width:'45%',
          height:size(40),
          flexDirection:"row",
          //borderWidth:1,
          borderRadius:40,
          marginLeft:10,
          marginTop: size(-110),
          backgroundColor:'white',
        }}
      >
        <TouchableOpacity
          style={{
            width:'50%',
            backgroundColor:selected<=0?'rgb(233,82,138)':'white',
            paddingVertical:size(8),
            alignItems:"center",
            justifyContent:"center",
            borderRadius:40,
            paddingVertical:3
          }}
          onPress={()=>onChangeKlia(0)}
        >
          <Text
            style={{
              // fontFamily:MontserratRegular,
              color:selected<=0?'white':'black',
              fontSize:size(11)
            }}
          >DEPARTURE</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width:'50%',
            backgroundColor:selected>0?'rgb(233,82,138)':'white',
            paddingVertical:size(8),
            alignItems:"center",
            justifyContent:"center",
            borderRadius:40,
          }}
          onPress={()=>onChangeKlia(1)}
        >
  <Text  style={{
              // fontFamily:MontserratRegular,
              color:selected>0?'white':'black',
              fontSize:size(11)
            }}>ARRIVAL</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
}
export function FlightInfoText({placeName, time}) {
  return (
    <View style={{marginLeft: 20,width:RFValue(78),}}>
      <Text style={styles.placeName}>{placeName}</Text>
      <Text style={[styles.flightTimeText]}>{time}</Text>
    </View>
  );
}
export function NodataFound(){
  return(
    <View
    style={{
      position:"absolute",
      top:'50%',
      alignSelf:"center"
    }}
  >
    <Text
      style={styles.headerText}
    >
      No Data Found
    </Text>
  </View>
  )
}
export class FlightDetail extends React.PureComponent {

  render() {
    const {
      statusCode,
      flightNumber,
      location,
      time,
      gate,
      belt,
      airline,
      apiImageSource,
      onPress
    } = this.props
    const timeWrap=time.replace(", ", ", \n");

    let status = DEFAULT_STATUS_CODE;
    let statusText = DEFAULT_STATUS_TEXT;

    const statusDetail = statusCodeMap[statusCode || ''];
    console.log(statusDetail)
    if (statusDetail) {
      status = statusDetail.status;
      statusText = statusDetail.text;
    }
      return (
        <TouchableOpacity style={styles.flightDetailContainer} onPress={this.props.onPress}>
          <View style={styles.flighImageDetailContainer}>
            {/* FLight Logo */}
            {/* {flightLogo} */}
            <Image
              source={apiImageSource}
              style={styles.flightLogo}
            />
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FlightInfoText
                // placeName={placeName}
                placeName={location}
                time={airline}
                // time={flightName}
              />
              <FlightInfoText
                placeName={flightNumber}
                time={timeWrap}
              />
            </View>
          </View>
          {!isEmpty(statusDetail) && statusDetail &&
          <View
          style={{
            marginRight: size(20),
          }}
          >
            <Image
              source={statusDetail.image}
              style={[styles.departureIcon, { alignSelf: "center" }]}
            />
          <Text numberOfLines={2} style={{fontWeight:'bold',alignSelf:'center', fontSize: size(12),paddingRight:16,paddingTop:2}}>{statusText.toUpperCase().replace(","," \n")}</Text>

          </View>}
        </TouchableOpacity>
      );
    }
  }