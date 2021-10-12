import { black } from "chalk";
import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { maroon, maroonlight, white } from "../../../assets/colors";
import { MontserratRegular } from "../../../assets/Fonts";
import styles from "../../../assets/styles";
import {
  BackButton,
  LightText,
  MarginLeft,
  MarginTop,
  NotificationCard,
  Tabs,
  WhiteLines,
} from "../../../components/Common";
import { width } from "../../../components/Login/constant";
import PinkCard from "../../../components/SplashText";
import { windowHeight, windowWidth } from "../../../utils/constants";
import { connect } from "react-redux";
import { GetSplashData } from "../../Auth/action";
import SplashText from "../../../components/SplashText";
import { InboxStyles } from "./styles";

const size = (value) => RFValue(value);

class Inboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      data: [
        {
          id: 1,
          blurbtext:
            "Important information for a safer and seamless journey amidst the current COVID-19 outbreak.",
          publishDate: "2021-08-14T19:37:26+0000",
        },
        {
          id: 2,
          blurbtext:
            "Important information for a safer and seamless journey amidst the current COVID-19 outbreak.",
          publishDate: "2021-08-14T19:37:26+0000",
        },
        {
          id: 3,
          blurbtext:
            "Important information for a safer and seamless journey amidst the current COVID-19 outbreak.",
          publishDate: "2021-08-14T19:37:26+0000",
        },
        {
          id: 4,
          blurbtext:
            "Important information for a safer and seamless journey amidst the current COVID-19 outbreak.",
          publishDate: "2021-08-14T19:37:26+0000",
        },
        {
          id: 5,
          blurbtext:
            "Important information for a safer and seamless journey amidst the current COVID-19 outbreak.",
          publishDate: "2021-08-14T19:37:26+0000",
        },
      ],

    };
  }
  render() {
    const { navigation } = this.props;
    const { selectedTab, data, notiIndex, noticationText } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={styles.marginContainer}>
        <MarginTop top={size(7)} />
          <InboxStyles.HeaderContainer>
          <BackButton onPress={() => navigation.goBack()} />
          </InboxStyles.HeaderContainer>
          {/* <MarginTop top={size(7)} /> */}
          <View style={styles.alignStart}>
            {this.state.selectedTab == 0 ?
              <Text style={[styles.loginTitle, { fontSize: size(20),marginTop:size(-30),marginLeft:size(-35) }]}>
                INBOX

                <LightText text={" & NOTICES"} />
              </Text>
              :
              <Text style={[styles.loginTitle, { fontSize: size(20),marginTop:size(-30),marginLeft:size(-35) }]}>
                <LightText text={"INBOX & "} />
                NOTICIES
              </Text>
            }
            
          </View>
          <MarginTop top={size(65)} />
          <View style={styles.tabWrapper}>
            <Tabs
              iconPath={require("../../../assets/Images/Messages.png")}
              text={"Messages"}
              isActive={selectedTab == 0 ? true:false}
              onSelect={() => {
                this.setState({ selectedTab: 0 });
              }}
            />
            <Tabs
              iconPath={require("../../../assets/Images/Notifications.png")}
              text={"Notifications"}
              isActive={selectedTab == 1 ? true : false}
              onSelect={() => {
                this.setState({ selectedTab: 1 });
              }}
            />
          </View>
          

          {this.state.selectedTab == 0 ? (
            
            <View style={styles.tabSectionCon}>
              <FlatList
                data={this.props.SplashInfoReducer}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item, index }) => (
                  <View style={{ paddingVertical: 5 }}>
                    <SplashText item={item} index={index} inbox={true}/>
                  </View>
                )}
                extraData={this.props.SplashInfoReducer}
              />
            </View>
          ) : (
            <View style={styles.tabSectionCon}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ImageBackground
                    source={require("../../../assets/Images/noti_bg.png")}
                    style={[styles.linearContainer, {}]}
                    resizeMode={"stretch"}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "85%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: size(7),
                      }}
                    >
                      <View style={styles.carIconContainer}>
                        <Image
                          source={require("../../../assets/Images/car.png")}
                          style={styles.carIcon}
                        />
                      </View>
                      <Text style={styles.happyJrnyTxt}>{"You are on the way to Airport Happy Journey"}</Text>
                      {/* <View style={styles.upDownAroContainer}>
                        <Pressable
                          onPress={() => {
                            if (notiIndex != 0) {
                              this.setState({
                                notiIndex: notiIndex - 1,
                              });
                            }
                          }}
                        >
                          <Image
                            source={require("../../../assets/Images/uparrow.png")}
                            style={styles.arrow}
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            if (notiIndex != noticationText.length - 1) {
                              this.setState({
                                notiIndex: notiIndex + 1,
                              });
                            }
                          }}
                        >
                          <Image
                            source={require("../../../assets/Images/downarrow.png")}
                            style={styles.arrow}
                          />
                        </Pressable>
                      </View> */}
                    </View>
                  </ImageBackground>
                )}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SplashInfoReducer: state.SplashReducer.splashdata,
  };
};


export default connect(mapStateToProps, null)(Inboxes);
