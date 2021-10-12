import React from "react";
import {  StyleSheet} from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white, red } from "../../assets/colors";

let MainContainer = styled.SafeAreaView`
  margin-left: ${wp("4.27%")};
  margin-right: ${wp("4.27%")};
`;
let Container = styled.View`
  height: ${hp("75%")};
`;

let FlatlistContainer = styled.View`
  width: ${wp('100%')};
  height: ${hp('90%')};
  padding-left: ${wp('2%')};
  padding-right: ${wp('2%')};
  justify-content: center;
  background-color: ${'#FBF7EF'};
  margin-top: ${wp('25%')};
`;

let IconViewContainerI = styled.View`
  margin-left: ${wp('5%')};
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-right: ${wp('10%')};
`;

let IconViewContainerII = styled.View`
  margin-left: ${wp('8%')};
  margin-bottom: ${wp('40%')};
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-right: ${wp('6.8%')};
`;
let IconViewContainerIII = styled.View`
  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const MyProfileStyles = {
  MainContainer,
  Container,
  FlatlistContainer,
  IconViewContainerI,
  IconViewContainerII,
  IconViewContainerIII,
}