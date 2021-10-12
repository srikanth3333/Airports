import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BodyText_11B, BodyText_12B, BodyText_14 } from "../../themes/common";
import { fonts } from "../../assets/Fonts/font";

export const SplashView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${wp("44%")};
  width: ${wp("100%")};
  /* background-color: ${(props) => props.theme.cardBackground}; */
  background-color: #512d6d;
`;

export const MainText = styled(BodyText_14)`
  color: white;
  align-self: flex-start;
  padding-left: ${wp("10%")};
  padding-right: ${wp("12%")};
  font-family: ${(props) =>
    props.inbox ? fonts.OpenSansBold : fonts.OpenSansRegular};
`;

export const DateView = styled.View`
  position: absolute;
  bottom: ${wp("5.5%")};
`;

export const SubText = styled(BodyText_11B)`
  color: white;
  align-self: flex-start;
  padding-left: ${wp("10%")};
  padding-right: ${wp("12%")};
  font-family: ${(props) =>
    props.inbox ? fonts.OpenSansBold : fonts.OpenSansRegular};
`;

export const SplashSubView = styled.View`
  flex-direction: row;
`;

export const TextView = styled.View`
  width: ${(props) => (props.inbox ? wp("85%") : wp("84%"))};
  padding-top: ${wp("5.5%")};
`;

export const SImage = styled.Image`
  width: ${(props) => (props.inbox ? wp("14.2%") : wp("13.5%"))};
  height: ${wp("44%")};
  margin-right: ${wp("1%")};
`;
