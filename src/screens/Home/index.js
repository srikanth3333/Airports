import React, { PureComponent } from "react";
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
  Pressable,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { ListItem } from 'react-native-elements';
import styles from "../../assets/styles";
import {
  FlightDetail,
  FlightInfoHeader,
  FlightInfoText,
  KLIA,
  NodataFound,
  SearchBar,
} from "../../components/FlightInfo";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { maroon, maroonlight, pinkwhite, red, white } from "../../assets/colors";
import {
  OpenSansBold,
  OpenSansLight,
  OpenSansRegular,
} from "../../assets/font";
import {
  FavouriteBox,
  HomeHeader,
  Scroll,
  SearchBox,
  Titles,
} from "../../components/Home";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";
import Menu from "../Menu";
import { AuthContext } from "../../utils/constants";
import { connect } from "react-redux";
import { getLoggenInUserData, getLoginStatus } from "../../storage/reduxStore";
import { isEmpty } from "../../utils/globalMethods";

const size = (value) => RFValue(value);
const { height, width } = Dimensions.get("window");
class Home extends React.Component {
  static contextType = AuthContext;


  
  constructor(props) {
    super(props);
    props.navigation.addListener('focus', () => {
      this.setUserName()
    });
    this.state = {
      data: [
        {
          title: "   Online Shopping",
          icon: require("../../assets/Images/OnlineShoping.jpeg"),
          navigateTo:''
        },
        {
          title: "Flights",
          icon: require("../../assets/Images/information.png"),
          navigateTo:'FlightInfo'
        },
        {
          title: "Essential & Services",
          icon: require("../../assets/Images/Essentials.png"),
          navigateTo:''
        },
        {
          title: "Stores",
          icon: require("../../assets/Images/Stores.png"),
          navigateTo:'Stores'
        },
        {
          title: "Dining",
          icon: require("../../assets/Images/dining.png"),
          navigateTo:''
        },
        {
          title: "Transport",
          icon: require("../../assets/Images/Transport.png"),
          navigateTo:'Transport'
        },
        // {
        //   title: "Key Info",
        //   icon: require("../../assets/Images/keyinfo.png"),
        //   navigateTo:''
        // },
      ],
      images: [
        {
          img: require("../../assets/Images/MyPlanGroup.png"),
          navigateTo:'MyPlan'
        },
        {
          img: require("../../assets/Images/Promotions.png"),
          navigateTo:'Promotion'
        },
      ],
      noticationText: [
        "You are on the way to Airport\nHappy Journey",
        "You are now at the Airport\nHappy Journey",
        "You reached your Destination\nHave a nice day",
      ],
      notiIndex: 0,
      userName: "",
      isMenuVisible: false,
      isShowListView: false,
      itemIndex: 0,
    };
    this.index = 0;
  }
  renderImages = ({ item }) => {
    return (
      <TouchableOpacity onPress = { () => { this.props.navigation.navigate(item.navigateTo)}}>
      <View>  
        <Image
      source={item.img}
      style={{
        height: width / 1.5,
        width: width / 1.5,
        resizeMode: "stretch",
      }}
    /></View>
    </TouchableOpacity>
  
    );
  };
  componentDidMount() {
    console.log(width * 0.78, "  ", width * 0.78 * 2);
    // setTimeout(()=>{

    this.setUserName();
    // },1000)
  }

  componentDidUpdate() {
    console.log('update')
    console.log(this.state.userName)
  }

  setUserName = () => {
    if (getLoginStatus() && !isEmpty(getLoggenInUserData())) {
      let userName = `${getLoggenInUserData().firstName}\n${
        getLoggenInUserData().lastName
      }`;
      this.setState({ userName });
    } else {
      this.setState({ userName: "Welcome \n Guest" });
    }
  };

  renderSpecialAssistance = () => {
    return (
      <TouchableOpacity
        style={styles.spaIconContainer}
        onPress={() => this.props.navigation.navigate('Assistance')}
      >
        <Pressable>
          <Image
            source={require("../../assets/Images/SpecialAssistance.png")}
            style={styles.userIcon}
          />
        </Pressable>
        <Text style={styles.userTxt}>{"Special \n Assistance"}</Text>
      </TouchableOpacity>
    );
  };

  renderProfile = () => {
    return (
      <Pressable style={styles.homeHeaderContainer}>
        <Pressable>
          <Image
            source={require("../../assets/Images/HomeScreenLogo.png")}
            style={styles.malasiaLogo}
          />

     <Pressable style={styles.spaIconContainer} onPress={()=>{
        navigation.navigate("SpecialAssistance");
      }}>
        </Pressable>
        </Pressable>
        {this.renderSpecialAssistance()}

        <TouchableOpacity
          onPress={() => {
            if (getLoginStatus() && !isEmpty(getLoggenInUserData())) {
              this.props.navigation.navigate("MyProfile");
            } else {
              this.props.navigation.navigate("Login");
            }
          }}
        >
          <View style={styles.userIconContainer}>
              <Image
                source={require("../../assets/Images/user.png")}
                style={styles.userIcon}
              />
            <Text numberOfLines={2} style={styles.userTxt}>
                {this.state.userName.length > 15 ? this.state.userName.substring(0, 15) + "..." : this.state.userName}
            </Text>
          </View>
        </TouchableOpacity>
      </Pressable>
    );
  };
  onChangeText = (e) => {
    console.log("sahsahgshsgahsa", e.nativeEvent.text);
    if (e.nativeEvent.text.length > 0) {
      this.setState({ isShowListView: false });
    }
  };

  textInputFocus = () => {
    this.setState({ isShowListView: true });
  };

  renderSearchList = () => {
    const dummyDData = [
      {id: 1, name: "Toilets"},
      {id: 1, name: "ATM"},
      {id: 1, name: "Taxi"},
      {id: 1, name: "Prayer Room"},
      {id: 1, name: "Lounge"}
    ]
    return(
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={dummyDData}
            renderItem={({ item }) => (
              <Pressable onPress={() => {}}>
                <View
                  style={{
                    width: "100%",
                    height: 50,
                    padding: 10,
                    marginLeft: 10,
                  }}
                >
                  <Text>{item.name}</Text>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      </View>
    );
  };
  render() {
    const {
      data,
      images,
      noticationText,
      notiIndex,
      userName,
      isMenuVisible,
      isShowListView,
      itemIndex,
    } = this.state;
    const { show, setShow } = this.context;
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: "#FCF4F9", marginTop: Platform.OS == "ios" ? -15 : 0 },
        ]}
      >
        <View
          style={{
            height: height,
            marginTop: size(8),
          }}
        >
          <View
            style={{
              height: height,
              marginTop: size(8),
            }}
          >
            {this.renderProfile()}
            <Pressable
              style={[styles.flexRow]}
              onPress={() => {
                this.props.navigation.navigate("Notification");
              }}
            >
              <ImageBackground
                source={require("../../assets/Images/noti_bg.png")}
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
                      source={require("../../assets/Images/Weather_Icon.png")}
                      style={styles.carIcon}
                    />
                  </View>
                  <Text style={styles.happyJrnyTxt}>
                   {/*  {noticationText[notiIndex]} */}
                    27.2° C        |     PutraJaya
                  </Text>
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
                        source={require("../../assets/Images/uparrow.png")}
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
                        source={require("../../assets/Images/downarrow.png")}
                        style={styles.arrow}
                      />
                    </Pressable>
                  </View> */}
                </View>
              </ImageBackground>
            </Pressable>

            <Scroll
              contentContainerStyle={{
                paddingBottom: 270,
              }}
            >
              <View
                style={{
                  padding: size(20),
                }}
              >
                <SearchBox
                  onChangeHandler={(event) => this.onChangeText(event)}
                  onFocusHandler={() => this.textInputFocus()}
                  onPlaceholder={"Search for Flights,Shopping,Dinning"}
                />
                {isShowListView ? this.renderSearchList() : null}
                <View
                  style={{
                    marginVertical: size(15),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {itemIndex > 0 ? (
                      <Pressable
                        onPress={() => {
                          this.setState({ itemIndex: itemIndex - 1 });
                          this.index -= 1;
                          this.scrollViewRef.scrollTo({
                            x: width * (0.78 * this.index),
                          });
                        }}
                      >
                        <Image
                          style={styles.sideIcon}
                          source={require("../../assets/Images/caret-line.png")}
                        />
                      </Pressable>
                    ) : null}
                    <ScrollView
                      horizontal
                      pagingEnabled
                      // scrollEnabled={false}
                      style={{
                        width: width * 0.78 * 3,
                      }}
                      ref={(ref) => {
                        this.scrollViewRef = ref;
                      }}
                      scrollEnabled={false}
                      showsHorizontalScrollIndicator={false}
                    >
                      {[0, 0, 0].map((item, i) => {
                        return (
                          <View
                            style={{
                              width: width * 0.78,
                            }}
                          >
                             <FlatList
                              data={data}
                              style={{
                                marginTop: 10,
                              }}
                              bounces={false}
                              renderItem={({
                                item: { icon, title, navigateTo },
                                index,
                              }) => {
                                return (
                                  <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => this.props.navigation.navigate(navigateTo)}
                                  >
                                    <FavouriteBox icon={icon} title={title} />
                                  </TouchableOpacity>
                                );
                              }}
                              numColumns={3}
                              removeClippedSubviews={true}
                              keyExtractor={(item, index) => index}
                            /> 
                            {/* <FlatList
                            data={data}
                            style={{
                              marginTop: size(10),
                            }}
                            bounces={false}
                            renderItem={({ item: { icon, title,navigateTo } }) => (
                              <FavouriteBox 
                                icon={icon} 
                                title={title} 
                                navigation={navigation} 
                                navigateTo={navigateTo}
                              />
                            )}
                            numColumns={3}
                            keyExtractor={(item, index) => index}
                          /> */}
                          </View>
                        );
                      })}
                    </ScrollView>
                    {itemIndex < 1 ? (
                      <Pressable
                        onPress={() => {
                          this.setState({ itemIndex: itemIndex + 1 });
                          this.index += 1;
                          this.scrollViewRef.scrollTo({
                            x: width * 0.78 * this.index,
                          });
                        }}
                      >
                        <Image
                          style={styles.sideIcon}
                          source={require("../../assets/Images/favRightArrow.png")}
                        />
                      </Pressable>
                    ) : null}
                  </View>
                </View>
                <View>
                  <Carousel
                    layout={"default"}
                    data={images}
                    renderItem={this.renderImages}
                    sliderWidth={width}
                    itemWidth={width - width * 0.4}
                    itemHeight={width}
                    inactiveSlideScale={0.7}
                    keyExtractor={(item, index) => index}
                    scrollEventThrottle={16}
                    inactiveSlideOpacity={1}
                    inactiveSlideShift={size(-18)}
                    hasParallaxImages={true}
                    activeSlideAlignment="start"
                  />
                </View>
              </View>
            </Scroll>
          </View>
        </View>

        {show && (
          <View>
            <Menu navigation={this.props.navigation} />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    SplashReducer: state.SplashReducer,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
