import React from "react";
import {  StyleSheet} from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { white } from "../../assets/colors";

let MainView = styled.View`
  flex: 1;
  justify-content: center;
`;

let TextInputContainer = styled.View`
  flex-direction: row;
  border-width: 0.4;
`;

export const SignupPageStyle = {
  MainView,
  TextInputContainer
}