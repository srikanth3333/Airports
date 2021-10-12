import React from "react";
import {  StyleSheet} from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white } from "../../assets/colors";

let FlatlistContainer = styled.View`
  width: ${'100%'};
  height: ${hp('45%')};
  padding-left: ${wp('2%')};
  padding-right: ${wp('2%')};
  justify-content: center;
  background-color: ${white};
`;

let IconViewContainerI = styled.View`
  margin-left: ${wp('17.54%')};
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-right: ${wp('10%')};
  margin-top: ${wp('10%')};
`;

let IconViewContainerII = styled.View`
  margin-left: ${wp('12%')};
  margin-bottom: ${wp('18%')};
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-right: ${wp('10%')};
`;

export const GeneralStyles = {
  FlatlistContainer,
  IconViewContainerI,
  IconViewContainerII
}