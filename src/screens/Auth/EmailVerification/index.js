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
  Keyboard
} from "react-native";
import { connect } from "react-redux";
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
} from "../../../components/Login";
import { height } from "../../../components/Login/constant";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { black, grey } from "chalk";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { postVerifyEmail,postResetEmail,postResendVerifyCode } from "../action";
import { isEmpty } from "../../../utils/globalMethods";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../utils/constants";
import Errorinfo from "../../../components/Errorinfo";


class EmailVerification extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      otpCode: undefined,
      clearInput: false,
    };
  }


  submitRestetVerifcationCode = () => {
      const { SignUpData } = this.props;
      let data = {tokenId:SignUpData.signupdata.userid && SignUpData.signupdata.userid.userId};
      this.props.postResendVerifyCode({
        data,
        onSuccess: (data) => {
          this.setState({ isEmailSent: true,showerror:'Verification code sent sucessfully',sucess:true});
        },
        onError: (err) => this.setState({ showerror: err,sucess:false,otpCode:''}),
      });
  };

  submitOtpToVerifyEmail = () => {
    const { SignUpData, postVerifyEmail } = this.props;
    const { otpCode, isVerified } = this.state;
    if (otpCode && !isEmpty(SignUpData)) {
      let data = new FormData();
      data.append("verificationToken", otpCode);
      data.append("isEVoucher", true);
      data.append("emailAddress", SignUpData.signupdata.emailAddress);
      data.append("country", SignUpData.signupdata.origin);
      let id = otpCode;
      let tokenId =
        SignUpData.signupdata.userid && SignUpData.signupdata.userid.userId;
      postVerifyEmail({
        id,
        tokenId,
        data,
        onSuccess: (data) => {
          console.log("SucccessssDataaa", data);
          this.setState({ isVerified: !isVerified }, () => {
            const { setLogin } = this.context;
            setLogin(true);
          });
        },
        onError: (err) => this.setState({showerror:err,otpCode:''}),
      });
    }
  };

  render() {
    const { isVerified } = this.state;
    return (
      <SafeView>
        <BackgroundImage
          img={require("../../../assets/Images/EmailVerification.png")}
        />
        
        <AuthContainer>
          <Loader loading={false} />
          {!isVerified ? (
            <KeyboardAwareScrollView
              style={{
                flex: 1,
              }}
            >
              <AuthHeader
                navigation={this.props.navigation}
                title={
                  <Text style={styles.loginTitle}>
                    <LightText text={"EMAIL\n"} />
                    VERIFICATION
                  </Text>
                }
              />
              <Text
                style={[
                  styles.loginTitle,
                  { fontSize: size(19), marginTop: size(80) },
                ]}
              >
                <LightText text={"Please check your email and\nenter the "} />
                verification code below
              </Text>
              <SubContainer>
                <OTPInputView
                  pinCount={6}
                  style={{ height: size(50), marginBottom: size(20) }}
                  codeInputFieldStyle={{
                    width: size(30),
                    fontSize: size(16),
                    color: black,
                    height: size(45),
                    borderWidth: 0,
                    borderBottomWidth: 3,
                  }}
                  code={this.state.otpCode}
                  // onCodeChanged={(code) => {
                  //   this.setState({ otpCode: code });
                  //   let userCode = code.slice(-1)
                  //   if(userCode.match(/^[^a-zA-Z0-9]+$/)) {
                  //     this.setState({clearInput:true})
                  //     this.setState({ otpCode: '' });
                  //     alert('wrong input')
                  //   }
                  // }}
                  onCodeChanged={(text) => {
                      this.setState({
                        otpCode: text.replace(/[^0-9]/g, ''),
                      });
                  }}
                  // onCodeFilled={(code) => {
                  //   this.setState({ otpCode: code });
                  // }}
                  clearInputs={this.state.clearInput}
                  keyboardType={"number-pad"}
                  returnKeyType="done"
                  editable={true}
                />
                  {this.state.showerror ? (
                      <View style={{  marginHorizontal: 16, justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{color: '#72bcd4'}}>{this.state.showerror}</Text>
                      </View>
                    ) : null}
                <ButtonWithBackground
                  onPress={() => this.submitOtpToVerifyEmail()}
                  text={"SUBMIT"}
                />
                <Text
                  style={[styles.forgotPassTxt, { marginTop: size(30) }]}
                  onPress={() =>
                    this.submitRestetVerifcationCode()
                  }
                >
                  RESEND VERIFICATION CODE
                </Text>
              </SubContainer>
            </KeyboardAwareScrollView>
          ) : (
            <KeyboardAwareScrollView
              style={{
                flex: 1,
                padding: 20,
              }}
            >
              <Image
                source={require("../../../assets/Images/thumbs-up.png")}
                style={{
                  height: size(40),
                  width: size(40),
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
              />
              <Text
                style={[
                  styles.loginTitle,
                  { fontSize: size(19), marginTop: size(20) },
                ]}
              >
                <LightText text={"Hooray! "} />
                You have successfully <LightText text={"created\n"} />
                {"MYairpot App \n"}account
              </Text>
              <ButtonWithBackground onPress={() => {}} text={"CONTINUE"} />
            </KeyboardAwareScrollView>
          )}
        </AuthContainer>
      </SafeView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    SignUpData: state.SplashReducer,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  postVerifyEmail: postVerifyEmail,
  postResetEmail:postResetEmail,
  postResendVerifyCode:postResendVerifyCode
};
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
