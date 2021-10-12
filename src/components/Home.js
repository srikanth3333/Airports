import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../assets/styles";
const size = (value) => RFValue(value);

function MalasianLogo() {
  return (
    <Image
      source={require("../assets/Images/HomeScreenLogo.png")}
      style={styles.malasiaLogo}
    />
  );
}
export const HomeHeader = (props) => {
  return (
    <Pressable onPress={()=>props.navigation.navigate("MyProfile")} style={styles.homeHeaderContainer}>
      <MalasianLogo />
      <View style={styles.userIconContainer}>
        <Image
          source={require("../assets/Images/user.png")}
          style={styles.userIcon}
        />
        <Text style={styles.userTxt}>{props.children}</Text>
      </View>
      </Pressable>
  );
}
export function Titles() {
  return (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.favTitle}>Favourites</Text>
      <Text style={styles.exploreTitle}>{"Explore >"}</Text>
    </View>
  );
}
export const SearchBox = ({onChangeHandler, onFocusHandler,onPlaceholder}) => {
  return (
    <TouchableOpacity>
      <View style={styles.searchBoxContainer}>
        <TextInput
         style={styles.searchPlaceHolder}
         onChange={onChangeHandler}
         onFocus={onFocusHandler}
         //placeholder={'Search for Flights, Shopping, Dining'}
         placeholder={onPlaceholder}
         />
        <Image
          source={require("../assets/Images/magni.png")}
          style={styles.magniIcon}
        />
      </View>
    </TouchableOpacity>
  );
}
export function FavouriteBox({icon,title}) {
  return (
    <View
      style={styles.favBoxContainer}
    >
      <View
        style={styles.favIconContainer}
      >
        <Image
          style={styles.favIcon}
          source={icon}
        />
      </View>
      <Text
        style={styles.favText}
      >
        {title}
      </Text>
    </View>
  );
}
export function Scroll(props){
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom:useSafeAreaInsets().bottom+size(85)
      }}
    >
      {props.children}
    </ScrollView>
  )
}