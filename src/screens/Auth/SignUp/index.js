import React from "react";
import { size } from "../../../assets/size";
import styles from "../../../assets/styles";
import {
  ButtonWithBackground,
  SafeView,
  AuthHeader,
  AuthContainer,
  LightText,
  MarginTop,
  DropDowns,
} from "../../../components/Common";
import { BackgroundImage, LoginSubContainer } from "../../../components/Login";
//import { ScrollView } from "react-native-keyboard-aware-scroll-view";
import TextBoxWithBackground from "../../../components/TextInput";
import { postSignUpData } from "../action";
import { connect } from "react-redux";
import { View, Text, ActivityIndicator, ScrollView} from "react-native";
import Loader from "../../../components/Loader";
import Errorinfo from "../../../components/Errorinfo";
import { SignupPageStyle } from "./styles";
import countries from '../../../utils/countries';
import DropDown from "../../../components/DropDown";
import {getCountry} from "../../../utils/globalMethods";
import { MontserratBold } from "../../../assets/font";
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: null,
      items: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
      ],
    };
    this.inputs = {};
  }

  setReference = (name, comp) => {
    this.inputs[name] = comp;
  };

  handleOnSubmitEditing = (inputName) => {
    this.inputs[inputName].focus();
  };

  submitSignUp = () => {
    if (
      this.state.validFirstName &&
      this.state.validLastName &&
      this.state.validEmail &&
      this.state.validPassword &&
      this.state.countryId
    ) {
      let data = {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        emailAddress: this.state.Email,
        username: this.state.Email,
        password: this.state.Password,
        origin:getCountry(countries,this.state.countryId),
      };
      this.props.postSignUpData(data);
    }
  };

  componentDidUpdate(prevProps, nextState) {
    if (this.props.SignUpData.signupdata !== prevProps.SignUpData.signupdata) {
      this.props.navigation.navigate("EmailVerification");
    } else if(this.props.SignUpData.signupdataError !== prevProps.SignUpData.signupdataError) {
      let errorMessage=this.props.SignUpData.signupdataError && this.props.SignUpData.signupdataError.errors[0].errorMessage
      this.setState({showerror:errorMessage})
    }
  }

  render() {
    const { open, value, items } = this.state;

    return (
      <SafeView>
        <BackgroundImage
          img={require("../../../assets/Images/SignUpScreen1.png")}
        />
        {this.state.showerror ? (
          <View style={{ marginTop: "4%", marginHorizontal: 16 }}>
            <Errorinfo message={this.state.showerror} />
          </View>
        ) : null}
        <AuthContainer isFromSignUp={true}>
          <Loader loading={this.props.loading} />
          {/* <ScrollView> */}
            <AuthHeader
              navigation={this.props.navigation}
              title={
                <Text style={styles.loginTitle}>
                  <LightText text={"SIGN"} />
                  {" UP"}
                </Text>
              }
            />
            <SignupPageStyle.MainView>
              <MarginTop top={size(20)} />
              <TextBoxWithBackground
                onChangeText={(firstname) => {
                  this.setState({ firstname: firstname });
                }}
                placeholder={"Enter First Name"}
                label={"first name"}
                setReference={this.setReference}
                referenceName="firstname"
                returnKeyType={"next"}
                onSubmitEditing={() =>
                  this.handleOnSubmitEditing("lastname")
                }
                value={this.state.firstname}
                isError={(isError) =>
                  this.setState({ validFirstName: !isError })
                }
              />
              <MarginTop top={size(20)} />
              <TextBoxWithBackground
                onChangeText={(lastname) => {
                  this.setState({ lastname: lastname });
                }}
                label={"last name"}
                placeholder={"Enter Last Name"}
                setReference={this.setReference}
                referenceName="lastname"
                returnKeyType={"next"}
                onSubmitEditing={() =>
                  this.handleOnSubmitEditing("email")
                }
                extraStyle={{
                  marginVertical: 20,
                }}
                value={this.state.lastname}
                isError={(isError) =>
                  this.setState({ validLastName: !isError })
                }
              />
              <MarginTop top={size(20)} />
              <TextBoxWithBackground
                onChangeText={(Email) => {
                  this.setState({ Email: Email });
                }}
                label={"email"}
                setReference={this.setReference}
                referenceName="email"
                returnKeyType={"next"}
                onSubmitEditing={() =>
                  this.handleOnSubmitEditing("password")
                }
                placeholder={"Enter Email"}
                value={this.state.Email}
                isError={(isError) => this.setState({ validEmail: !isError })}
              />
              <MarginTop top={size(20)} />
              <TextBoxWithBackground
                onChangeText={(Password) => {
                  this.setState({ Password: Password });
                }}
                placeholder={"Enter Password"}
                extraStyle={{
                  marginVertical: 20,
                }}
                label={"password"}
                setReference={this.setReference}
                referenceName="password"
                returnKeyType={"next"}
                value={this.state.Password}
                isSecure={true}
                isError={(isError) =>
                  this.setState({ validPassword: !isError })
                }
              />
              <MarginTop top={size(20)} />
             {/*  <DropDown
                  list={countries}
                  borderColor={"#B31F8472"}
                  borderWidth={0.51}
                  height={40}
                  placeholder={"#828282"}
                  onSelectValue={(value) =>
                   this.setState({countryId:value,dropDownOpen:false})
                  }
                  selectedValue={this.state.countryId}
                  placeholder={"Select a Country"}
                  dropDownOpen={() =>
                    this.setState({
                      dropDownOpen: true,
                    })
                  }
                  dropDownClose={this.state.dropDownOpen}
                /> */}

                  <DropDown
                  list={countries}
                  borderColor={"#B31F8472"}
                  borderWidth={1}
                  height={45}
                  onSelectValue={(value) =>
                    this.setState({ countryId: value, countryDropDown: false })
                  }
                  selectedValue={this.state.countryId}
                  placeholder={"Select a Country"}
                  dropDownOpen={() =>
                    this.setState({
                      countryDropDown: true,
                      genderDropDown: false,
                    })
                  }
                  dropDownClose={this.state.countryDropDown}
                />
              <View style={{marginTop: -25}}>
              <ButtonWithBackground
                onPress={() => this.submitSignUp()}
                text={"CREATE ACCOUNT"}
                extraStyle={{marginBottom: 10} }
              />
              </View>
           {/*   <Text
                style={{
                  fontSize: size(15),
                  color: "#0066B3",
                  textAlign: "center",
                  opacity: 0.6,
                  paddingHorizontal: 25,
                  marginVertical: size(13),
                }}
              >
                Already have an Account
                Login
              </Text> */}
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>

              <Text style={[styles.loginTitle, { fontSize: size(13),color:"#0066B3" }, 
              ]}
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
              >
                  <LightText text={"Already have an account \n"} />
                  <Text style={{color:"#232E69"}}>LOGIN</Text>
                </Text>


                <Text style={[styles.loginTitle, { fontSize: size(13),color:"#0066B3" ,}, 
              ]}
              onPress={() => {
                this.props.navigation.navigate('TabStack')
              }}
              >
                  <LightText text={"Continue as \n"} />
                  <Text style={{color:"#232E69"}}>GUEST</Text>
                </Text>
                </View>

              {/* <Text
                style={[
                  styles.forgotPassTxt,
                  { fontSize: size(13),color:"#0066B3",fontFamily:"CenturyGothic-Regular" },
                ]}
                onPress={() => {
                  this.props.navigation.navigate('TabStack')
                }}
              >
                Continue as
                <Text style={{color:"#232E69",fontSize: size(13),fontFamily:"CenturyGothic-Bold"}}> GUEST</Text>
              </Text> */}
              
            </SignupPageStyle.MainView>
          {/* </ScrollView> */}
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
  postSignUpData: postSignUpData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
