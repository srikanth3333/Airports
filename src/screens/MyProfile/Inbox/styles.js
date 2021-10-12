import React from "react";
import {  StyleSheet} from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white } from "../../assets/colors";

let HeaderContainer = styled.View`
  margin-top: ${hp('2.2%')};
  margin-left: ${wp('7.64%')};
`;

export const InboxStyles = {
  HeaderContainer,
}