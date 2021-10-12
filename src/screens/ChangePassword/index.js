import React from "react";
import { View, Text, Alert } from "react-native";
import {
  Container,
  ViewArea,
  BorderPadding,
  SettingsIcon,
  HeaderText,
  BackArrow,
  Icon,
  Subcontainer,
  // AuthContainer
} from "./styles";

import TextBoxWithBackground from "../../components/TextInput";
import {
  ButtonWithBackground,
  MarginTop,
  AuthContainer,
  SettingsContainer,
  AuthHeader,
} from "../../components/Common/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { size } from "../../assets/size";
import {
  BackgroundImage,
  LoginContainer,
  LoginSubContainer,
  LoginTextBoxes,
} from "../../components/Login";
import { connect } from "react-redux";
import { postChangePassowrd } from "../Auth/action";
import Loader from "../../components/Loader";
import Errorinfo from "../../components/Errorinfo";
import { CenturyGothicBold, CenturyGothicRegular } from "../../assets/font";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      username: "",
      password: "",
    };
    this.inputs = {};
  }

  setReference = (name, comp) => {
    this.inputs[name] = comp;
  };

  handleOnSubmitEditing = (inputName) => {
    this.inputs[inputName].focus();
  };

  submitPasswordChange = () => {
    if (
      this.state.password &&
      this.state.newpassword &&
      this.state.passwordagain
    ) {
      if (this.state.newpassword === this.state.passwordagain) {
        let data = {
          email: `${this.props.userdata.emailAddress}`,
          password: this.state.password,
          OldPassword: this.state.password,
          NewPassword: this.state.newpassword,
          ConfirmNewPassword: this.state.passwordagain,
        };
        this.props.postChangePassowrd({
          data,
          onSuccess: (data) => {
            this.setState({
              showerror: "Password Changed successfully",
              sucess: true,
            });
            setTimeout(() => {
              this.setState({
                showerror: "",
                sucess: false,
              });
            }, 3000)
          },
          onError: (err) =>
            this.setState({ showerror: err.message, sucess: false }),
        });
      } else {
        this.setState({ showerror: "New password is not matching" });
      }
    }
  };

  render() {
    return (
      <ViewArea>
        <View style={{ flexDirection: "row", marginTop: 25,marginLeft:30 }}>
          {/* <BackArrow source={require('../../assets/Images/BackArrow.png')}/> */}
          <AuthHeader navigation={this.props.navigation}  />
          <View style={{ marginLeft:-10,marginTop:1 }}>
            {/* <HeaderText style={{ color: "gray" }}>SETTINGS</HeaderText> */}
            <HeaderText>CHANGE PASSWORD</HeaderText>
          </View>
        </View>
        <SettingsContainer>
          <Loader loading={this.props.loading} />
          <View style={{ marginTop: -20 }} />
          <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
            {this.state.showerror ? (
              <View style={{ marginTop: "4%", marginHorizontal: 16 }}>
                <Errorinfo
                  message={this.state.showerror}
                  sucess={this.state.sucess}
                />
              </View>
            ) : null}
            <LoginSubContainer>
              <MarginTop top={size(20)} />
              <TextBoxWithBackground
                onChangeText={(password) => {
                  this.setState({ password });
                }}
                placeholder={"Current Password"}
                extraStyle={{
                  marginVertical: 20,
                  
                }}
                label={"password"}
                returnKeyType={"next"}
                referenceName="
                "
                setReference={this.setReference}
                value={this.state.password}
                isSecure={true}
                onSubmitEditing={() =>
                  this.handleOnSubmitEditing("change_password")
                }
                isError={(isError) =>
                  this.setState({ validPassword: !isError })
                }
              />
              <MarginTop top={size(20)} />
              <TextBoxWithBackground
                onChangeText={(newpassword) => {
                  this.setState({ newpassword });
                }}
                placeholder={"New Password"}
                extraStyle={{
                  marginVertical: 20,
                }}
                label={"password"}
                returnKeyType={"next"}
                referenceName="change_password"
                setReference={this.setReference}
                onSubmitEditing={() =>
                  this.handleOnSubmitEditing("change_passwordagain")
                }
                value={this.state.newpassword}
                isSecure={true}
                isError={(isError) =>
                  this.setState({ validPassword: !isError })
                }
              />
              <MarginTop top={size(20)} />

              <TextBoxWithBackground
                onChangeText={(passwordagain) => {
                  this.setState({ passwordagain });
                }}
                placeholder={" Re-Enter New Password"}
                extraStyle={{
                  marginVertical: 20,
                }}
                returnKeyType={"done"}
                referenceName="change_passwordagain"
                setReference={this.setReference}
                value={this.state.passwordagain}
                isSecure={false}
                isError={(isError) =>
                  this.setState({ validPassword: !isError })
                }
              />

              <ButtonWithBackground
                onPress={this.submitPasswordChange}
                text={"SAVE"}
              />
            </LoginSubContainer>
          </KeyboardAwareScrollView>
        </SettingsContainer>
      </ViewArea>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    userdata: state.SplashReducer.userProfile,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  postChangePassowrd: postChangePassowrd,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
