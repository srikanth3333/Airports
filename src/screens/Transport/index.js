import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  LayoutAnimation,
  UIManager,
  Pressable,
  TouchableOpacity,
  StatusBarIOS,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "../../assets/styles";
import styled from "styled-components/native";
import { BackButton, MarginTop } from "../../components/Common";
import { CenturyGothicRegular, MontserratBold, MontserratRegular } from "../../assets/font";
import {
  Header,
  TravelDropDown,
  TopBackground,
  TransportTypes,
  TravelDetails,
} from "../../components/Transport/index";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { width } from "../../components/Login/constant";
import {
  AboutText,
  BlockContainer,
  BlockImage,
  BlockPadding,
  BlockText,
  BlueText,
  BXWalk,
  DestinationInput,
  DestiontionContainer,
  DetailsText,
  Estimation,
  HaldBox,
  HorizontalLine,
  HowFarAway,
  LightBoldText,
  LocationInTextContainer,
  MapViewConatainer,
  MarginLeft17,
  OnTheWay,
  OnWayContainer,
  OnwayTextCon,
  PinkRound,
  Reached,
  ReachedText,
  ReachedTextCon,
  RegionContainer,
  RightArrow,
  Row,
  RowAlign,
  RowAlignMent,
  SwapIcon,
  Time,
  TimeContainer,
  TimeIcon,
  TitleValue,
  ToDepartContainer,
  TransportContainer,
  TravelByVehicleContainer,
  TravelDetail,
  TravelMapConatiner,
  TravelMapTime,
  VerticalLines,
} from "./style";
import WebView from "react-native-webview";
import { GetTransportData, GetRateData, PostRate } from "./actions";
import { connect } from "react-redux";
import HTMLView from "react-native-htmlview";
import { black } from "../../assets/colors";

const size = (value) => RFValue(value);
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
function Stars({ array }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: "20%",
      }}
    >
      {array.map((item) => (
        <Image
          source={require("../../assets/Images/star.png")}
          style={{
            height: 14,
            width: 14,
            resizeMode: "contain",
            marginHorizontal: 5,
          }}
        />
      ))}
    </View>
  );
}
function PostRatings({ postRating }) {
  return (
    <View
      style={{
        width: "100%",
        marginVertical: size(20),
        marginLeft: size(10),
        alignItems: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: size(20),
          fontFamily: CenturyGothicRegular,
          color: "grey",
        }}
      >
        Post Rating
      </Text>
      {/* <View
        style={{
          flexDirection: "row",
          marginTop:10
        }}
      >
        {[0, 0, 0, 0, 0].map((item) => {
          return (
            <Pressable
              style={{
                marginHorizontal: 10,
              }}
              onPress={() => {}}
            >
              <Image
                source={require("../../Assets/Images/star.png")}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </Pressable>
          );
        })}
      </View> */}
      <AirbnbRating
        count={5}
        /* starImage={require("../../assets/Images/star.png")} */
        defaultRating={0}
        showRating={false}
        starContainerStyle={{
          width: "30%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        size={30}
        onFinishRating={postRating}
      />
      {/* <Rating
                fractions={0}
               
                jumpValue={1.0}
                ratingImage={require('../../Assets/Images/star.png')}
                imageSize={30}
                onFinishRating={postRating}
              /> */}
    </View>
  );
}
function RateBar({ width }) {
  return (
    <View
      style={{
        height: 20,
        width: "100%",
      }}
    >
      <View
        style={{
          height: 10,
          backgroundColor: "lightgrey",
          width: "100%",
        }}
      >
        <View
          style={{
            width: `${width}%`,
            height: 10,
            backgroundColor: "rgb(0,149,222)",
          }}
        />
      </View>
    </View>
  );
}
class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDown: [
        { label: "KLIA1", value: "klia1" },
        { label: "KLIA2", value: "klia2" },
      ],
      selectedTerminal: "klia1",
      open: false,
      transportType: [
        {
          activeIcon: require("../../assets/Images/Bus_hover.png"),
          inActiveIcon: require("../../assets/Images/Bus.png"),
        },
        {
          activeIcon: require("../../assets/Images/Car_hover.png"),
          inActiveIcon: require("../../assets/Images/Cars.png"),
        },
        {
          activeIcon: require("../../assets/Images/Ride_hover.png"),
          inActiveIcon: require("../../assets/Images/Ride.png"),
        },
        {
          activeIcon: require("../../assets/Images/Guide_hover.png"),
          inActiveIcon: require("../../assets/Images/Guide.png"),
        },
      ],
      isActiveIndex:-1,
      isShowAboutCar: false,
      transport: [],
      is_swapped: false,
      aboutCar: "",
      aboutTitle: "",
      ratings: {
        one_star: 0,
        second_star: 0,
        third_star: 0,
        fourth_star: 0,
        fifth_star: 0,
      },
      avgRate: "",
      path: "",
      totalRate: 0,
    };

    this.setValues = this.setValue.bind(this);
    this.scrollRef = null;
  }

  componentDidMount() {
    this.props.GetTransportData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(
      JSON.stringify(nextProps.Transport.data.response.data),
      "11new response"
    );
    if (nextProps.Transport.TransportSuccess) {
      if (nextProps.Transport.data.response.status == 200) {
        this.setState({
          transport: nextProps.Transport.data.response.data,
        });
      } else {
        // alert("Something went wrong!2");
      }
    } else {
      console.log(nextProps.Transport.error, "chec this error");
      // alert("Something went wrong!1");
    }

    if (nextProps.Transport.GetRateSuccess) {
      if (nextProps.Transport.data.response.status == 200) {
        console.log(nextProps.Transport.data.response.data, "check this first");
        console.log(
          nextProps.Transport.data.response.data.ratings.reduce((sum, item) => {
            return sum + item.count;
          }, 0),
          "check this count"
        );
        let totalRate = 0;
        if (nextProps.Transport.data.response.data.ratings.length > 0) {
          totalRate = nextProps.Transport.data.response.data.ratings.reduce(
            (sum, item) => {
              return sum + item.count;
            },
            0
          );
        }

        let ratings = {
          one_star: 0,
          one_star_count: 0,
          second_star: 0,
          second_star_count: 0,
          third_star: 0,
          third_star_count: 0,
          fourth_star: 0,
          fourth_star_count: 0,
          fifth_star: 0,
          fifth_star_count: 0,
        };
        nextProps.Transport.data.response.data.ratings.map((item) => {
          if (item.rating == 1) {
            ratings.one_star = (item.count / totalRate) * 100;
            ratings.one_star_count = item.count;
          } else if (item.rating == 2) {
            ratings.second_star = (item.count / totalRate) * 100;
            ratings.second_star_count = item.count;
          } else if (item.rating == 3) {
            ratings.third_star = (item.count / totalRate) * 100;
            ratings.third_star_count = item.count;
          } else if (item.rating == 4) {
            ratings.fourth_star = (item.count / totalRate) * 100;
            ratings.fourth_star_count = item.count;
          } else if (item.rating == 5) {
            ratings.fifth_star = (item.count / totalRate) * 100;
            ratings.fifth_star_count = item.count;
          }
        });
        const {
          fifth_star_count,
          fourth_star_count,
          third_star_count,
          second_star_count,
          one_star_count,
        } = ratings;
        const avgRate =
          (5 * fifth_star_count +
            4 * fourth_star_count +
            3 * third_star_count +
            2 * second_star_count +
            1 * one_star_count) /
            totalRate || 0;
        console.log("cjeck logsss", totalRate, "dsssss", avgRate);
        this.setState({
          ratings,
          avgRate,
          totalRate: 0,
        });
      } else {
        // alert("Something went wrong!");
      }
    } else {
      // alert("Something went wrong!");
    }
  }
  setValue = (callback) => {
    this.setState((state) => ({
      selectedTerminal: callback(state.selectedTerminal),
    }));
  };
  onSetTransport = (index) => {
    if(this.state.isActiveIndex!=-1){

      if (index == 3) {
        this.setState({
          isActiveIndex: index,
          isShowAboutCar: false,
        });
      } else {
        this.setState({
          isActiveIndex: index,
        });
      }
    }
  };
  render() {
    const { navigation } = this.props;
    const {
      selectedTerminal,
      dropDown,
      open,
      value,
      items,
      transportType,
      isActiveIndex,
      isShowAboutCar,
      transport,
      is_swapped,
      aboutCar,
      aboutTitle,
      avgRate,
    } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <Header navigation={navigation} />
        <TopBackground />
        <RegionContainer>
          {!is_swapped ? (
            <TravelDropDown
              list={dropDown}
              placeholder={"KLIA"}
              setValue={this.setValues}
              value={selectedTerminal}
            />
          ) : (
            <DestiontionContainer>
              <DestinationInput placeholder={"DESTINATION"} onChange={()=>this.setState({isActiveIndex:0})}/>
            </DestiontionContainer>
          )}
          <Pressable onPress={() => this.setState({ is_swapped: !is_swapped })}>
            <SwapIcon
              source={require("../../assets/Images/swap-horizontal.png")}
            />
          </Pressable>
          {is_swapped ? (
            <TravelDropDown
              list={dropDown}
              placeholder={"KLIA"}
              setValue={this.setValues}
              value={selectedTerminal}
            />
          ) : (
            <DestiontionContainer>
              <DestinationInput placeholder={"DESTINATION"} onChange={()=>this.setState({isActiveIndex:0})}/>
            </DestiontionContainer>
          )}
          {/* <DestiontionContainer>
            <DestinationInput
              placeholder={'DESTINATION'}
            />
          </DestiontionContainer> */}
        </RegionContainer>
        <TransportTypes
          transportTypeData={transportType}
          onTransport={this.onSetTransport}
          isActiveIndex={isActiveIndex}
        />
        {isActiveIndex == 0 && (
          <TransportContainer>
            <TravelDetails />
            <ToDepartContainer>
              <HaldBox>
                <TitleValue>
                  TO: <Text style={{ color: "black" }}>KLIA</Text>
                </TitleValue>
              </HaldBox>
              <HaldBox>
                <TitleValue>
                  DEPART: <Text style={{ color: "black" }}>7:30 AM</Text>
                </TitleValue>
              </HaldBox>
            </ToDepartContainer>
            <TravelByVehicleContainer>
              <BXWalk source={require("../../assets/Images/bx-walk.png")} />
              <MarginLeft17 />
              <RightArrow source={require("../../assets/Images/f_arrow.png")} />
              <MarginLeft17 />
              <BXWalk source={require("../../assets/Images/bus_small.png")} />
              <MarginLeft17 />
              <RightArrow source={require("../../assets/Images/f_arrow.png")} />
              <MarginLeft17 />
              <BXWalk
                source={require("../../assets/Images/bus_small.png")}
                style={{ tintColor: "grey" }}
              />
              <MarginLeft17 />
              <RightArrow source={require("../../assets/Images/f_arrow.png")} />
              <MarginLeft17 />
              <BXWalk
                source={require("../../assets/Images/bus_small.png")}
                style={{ tintColor: "grey" }}
              />
            </TravelByVehicleContainer>
            <TravelMapConatiner>
              <TravelMapTime>7:30 AM</TravelMapTime>
              <MapViewConatainer>
                <Reached />
                <VerticalLines>
                  <Text>
                    |{"\n"}|{"\n"}|{"\n"}|{"\n"}
                  </Text>
                </VerticalLines>
                <OnWayContainer>
                  <PinkRound />
                  <PinkRound />
                </OnWayContainer>
                <VerticalLines>
                  <Text>
                    |{"\n"}|{"\n"}|{"\n"}|{"\n"}
                  </Text>
                </VerticalLines>
              </MapViewConatainer>

              <LocationInTextContainer>
                <ReachedTextCon>
                  <ReachedText>Treetops Condo</ReachedText>
                </ReachedTextCon>
                <OnwayTextCon>
                  <BXWalk
                    source={require("../../assets/Images/bx-walk.png")}
                    style={{ tintColor: "black" }}
                  />
                  <HowFarAway>Walk 2.1 KM (26 MINS)</HowFarAway>
                </OnwayTextCon>
                <OnTheWay>
                  <ReachedText>
                    Hartamas Square,{"\n"}Persiaran Lapangan Siber
                  </ReachedText>
                  <RowAlign>
                    <BXWalk
                      source={require("../../assets/Images/bus_small.png")}
                    />
                    <HowFarAway>MYBAS IPOH</HowFarAway>
                  </RowAlign>
                  <ReachedText>
                    Taman Song Choon,{"\n"}Jalan Raja Dr. Nazirn Shah
                  </ReachedText>
                </OnTheWay>
              </LocationInTextContainer>
            </TravelMapConatiner>
          </TransportContainer>
        )}
        {isActiveIndex == 1 && (
          <TransportContainer>
            <TravelDetails />
            <HorizontalLine />
            <View
              style={{
                marginTop: size(20),
                width: "100%",
              }}
            >
              <FlatList
                data={[0, 0, 0]}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={() => (
                  <BlockContainer>
                    <BlockPadding>
                      <BlockText>Block A</BlockText>
                      <LightBoldText>
                        To{"\n"}
                        <Text style={{ fontWeight: "bold" }}>KLIA</Text>
                      </LightBoldText>
                      <LightBoldText>
                        Best Reach Car Park{"\n"}
                        <Text style={{ fontWeight: "bold" }}>
                          21:51hrs(If you left at 19:17)
                        </Text>
                      </LightBoldText>
                    </BlockPadding>
                    <BlockImage
                      source={require("../../assets/Images/Carparking_Image.png")}
                    />
                  </BlockContainer>
                )}
              />
            </View>
          </TransportContainer>
        )}
        {isActiveIndex == 2 && (
          <TransportContainer>
            <TravelDetails />
            <HorizontalLine />
            <MarginTop top={size(20)} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {[0, 0, 0].map((item, index) => {
                return (
                  <>
                    {index == 0 ? (
                      <Pressable
                        onPress={() =>
                          this.props.navigation.navigate("Website")
                        }
                        style={{
                          height: size(80),
                          flex: 1,
                          marginHorizontal: size(10),
                        }}
                      >
                        <Image
                          source={require("../../assets/Images/Grab.png")}
                          style={{
                            height: "100%",
                            width: "100%",
                            resizeMode: "stretch",
                          }}
                        />
                      </Pressable>
                    ) : (
                      <View
                        style={{
                          height: size(80),
                          flex: 1,
                          marginHorizontal: size(10),
                          borderRadius: size(20),
                          backgroundColor: "grey",
                        }}
                      />
                    )}
                  </>
                );
              })}
            </View>
          </TransportContainer>
        )}
        {isActiveIndex == 3 && (
          <TransportContainer ref={(ref) => (this.scrollRef = ref)}>
            {!isShowAboutCar && (
              <>
                <BlueText>Car</BlueText>
                <HorizontalLine />
                <View
                  style={{
                    marginTop: size(20),
                    width: "100%",
                  }}
                >
                  <FlatList
                    data={
                      selectedTerminal == "klia1"
                        ? transport.klia1[0].subCategories[0].contentBlock
                            .poiItemsList
                        : transport.klia2[0].subCategories[0].contentBlock
                            .poiItemsList
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <BlockContainer
                        onPress={() => {
                          this.props.GetRateData(item.name);
                          this.setState({
                            isShowAboutCar: !isShowAboutCar,
                            aboutCar: item.contentBlock["content-block"][
                              "long-description"
                            ]
                              .toString()
                              .replace(/\n/g, "")
                              .replace(/<p>&nbsp;<\/p>/g, ""),
                            aboutTitle: "Car",
                            path: item.name,
                          });
                          this.scrollRef.scrollTo({
                            y: 0,
                            animated: true,
                          });
                        }}
                      >
                        <BlockPadding>
                          <Text
                            style={{
                              fontSize: size(17),
                              fontWeight: "bold",
                            }}
                          >
                            {/* Taxi */}
                            {item.contentBlock["content-block"].name}
                          </Text>
                          <Text
                            style={{
                              fontSize: size(14),
                              marginTop: size(10),
                            }}
                            numberOfLines={3}
                            ellipsizeMode={"tail"}
                          >
                            {/* Taxi services are available at{"\n"} the main
                            terminal Building Level 1 */}
                            {
                              item.contentBlock["content-block"][
                                "short-description"
                              ]
                            }
                          </Text>
                        </BlockPadding>
                        <BlockImage
                          source={require("../../assets/Images/Carparking2.png")}
                          style={{ height: size(140) }}
                        />
                      </BlockContainer>
                    )}
                  />
                </View>
                <MarginTop top={size(20)} />
                <BlueText>Train</BlueText>
                <HorizontalLine />
                <View
                  style={{
                    marginTop: size(20),
                    width: "100%",
                  }}
                >
                  <FlatList
                    data={
                      selectedTerminal == "klia1"
                        ? transport.klia1[0].subCategories[1].contentBlock
                            .poiItemsList
                        : transport.klia2[0].subCategories[1].contentBlock
                            .poiItemsList
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <BlockContainer
                        onPress={() => {
                          this.props.GetRateData(item.name);
                          this.setState({
                            isShowAboutCar: !isShowAboutCar,
                            aboutCar: item.contentBlock["content-block"][
                              "long-description"
                            ]
                              .toString()
                              .replace(/\n/g, "")
                              .replace(/<p>&nbsp;<\/p>/g, ""),
                            aboutTitle: "Train",
                            path: item.name,
                          });
                          this.scrollRef.scrollTo({
                            y: 0,
                            animated: true,
                          });
                        }}
                      >
                        {console.log(
                          item.contentBlock["content-block"]["long-description"]
                            .length,
                          "before  :---"
                        )}
                        {console.log(
                          item.contentBlock["content-block"]["long-description"]
                            .toString()
                            .replace("\n", "")
                            .replace("<p>&nbsp;</p>", "").length,
                          "after  :---"
                        )}
                        <BlockPadding>
                          <Text
                            style={{
                              fontSize: size(17),
                              fontWeight: "bold",
                            }}
                          >
                            {/* Taxi */}
                            {item.contentBlock["content-block"].name}
                          </Text>
                          <Text
                            style={{
                              fontSize: size(14),
                              marginTop: size(10),
                            }}
                            numberOfLines={3}
                            ellipsizeMode={"tail"}
                          >
                            {/* Taxi services are available at{"\n"} the main
                            terminal Building Level 1 */}
                            {
                              item.contentBlock["content-block"][
                                "short-description"
                              ]
                            }
                          </Text>
                        </BlockPadding>
                        <BlockImage
                          source={require("../../assets/Images/Carparking2.png")}
                          style={{ height: size(140) }}
                        />
                      </BlockContainer>
                    )}
                  />
                </View>
                <MarginTop top={size(20)} />
                <BlueText>Bus</BlueText>
                <HorizontalLine />
                <View
                  style={{
                    marginTop: size(20),
                    width: "100%",
                  }}
                >
                  <FlatList
                    data={
                      selectedTerminal == "klia1"
                        ? transport.klia1[0].subCategories[2].contentBlock
                            .poiItemsList
                        : transport.klia2[0].subCategories[2].contentBlock
                            .poiItemsList
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <BlockContainer
                        onPress={() => {
                          this.props.GetRateData(item.name);
                          this.setState({
                            isShowAboutCar: !isShowAboutCar,
                            aboutCar: item.contentBlock["content-block"][
                              "long-description"
                            ]
                              .toString()
                              .replace(/\n/g, "")
                              .replace(/<p>&nbsp;<\/p>/g, ""),
                            aboutTitle: "Bus",
                            path: item.name,
                          });
                          this.scrollRef.scrollTo({
                            y: 0,
                            animated: true,
                          });
                        }}
                      >
                        <BlockPadding>
                          <Text
                            style={{
                              fontSize: size(17),
                              fontWeight: "bold",
                            }}
                          >
                            {/* Taxi */}
                            {item.contentBlock["content-block"].name}
                          </Text>
                          <Text
                            style={{
                              fontSize: size(14),
                              marginTop: size(10),
                            }}
                            numberOfLines={3}
                            ellipsizeMode={"tail"}
                          >
                            {/* Taxi services are available at{"\n"} the main
                            terminal Building Level 1 */}
                            {
                              item.contentBlock["content-block"][
                                "short-description"
                              ]
                            }
                          </Text>
                        </BlockPadding>
                        <BlockImage
                          source={require("../../assets/Images/Carparking2.png")}
                          style={{ height: size(140) }}
                        />
                      </BlockContainer>
                    )}
                  />
                </View>
              </>
            )}
            {isShowAboutCar && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <BackButton
                    onPress={() =>
                      this.setState({ isShowAboutCar: !isShowAboutCar })
                    }
                  />
                  <View style={{ marginLeft: size(5) }} />
                  <BlueText>{aboutTitle}</BlueText>
                </View>
                <MarginTop top={size(15)} />
                <Image
                  style={{
                    width: "100%",
                    height: size(100),
                  }}
                  source={require("../../assets/Images/Carparking2.png")}
                />
                <AboutText>About</AboutText>
                <DetailsText>
                  {/* Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.{"\n"}
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. */}
                  {/* {aboutCar} */}
                  <View>
                    <HTMLView
                      value={`<div >${aboutCar}</div>`}
                      stylesheet={StyleSheet.create({
                        div: {
                          fontSize: size(14),
                          color: black,
                          fontFamily: MontserratRegular,
                          // marginLeft: "17%",
                          flexShrink: 1,
                          width: width - size(50),
                        },
                      })}
                    />
                  </View>
                </DetailsText>
                <View
                  style={{
                    marginTop: size(20),
                  }}
                >
                  <Text
                    style={{
                      fontSize: size(18),
                      color: "grey",
                    }}
                  >
                    RATING REVIEW
                  </Text>
                  <View
                    style={{
                      height: 110,
                      width: "100%",
                      flexDirection: "row",
                      marginTop: size(5),
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: "20%",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: size(25),
                        }}
                      >
                        {Number(avgRate).toFixed(1)}
                      </Text>
                      <Text
                        style={{
                          fontSize: size(18),
                        }}
                      >
                        Out of 5
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "30%",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stars array={[0, 0, 0, 0, 0]} />
                      <Stars array={[0, 0, 0, 0]} />
                      <Stars array={[0, 0, 0]} />
                      <Stars array={[0, 0]} />
                      <Stars array={[0]} />
                    </View>
                    <View
                      style={{
                        width: "40%",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <RateBar width={this.state.ratings.fifth_star} />
                      <RateBar width={this.state.ratings.fourth_star} />
                      <RateBar width={this.state.ratings.third_star} />
                      <RateBar width={this.state.ratings.second_star} />
                      <RateBar width={this.state.ratings.one_star} />
                    </View>
                  </View>
                </View>
                <PostRatings
                  postRating={(rating) => {
                    this.props.PostRate({
                      path: this.state.path,
                      Rating: rating,
                    });
                    this.props.GetRateData(this.state.path);
                    // const {one_star_count,second_star_count,third_star_count,fourth_star_count,fifth_star_count}=this.state.ratings
                    // const {ratings,totalRate}=this.state
                    // let avgRate=0;
                    // if(rating==5){
                    //    avgRate =
                    //   (5 * fifth_star_count +1+
                    //     4 * fourth_star_count +
                    //     3 * third_star_count +
                    //     2 * second_star_count +
                    //     1 * one_star_count) /
                    //     totalRate || 0;
                    //     ratings.fifth_star= (fifth_star_count/totalRate)*100;
                    //     ratings
                    // }else if(rating==4){
                    //   avgRate =
                    //   (5 * fifth_star_count +
                    //     4 *fourth_star_count +1+
                    //     3 * third_star_count +
                    //     2 * second_star_count +
                    //     1 * one_star_count) /
                    //     totalRate || 0;
                    //     ratings.fourth_star= (fourth_star_count/totalRate)*100;
                    // }else if(rating==3){
                    //   avgRate =
                    //   (5 * fifth_star_count +
                    //     4 *fourth_star_count +
                    //     3 * third_star_count+1 +
                    //     2 * second_star_count +
                    //     1 * one_star_count) /
                    //     totalRate || 0;
                    //     ratings.third_star= (third_star_count/totalRate)*100;
                    // }else if(rating==2){
                    //   avgRate =
                    //   (5 * fifth_star_count +
                    //     4 *fourth_star_count +
                    //     3 * third_star_count +
                    //     2 * second_star_count+1 +
                    //     1 * one_star_count) /
                    //     totalRate || 0;
                    //     ratings.second_star= (second_star_count/totalRate)*100;
                    // }else if(rating==1){
                    //   avgRate =
                    //   (5 * fifth_star_count +
                    //     4 *fourth_star_count +
                    //     3 * third_star_count +
                    //     2 * second_star_count +
                    //     1 * one_star_count+1) /
                    //     totalRate || 0;
                    //     ratings.one_star= (one_star_count/totalRate)*100;
                    // }
                    // this.setState({
                    //   avgRate,
                    //   ratings
                    // })
                  }}
                />
              </>
            )}
          </TransportContainer>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Transport: state.Transport,
  };
};

export default connect(mapStateToProps, {
  GetTransportData,
  GetRateData,
  PostRate,
})(Transport);