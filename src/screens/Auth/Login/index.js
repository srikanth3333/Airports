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
  AuthHeader,
  AuthContainer,
  MarginTop,
} from "../../../components/Common";
import {
  BackgroundImage,
  LoginContainer,
  LoginSubContainer,
} from "../../../components/Login";
import TextBoxWithBackground from "../../../components/TextInput";
import { height } from "../../../components/Login/constant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { postUserLogin } from "../action";
import { connect } from "react-redux";
import { AuthContext } from "../../../utils/constants";
import Loader from "../../../components/Loader";
import Errorinfo from "../../../components/Errorinfo";
import AsyncStorage from "@react-native-community/async-storage";
import { LoginPageStyle } from "./styles";
class Login extends React.Component {
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

  submitLogin = () => {
    if (this.state.validUsername && this.state.validPassword) {
      let data = {
        username: this.state.username,
        password: this.state.password,
        isEVoucher: true,
      };
      this.props.postUserLogin({
        data,
        onSuccess: (data) => {
          const { setLogin } = this.context;
          this.onSuccessLoginHandler(data)
          setLogin(true);
          
        },
        onError: (err) => {
          this.setState({ showerror: err })
          setTimeout(() => {
            this.setState({ showerror: false })
          }, 3000)
        },
      });
    }
  };

  onSuccessLoginHandler = async (data) => {
    if(data){
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('isLoggedIn', 'true');
    }
  }

  setReference = (name, comp) => {
    this.inputs[name] = comp;
  };

  handleOnSubmitEditing = (inputName) => {
    this.inputs[inputName].focus();
  };

  render() {
    return (
      <SafeView>
        <BackgroundImage
          img={require("../../../assets/Images/LoginScreen.png")}
        />
        <Loader loading={this.props.loading} />
        {this.state.showerror ? (
            <View style={{ marginTop: "4%", marginHorizontal: 16 }}>
              <Errorinfo message={this.state.showerror} />
            </View>
        ) : null}
        <AuthContainer>
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            behavior={Platform.OS == "ios" ? "padding" : undefined}
          >
            <AuthHeader
              navigation={this.props.navigation}
              title={<Text style={styles.loginTitle}>{"LOGIN"}</Text>}
            />
            <LoginPageStyle.MainView>
              <MarginTop top={size(60)} />
              <TextBoxWithBackground
                onChangeText={(username) => {
                  this.setState({ username });
                }}
                placeholder={"Email ID"}
                label={"email"}
                value={this.state.username}
                setReference={this.setReference}
                referenceName="login_email"
                keyboardType={'email-address'}
                returnKeyType={"next"}
                onSubmitEditing={() =>
                  this.handleOnSubmitEditing("login_password")
                }
                isError={(isError) =>
                  this.setState({ validUsername: !isError })
                }
              />
              <MarginTop top={size(20)} />
              <TextBoxWithBackground
                onChangeText={(password) => {
                  this.setState({ password });
                }}
                placeholder={"Password"}
                extraStyle={{
                  marginVertical: 20,
                }}
                label={"password"}
                returnKeyType={"done"}
                referenceName="login_password"
                setReference={this.setReference}
                value={this.state.password}
                isSecure={true}
                isError={(isError) =>
                  this.setState({ validPassword: !isError })
                }
              />

              <ButtonWithBackground
                onPress={() => this.submitLogin()}
                text={"SUBMIT"}
              />
              <Text
                style={styles.forgotPassTxt}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                FORGOT PASSWORD?
              </Text>
              <View style={styles.horizontalLine} />
              <Text
                style={styles.signUpText}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                SIGN UP
              </Text>
            </LoginPageStyle.MainView>
          </KeyboardAwareScrollView>
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
  postUserLogin: postUserLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
