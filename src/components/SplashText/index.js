import React, { Component, useState, useEffect } from "react";
import {
  SplashView,
  MainText,
  SplashSubView,
  SImage,
  SubText,
  DateView,
  TextView,
  View
} from "./style";
import moment from "moment";
import { Alert, Pressable } from "react-native";

const SplashText = ({ item, extraStyle, format, navigation, index,inbox }) => {
  return (
    <SplashView>
      <SplashSubView>
        {/* {inbox?<SImage source={require("../../assets/Images/be.png")} />:null} */}
        <TextView  inbox={inbox}>
          <MainText numberOfLines={5}>{item.blurbtext}</MainText>
          <DateView>
            <SubText inbox={inbox}>
              {moment(item.publishDate).format("D MMMM YYYY, h:mm a")}
            </SubText>
          </DateView>
        </TextView>

        <SImage inbox={inbox} source={require("../../assets/Images/Linespopup.png")} />

      </SplashSubView>
    </SplashView>
  );
};

export default SplashText;
