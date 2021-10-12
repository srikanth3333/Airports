import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  Image,
  Pressable,
  Text,
} from "react-native";
import { commanStyle } from "../Common/style";
import { HeaderStyle } from "./styles";

const Header = (props) => {
  const { navigation, leftTitle, rightTittle, promotion } = props;
  return (
    <HeaderStyle.MainView>
      <View style={{ paddingBottom: 0 }}>
        <Pressable onPress={() =>{props.routeNameData ? props.routeNameData.goBack() : navigation.goBack()}}>
          {promotion ? (
            <HeaderStyle.BackArrow
              tintColor="#ffffff"
              source={require("../../assets/Images/BackArrow.png")}
              resizeMode="contain"
            />
          ) : (
            <HeaderStyle.BackArrow
            tintColor="#000000"
              source={require("../../assets/Images/BackArrow.png")}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </View>
      <View>
        {promotion ? (
          <HeaderStyle.PromotionText   numberOfLines={1}
          ellipsizeMode="tail">{leftTitle}</HeaderStyle.PromotionText>
        ) : (
          <HeaderStyle.LeftText>{leftTitle}</HeaderStyle.LeftText>
        )}
      </View>
      <View>
        <HeaderStyle.RightText>{rightTittle}</HeaderStyle.RightText>
      </View>
    </HeaderStyle.MainView>
  );
};

export default Header;
