import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fontResize} from "../assets/Fonts/fontSize/fontSize";
import {fonts} from "../assets/Fonts/font";

export const AppWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.white};
`;
export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.white};
`;

export const AppWrapperView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.app_background};
`;

export const OnBoardingWrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.onboardWapper};
`;

export const Container = styled.View`
  flex: 1;
  width: ${wp("100%")};
`;

export const Row = styled.View`
  display: flex;
  flex-flow: row;
`;

export const Col_50 = styled.View`
  padding-left: ${wp("4.27%")};
  width: ${wp("50%")};
  padding-right: ${wp("4.27%")};
`;

export const Col_100 = styled.View`
  padding-left: ${wp("4.27%")};
  padding-right: ${wp("4.27%")};
  width: ${wp("100%")};
`;
export const HeadingLarge = styled.Text`
  font-family: ${fonts.OpenSansBold};
`;

export const HeadingMedium = styled.Text`
  font-family: ${(props) =>
    props.isBold ? fonts.OpenSansBold : fonts.OpenSansRegular};
`;

export const BodyText_33 = styled(HeadingMedium)`
  font-size: ${fontResize(33)};
`;
export const BodyText_33B = styled(HeadingLarge)`
  font-size: ${fontResize(33)};
`;

export const BodyText_24 = styled(HeadingMedium)`
  font-size: ${fontResize(24)};
`;
export const BodyText_24B = styled(HeadingLarge)`
  font-size: ${fontResize(24)};
`;

export const BodyText_20 = styled(HeadingMedium)`
  font-size: ${fontResize(20)};
`;
export const BodyText_20B = styled(HeadingLarge)`
  font-size: ${fontResize(20)};
`;

export const BodyText_18 = styled(HeadingMedium)`
  font-size: ${fontResize(18)};
`;
export const BodyText_18B = styled(HeadingLarge)`
  font-size: ${fontResize(18)};
`;

export const BodyText_17 = styled(HeadingMedium)`
  font-size: ${fontResize(17)};
`;
export const BodyText_17B = styled(HeadingLarge)`
  font-size: ${fontResize(17)};
`;
export const BodyText_16 = styled(HeadingMedium)`
  font-size: ${fontResize(16)};
`;
export const BodyText_16B = styled(HeadingLarge)`
  font-size: ${fontResize(16)};
`;

export const BodyText_15 = styled(HeadingMedium)`
  font-size: ${fontResize(15)};
`;
export const BodyText_15B = styled(HeadingLarge)`
  font-size: ${fontResize(15)};
`;

export const BodyText_14 = styled(HeadingMedium)`
  font-size: ${fontResize(14)};
`;
export const BodyText_14B = styled(HeadingLarge)`
  font-size: ${fontResize(14)};
`;
export const BodyText_13 = styled(HeadingMedium)`
  font-size: ${fontResize(13)};
`;
export const BodyText_13B = styled(HeadingLarge)`
  font-size: ${fontResize(13)};
`;

export const BodyText_12 = styled(HeadingMedium)`
  font-size: ${fontResize(12)};
`;
export const BodyText_12B = styled(HeadingLarge)`
  font-size: ${fontResize(12)};
`;

export const BodyText_11 = styled(HeadingMedium)`
  font-size: ${fontResize(11)};
`;
export const BodyText_11B = styled(HeadingLarge)`
  font-size: ${fontResize(11)};
`;

export const BodyText_10 = styled(HeadingMedium)`
  font-size: ${fontResize(10)};
`;
export const BodyText_10B = styled(HeadingLarge)`
  font-size: ${fontResize(10)};
`;

export const BodyText_9 = styled(HeadingMedium)`
  font-size: ${fontResize(9)};
`;
export const BodyText_9B = styled(HeadingLarge)`
  font-size: ${fontResize(9)};
`;

export const BodyText_8 = styled(HeadingMedium)`
  font-size: ${fontResize(8)};
`;
export const BodyText_8B = styled(HeadingLarge)`
  font-size: ${fontResize(8)};
`;

// Text Imput fonts style starts here

export const InputText_14 = styled.TextInput`
  font-family: ${(props) =>
    props.isBold ? fonts.OpenSansBold : fonts.OpenSansLight};
  font-size: ${fontResize(14)};
`;
export const InputText_16 = styled(InputText_14)`
  font-size: ${fontResize(16)};
`;

// TouchableOpacity fonts style starts here

export const Touch_13B = styled.TouchableOpacity`
  font-family: ${fonts.OpenSansBold};
  font-size: ${fontResize(13)};
`;
