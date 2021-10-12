import { StyleSheet, I18nManager } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {BodyText_13, BodyText_14B} from '../../themes/common';
import { OpenSansBold, MontserratRegular, OpenSansRegular, CenturyGothicRegular, MontserratBold } from "../../assets/font";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: ${(props) =>props.sucess?props.theme.Green:props.theme.red};
  min-height: ${wp("12%")};
`;

export const ErrorContainer = styled.View`
  padding-left: ${wp("2%")};
  padding-right: ${wp("2%")};
  width: ${wp("89%")};
  padding-top: ${wp("3.5%")};
  padding-bottom: ${wp("3.5%")};
  line-height: ${wp("3%")};
`;

export const ErrorTitle = styled(BodyText_14B)`
  text-align: left;
  align-items: center;
  color: ${(props) => props.theme.white};
  font-family:${CenturyGothicRegular};
`;