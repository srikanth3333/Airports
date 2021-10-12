
import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { MontserratBold, MontserratRegular } from "../../../assets/font";

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
import { BackgroundImage } from "../../../components/Login";
import { AuthContext } from "../../../utils/constants";
import { postUserLogot } from "../../Auth/action";

class Logout extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      isEmailSent: false,
      isPassswordReset: false,
    };
  }

  removeTokenFormAsyncStorage = async () => {
    const { setLogin } = this.context;
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('isLoggedIn');
    setLogin(false);
  };

  render() {
    const { isEmailSent, isPassswordReset } = this.state;
    const {navigation}=this.props
    return (
      <SafeView>
        <BackgroundImage
          img={require("../../../assets/Images/Logoutscreen.png")}
        />
        <AuthContainer>
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
          >
              <MarginTop top={size(-66)} />
            <AuthHeader
              navigation={navigation}
              title={
                <Text style={[styles.loginTitle,{fontSize:size(23),marginTop:size(80)}]}>
                  <LightText text={"DO YOU WANT TO\n"} />
                  LOGOUT <LightText text={"FROM\n"} />
                  MYAIRPORT<LightText text={"?\n"} />
                </Text>
              }
            />
            <SubContainer>
              <MarginTop top={size(-30)} />
              <ButtonWithBackground
                onPress={() => {
                  this.props.postUserLogot();
                  this.removeTokenFormAsyncStorage();
                }}
                text={"YES"}
              />
              <MarginTop top={size(30)} />
              <Text
                style={styles.dontWantLogout}
                onPress={()=>navigation.goBack()}
              >
                  I DO NOT WANT TO LOGOUT
              </Text>
            </SubContainer>
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
  postUserLogot: postUserLogot,
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
