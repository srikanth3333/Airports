import { black } from "chalk";
import React from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { pink } from "../../../../assets/colors";
import {
  CenturyGothicBold,
  CenturyGothicRegular,
  MontserratBold,
  MontserratRegular,
} from "../../../../assets/font";

import { size } from "../../../../assets/size";
import styles from "../../../../assets/styles";
import {
  ButtonWithBackground,
  SafeView,
  MarginTop,
  AuthHeader,
  LightText,
  AuthContainer,
} from "../../../../components/Common";
import { SubContainer } from "../../../../components/ForgotPassword";
import { BackgroundImage } from "../../../../components/Login";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailSent: false,
      isPassswordReset: false,
    };
  }
  render() {
    const { isEmailSent, isPassswordReset } = this.state;
    const { navigation } = this.props;
    return (
      <SafeView>
        <BackgroundImage
          img={require("../../../../assets/Images/reset-password-background.jpg")}
        />
        <View style={{ padding: size(20) }}>
          <AuthHeader
            navigation={navigation}
            title={
              <Text style={[styles.loginTitle, { fontSize: size(25) }]}></Text>
            }
          />
        </View>
        <AuthContainer>
          <KeyboardAwareScrollView
            style={styles.flex}
          >
            <Text
              style={styles.messdate}
            >
              01 Month 2021, 10:00 AM.
            </Text>
            <MarginTop top={size(20)}/>
            <Text
              style={styles.textPara}
                >
                {/* Important information for a safer and seamless journey amidst the current COVID-19 outbreak.Important information for a safer and seamless journey amidst the
                current COVID-19 outbreak.{"\n\n"} */}
                Important information for a safer and seamless journey amidst the current COVID-19 outbreak.Important information for a safer and seamless{"\n\n"}
                Important information for a safer and seamless journey amidst the current COVID-19 outbreak.Important information for a safer and seamless journey amidst the
                current COVID-19 outbreak.Important information for a safer and seamless journey
            </Text>
          </KeyboardAwareScrollView>
        </AuthContainer>
      </SafeView>
    );
  }
}
export default Message;
