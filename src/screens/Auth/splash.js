import React, { PureComponent } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "../../assets/styles";
import LinearGradient from "react-native-linear-gradient";
import I18n from "../../localization/language";
import { connect } from "react-redux";
import { GetSplashData } from "./action";
import SplashText from "../../components/SplashText";
import { AuthContext } from "../../utils/constants";
import { height, width } from "../../components/Login/constant";
import { getLoginStatus } from "../../storage/reduxStore";
import { OpenSansRegular,OpenSansBold } from "../../assets/font";

const size = (value) => RFValue(value);

class Splash extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      selectedLanguage:2
    };
  }

  changeLanguage = (language) => {
    I18n.locale = language;
    this.setState({
      check: true,
    });
  };

  componentDidMount () {
    const { setLogin } = this.context;
    this.props.GetSplashData();
  }

  onDidFocus = () => {
    alert('SOmething')
  };

  render() {
    const { flightDetails, selectedLanguage } = this.state;
    var key = 0;
    let ParentView = Platform.OS === 'android' ? View : SafeAreaView
    return (
      <ParentView style={styles.container}>
        <ImageBackground
          style={{height:'100%'}}
          resizeMode={"cover"}
          source={require("../../assets/Images/Splash11.png")}
        >
          <LinearGradient
            colors={["#522D6D55", "#B31F8499"]}
            style={styles.flex}
          >
            <View style={[styles.flex]}>
              <Image
                style={styles.splashLogo}
                source={require("../../assets/Images/ma_logo.png")}
              />
            </View>
            <View style={styles.flex}>
              <View style={{}}>
                {this.props.loading ? (
                  <View
                    style={{
                      height: size(150),
                    }}
                  >
                    <ActivityIndicator size="large" color="#808080" />
                  </View>
                ) : (
                    <FlatList
                      horizontal
                      data={this.props.SplashInfoReducer}
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      style={{marginRight:'.1%'}}
                      renderItem={({ item, index }) => <SplashText item={item } index={index}/>}
                      keyExtractor={() => key++}
                      extraData={this.props.SplashInfoReducer}
                    />
                    
                )}
              </View>
              <View
                style={[
                  styles.flex,
                  {
                    paddingVertical: size(40),
                  },
                ]}
              >
                <View style={styles.flex}>
                  <Text style={styles.changeLanguage}>
                    {I18n.t("Change_Language")}
                  </Text>
                  <View style={styles.border} />
                  <View style={styles.rowCenter}>
                    <Text
                      onPress={() => {
                        this.changeLanguage("en");
                        this.setState({
                          selectedLanguage:0
                        })
                      }}
                      style={[styles.languageTxt,{fontFamily:I18n.locale=='en'?OpenSansBold:OpenSansRegular}]}
                    >
                      English{"  "}
                    </Text>
                    <Text
                      //style={styles.languageTxt}
                      onPress={() => {
                        this.changeLanguage("bm");
                        this.setState({
                          selectedLanguage:1
                        })
                      }}
                      style={[styles.languageTxt,{fontFamily:I18n.locale=='bm'?OpenSansBold:OpenSansRegular}]}

                    >
                      | Bahasa Malaysia |
                    </Text>
                    <Text
                      //style={styles.languageTxt}
                      onPress={() => {
                        this.changeLanguage("cn");
                        this.setState({
                          selectedLanguage:2
                        })
                      }}
                      style={[styles.languageTxt,{fontFamily:I18n.locale=='cn'?OpenSansBold:OpenSansRegular}]}

                    >
                      {"  "}中国
                    </Text>
                  </View>
                </View>

                <View style={[styles.rowCenter]}>
                  <Text
                    onPress={() => {
                     this.props.navigation.navigate("Login")
                    }}
                    style={styles.authText}
                  >
                    {I18n.t("Login")}
                    {I18n.t("Sign_Up")}
                  </Text>
                  {/* <Text
                    onPress={() => {
                      this.props.navigation.navigate("SignupEntry")
                    }}
                    style={styles.authText}
                  >
                    {I18n.t("Sign_Up")}
                  </Text> */}
                  <Text
                    onPress={() => {
                      this.props.navigation.navigate("TabStack")
                    }}
                    style={styles.authText}
                  >
                    {"  "}
                    {I18n.t("Guest")}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ParentView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SplashInfoReducer: state.SplashReducer.splashdata,
    SplashReducer: state.SplashReducer,
    loading: state.SplashReducer.loading,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  GetSplashData: GetSplashData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
