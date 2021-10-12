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
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import { SubContainer } from "../../../components/ForgotPassword";
import {
  BackgroundImage,
  LoginContainer,
  LoginSubContainer,
} from "../../../components/Login";
import { height } from "../../../components/Login/constant";
import { postResetEmail,resetPassword } from "../action";
import { connect } from "react-redux";
import Loader from "../../../components/Loader";
import Errorinfo from "../../../components/Errorinfo";
import TextBoxWithBackground from "../../../components/TextInput";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailSent: false,
      isPassswordReset: false,
    };
    this.inputs = {};
  }

  submitRestetEmail = () => {
    if (this.state.validEmail) {
      let data = { email: this.state.Email };
      this.props.postResetEmail({
        data,
        onSuccess: (data) => {
          this.setState({ isEmailSent: true });
        },
        onError: (err) => this.setState({ showerror: err }),
      });
    }
  };

  SubmitResetPasswordWithCode = () => {
    if (
      this.state.validPasswordCheck &&
      this.state.validPassCode &&
      this.state.validPassword
    ) {
      if (this.state.password === this.state.passwordcheck) {
        const data = {
          emailAddress:this.state.Email,
          newPassword: this.state.password,
          confirmNewPassword: this.state.passwordcheck,
          PasswordResetCode: this.state.passcode,
        };
        this.props.resetPassword({
          data,
          onSuccess: (data) => {
            this.setState({ isPassswordReset: true });
          },
          onError: (err) => this.setState({ showerror: err }),
        });
      } else {
        Alert.alert("Password is not matching");
      }
    }
  };

  setReference = (name, comp) => {
    this.inputs[name] = comp;
  };

  handleOnSubmitEditing = (inputName) => {
    this.inputs[inputName].focus();
  };

  render() {
    const { isEmailSent, isPassswordReset } = this.state;
    return (
      <SafeView>
        <BackgroundImage
          img={require("../../../assets/Images/ResetPasswordScreen.png")}
        />
        {this.state.showerror ? (
          <View style={{ marginTop: "4%", marginHorizontal: 16 }}>
            <Errorinfo message={this.state.showerror} />
          </View>
        ) : null}
        <AuthContainer>
          <Loader loading={this.props.loading} />
          {isEmailSent && (
            <Pressable
              onPress={() => {
                this.setState({
                  isEmailSent: false,
                  isPassswordReset: false,
                });
              }}
              style={{
                resizeMode: "contain",
                position: "absolute",
                top: size(25),
                right: size(25),
              }}
            >
              <Image
                source={require("../../../assets/Images/Close.png")}
                style={{
                  width: size(25),
                  height: size(25),
                }}
              />
            </Pressable>
          )}
          {!isPassswordReset ? (
            !isEmailSent ? (
              <KeyboardAwareScrollView
                style={{
                  flex: 1,
                }}
              >
                <AuthHeader
                  navigation={this.props.navigation}
                  title={
                    <Text style={styles.loginTitle}>
                      <LightText text={"RESET\n"} />
                      PASSWORD
                    </Text>
                  }
                />
                <MarginTop top={size(60)} />
                <TextBoxWithBackground
                  onChangeText={(Email) => {
                    this.setState({ Email: Email });
                  }}
                  placeholder={"Enter Email"}
                  label={"email"}
                  returnKeyType={"next"}
                  value={this.state.Email}
                  isError={(isError) => this.setState({ validEmail: !isError })}
                />

                <SubContainer>
                  {/* <TextBox onForgot={() => {}} /> */}
                  <MarginTop top={size(-30)} />
                  <ButtonWithBackground
                    onPress={() => this.submitRestetEmail()}
                    text={"SUBMIT"}
                  />
                </SubContainer>
              </KeyboardAwareScrollView>
            ) : (
              <KeyboardAwareScrollView
                style={{
                  flex: 1,
                }}
              >
                <Image
                  source={require("../../../assets/Images/email.png")}
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
                  <LightText
                    text={"Please check your\nemail and enter the\n"}
                  />
                  {"reset password\n"}code below
                </Text>
                <SubContainer>
                  <TextBoxWithBackground
                    onChangeText={(password) => {
                      this.setState({ password: password });
                    }}
                    placeholder={"New Password"}
                    label={"password"}
                    returnKeyType={"done"}
                    referenceName="login_password"
                    setReference={this.setReference}
                    value={this.state.password}
                    onSubmitEditing={() =>
                      this.handleOnSubmitEditing("login_password_check")
                    }
                    isError={(isError) =>
                      this.setState({ validPassword: !isError })
                    }
                  />
                  <TextBoxWithBackground
                    onChangeText={(passwordcheck) => {
                      this.setState({ passwordcheck: passwordcheck });
                    }}
                    placeholder={"Re-enter New Password"}
                    label={"password"}
                    returnKeyType={"done"}
                    referenceName="login_password_check"
                    onSubmitEditing={() =>
                      this.handleOnSubmitEditing("login_valid_check")
                    }
                    setReference={this.setReference}
                    value={this.state.passwordcheck}
                    isError={(isError) =>
                      this.setState({ validPasswordCheck: !isError })
                    }
                    extraStyle={{
                      marginVertical: 20,
                    }}
                  />
                  <TextBoxWithBackground
                    onChangeText={(passcode) => {
                      this.setState({ passcode: passcode });
                    }}
                    placeholder={"Verification Code"}
                    label={"verification code"}
                    returnKeyType={"done"}
                    referenceName="login_valid_check"
                    setReference={this.setReference}
                    value={this.state.passcode}
                    keyboardType={"number-pad"}
                    isError={(isError) =>
                      this.setState({ validPassCode: !isError })
                    }
                  />
                  <ButtonWithBackground
                    onPress={() => this.SubmitResetPasswordWithCode()}
                    text={"RESET PASSWORD"}
                  />
                </SubContainer>
              </KeyboardAwareScrollView>
            )
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
                <LightText text={"You have \n"} />
                successfully{"\n"}
                Reset your password.
                <LightText text={"\nPlease go to login\nscreen"} />
              </Text>
              <ButtonWithBackground
                onPress={() => this.props.navigation.navigate("Login")}
                text={"DONE"}
              />
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
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  postResetEmail: postResetEmail,
  resetPassword:resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
