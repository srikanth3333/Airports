import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ToggleSwitch from "../../components/ToggleSwitch/index";
import { AuthHeader } from "../../components/Common/index";
import { postUserInfo, loader, postProfileImage } from "../Auth/action";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SettingsStyle } from "./styles";
import { connect } from "react-redux";
import { isEmpty } from "../../utils/globalMethods";
import Header from "../../components/Header";
import styles from "../../assets/styles";
import { commanStyle } from "../../components/Common/style";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      promotion: false,
      flight: false
    }
  }

  componentDidMount(){
  }

  render() {
    const {alert, promotion, flight} = this.state;
    const {userProfile} = this.props;
    let usrdata = userProfile.notificationSettings;
    console.log('aahsghasghas', usrdata)
    return (
      <SettingsStyle.ViewArea>
        <SettingsStyle.Container>
        {/* <View style={{ flexDirection: "row", marginTop: 25 }}>
            <SettingsStyle.HeaderContainer>
            <AuthHeader navigation={this.props.navigation} />
            </SettingsStyle.HeaderContainer>
            <SettingsStyle.HeaderText>SETTINGS</SettingsStyle.HeaderText>
          </View> */}
          <View style={{ flexDirection: "row", marginTop: 25 ,marginLeft:25}}>
          <Header 
          navigation={this.props.navigation}
          leftTitle={"SETTINGS"}/>
          </View>
          <SettingsStyle.BorderPadding style={{ marginTop: 62 }}/>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignContent:'center',
              marginVertical: 30,
              marginHorizontal: 10
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ChangePassword")}
            >
              <View style={{flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                <SettingsStyle.Icon
                  source={require("../../assets/Images/PasswordIcon.png")}
                />
                <SettingsStyle.SettingsIcon> Change{"\n"}Password</SettingsStyle.SettingsIcon>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            style={{marginLeft:-60,}}
              onPress={() => this.props.navigation.navigate("Languages")}
            >
              
              <View  style={{
              flexDirection:'column',
              //marginLeft:-60,
              justifyContent: "center",
              alignContent:'center',
              // marginVertical: 30,
              // marginHorizontal: 10
            }}>
                <SettingsStyle.Icon
                  source={require("../../assets/Images/LanguageIcon.png")}
                />
              
                <SettingsStyle.SettingsIcon > Languages</SettingsStyle.SettingsIcon>
              </View>
            
            </TouchableOpacity>

           {/* <View>
              <SettingsStyle.Icon source={require("../../assets/Images/PushIcon.png")} />
              <SettingsStyle.SettingsIcon> Push{"\n"}Notification</SettingsStyle.SettingsIcon>
            </View>
           */}
          </View>
          <SettingsStyle.BorderPadding style={{ marginTop: 22 }} />

          <SettingsStyle.Subcontainer>
            <SettingsStyle.SettingsIcons >
              Alert
            </SettingsStyle.SettingsIcons>
            <SettingsStyle.HorizontalSpaceView/>
            <ToggleSwitch isTrue={usrdata.alert ? true : false} />
          </SettingsStyle.Subcontainer>

          <SettingsStyle.BorderPadding style={{ marginTop: 40 }} />
          <SettingsStyle.Subcontainer style={{ marginLeft: -18, }}>
            <SettingsStyle.SettingsIcons style={{ marginLeft: 13}}>Promotion</SettingsStyle.SettingsIcons>
            <SettingsStyle.HorizontalSpaceViewII/>
            <ToggleSwitch  isTrue={usrdata.promotions ? true : false} />
        
          </SettingsStyle.Subcontainer>

          <SettingsStyle.BorderPadding style={{ marginTop: 40 }} />
          <SettingsStyle.Subcontainer>
            <SettingsStyle.SettingsIcons style={{ marginLeft: -4, }}>My Flight</SettingsStyle.SettingsIcons>
            <ToggleSwitch   isTrue={usrdata.myFlight ? true : false}  />
          </SettingsStyle.Subcontainer>

          <SettingsStyle.BorderPadding style={{ marginTop: 35 }} />
        </SettingsStyle.Container>
      </SettingsStyle.ViewArea>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    userProfile: state.SplashReducer.userProfile,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  postUserInfo: postUserInfo,
  loader: loader,
  postProfileImage: postProfileImage
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
