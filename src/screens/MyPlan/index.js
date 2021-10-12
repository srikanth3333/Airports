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
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "../../assets/styles";
import styled from "styled-components/native";
import { BackTitleHeader } from "../../components/Common";
import {
  DestinationInput,
  DestiontionContainer,
  HeaderContainer,
  TimeLeft,
  Timer,
  TimerCon,
  TimerText,
  TransportIcon,
  TransportType,
  TravelDropDown,
} from "../MyPlan/style";
import { Header } from "../../components/MyPlan/index";
import { MarginTop } from "../../components/Common";
import { SwapIcon } from "../Transport/style";
import { MontserratBold } from "../../assets/font";
const size = (value) => RFValue(value);

class MyPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [
        {
          icon: require("../../assets/Images/MyPlan_1.png"),
          bgcolor: "rgb(28,43,89)",
          isActive: false,
        },
        {
          icon: require("../../assets/Images/MyPlan_2.png"),
          //bgcolor: "rgb(68,44,93)",
          isActive: false,
        },
        {
          icon: require("../../assets/Images/MyPlan_3_hover.png"),
          bgcolor: "rgb(165,40,114)",
          isActive: true,
        },
        {
          icon: require("../../assets/Images/MyPlan_4.png"),
          bgcolor: "rgb(224,44,107)",
          isActive: false,
        },
        {
          icon: require("../../assets/Images/MyPlan_5.png"),
          bgcolor: "rgb(238,100,55)",
          isActive: false,
        },
        {
          icon: require("../../assets/Images/MyPlan_6.png"),
          bgcolor: "rgb(252,153,70)",
          isActive: false,
        },
        {
          icon: require("../../assets/Images/MyPlan_7.png"),
          bgcolor: "rgb(255,197,78)",
          isActive: false,
        },
      ],
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
          activeIcon: "",
          inActiveIcon: require("../../assets/Images/Guide.png"),
        },
      ],
      is_swapped: false,
      dropDown: [
        { label: "KLIA1", value: "klia1" },
        { label: "KLIA2", value: "klia2" },
      ],
      selectedTerminal: "klia1",
    };
    this.setValues = this.setValue.bind(this);
  }
  setValue = (callback) => {
    this.setState((state) => ({
      selectedTerminal: callback(state.selectedTerminal),
    }));
  };
  render() {
    const { navigation } = this.props;
    const { plans, is_swapped, dropDown, selectedTerminal, transportType } =
      this.state;
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: "rgb(242,245,254)" }]}
      >
        <Header navigation={navigation}
        title={"My Plan"} />
        <MarginTop top={size(50)} />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              paddingHorizontal: 30,
            }}
          >
            <MarginTop top={size(10)} />
            <FlatList
              data={plans}
              renderItem={({ item, index }) => {
                return (
                  <Image
                    source={item.icon}
                    style={{
                      width: size(25),
                      height: size(25),
                      resizeMode: "contain",
                      tintColor: item.isActive
                        ? "rgb(164,47,128)"
                        : "rgb(40,45,91)",
                      marginVertical: size(20),
                    }}
                  />
                );
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                borderLeftWidth: 1,
              }}
            >
              <View
                style={{
                  height: size(60),
                  marginHorizontal: size(15),
                  borderRadius: size(40),
                  backgroundColor: "rgb(164,47,128)",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: size(23),
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: size(20),
                    fontFamily: MontserratBold,
                  }}
                >
                  Transport
                </Text>
              </View>
              <View
                style={{
                  marginLeft: size(50),
                  zIndex: 1,
                  width: "55%",
                }}
              >
                <MarginTop top={size(30)} />
                {!is_swapped ? (
                  <View>
                    <TravelDropDown
                      list={dropDown}
                      placeholder={"KLIA"}
                      setValue={this.setValues}
                      value={selectedTerminal}
                    />
                  </View>
                ) : (
                  <DestiontionContainer>
                    <DestinationInput placeholder={"DESTINATION"} />
                  </DestiontionContainer>
                )}
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Pressable
                    onPress={() => this.setState({ is_swapped: !is_swapped })}
                    style={{
                      paddingVertical: size(3),
                      paddingHorizontal: size(3),
                      width: size(30),
                      height: size(30),
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgb(165,40,114)",
                      borderRadius: size(20),
                      alignSelf: "flex-end",
                    }}
                  >
                    <SwapIcon
                      source={require("../../assets/Images/swap-horizontal.png")}
                    />
                  </Pressable>
                </View>

                {is_swapped ? (
                  <TravelDropDown
                    list={dropDown}
                    placeholder={"KLIA"}
                    setValue={this.setValues}
                    value={selectedTerminal}
                  />
                ) : (
                  <View>
                    {/* <DestiontionContainer> */}
                    <DestinationInput placeholder={"DESTINATION"} />
                    {/* </DestiontionContainer> */}
                  </View>
                )}
                <MarginTop top={size(20)} />
                <FlatList
                  data={transportType}
                  renderItem={({ item, index }) => {
                    console.log("chksbvjdbfvdjks", item);
                    return (
                      <Image
                        style={{
                          flex: 1,
                          marginLeft: size(5),
                          marginTop: size(10),
                          height: size(90),
                          resizeMode: "stretch",
                        }}
                        source={item.activeIcon}
                      />
                    );
                  }}
                  numColumns={2}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default MyPlan;