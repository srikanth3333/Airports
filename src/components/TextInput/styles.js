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
`;

let TextInputContainer = styled.View`
  flex-direction: row;
  border-color: ${(props) => props.theme.borderColorPink};
  border-left-width: 0.5;
  border-right-width: 0.5;
  border-width: 0.4;
`;

export const MATextinputStyle = {
  MainView,
  TextInputContainer
}