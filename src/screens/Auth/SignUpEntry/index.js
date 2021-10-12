import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { white } from "../../../assets/colors";
import { OpenSansBold, OpenSansRegular } from "../../../assets/font";
import { size } from "../../../assets/size";
import styles from "../../../assets/styles";
import {
  ButtonWithBackground,
  SafeView,
  MarginTop,
  AuthHeader,
  LightText,
  AuthContainer,
} from "../../../components/Common";
import { SubContainer, TextBox } from "../../../components/ForgotPassword";
import {
  BackgroundImage,
  LoginContainer,
  LoginSubContainer,
  LoginTextBoxes,
} from "../../../components/Login";
import { height } from "../../../components/Login/constant";
import { AuthContext } from "../../../utils/constants";

class SignupEntry extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      username: "",
      password: "",
    };
    this.inputs = {};
  }
  render() {
    return (
      <SafeView>
        <BackgroundImage
          img={require("../../../assets/Images/enter_email.jpg")}
        />

        <AuthContainer>
          <KeyboardAvoidingView
            style={{
              flex: 1,
            }}
            behavior={Platform.OS == "ios" ? "padding" : undefined}
          >
            <AuthHeader
              navigation={this.props.navigation}
              isSignupEntry={true}
              title={
                <Text style={[styles.loginTitle, { fontSize: size(23) }]}>
                  <LightText text={"Create a\n"} />
                  MYairports App
                  <LightText text={"\naccount today to\ngain more"} />
                </Text>
              }
            />
            <SubContainer>
              <ButtonWithBackground
                extraStyle={{ marginBottom: size(20) }}
                onPress={() => this.props.navigation.navigate("SignUp")}
                text={"SIGN UP"}
              />
              <Text
                style={[
                  styles.forgotPassTxt,
                  { fontSize: size(16), marginVertical: size(20) },
                ]}
                onPress={() => {
                  this.props.navigation.navigate('TabStack')
                }}
              >
                CONTINUE AS GUEST
              </Text>
              <View style={styles.horizontalLine} />
              <Text
                style={{
                  fontSize: size(15),
                  color: "#0066B3",
                  textAlign: "center",
                  opacity: 0.6,
                  paddingHorizontal: 25,
                  marginVertical: size(13),
                }}
              >
                Logging in via
                Facebook and Google is temporarily unavailable
              </Text>
            </SubContainer>
          </KeyboardAvoidingView>
        </AuthContainer>
      </SafeView>
    );
  }
}
export default SignupEntry;
