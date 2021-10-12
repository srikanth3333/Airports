import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
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
import { MainContainer, TextName } from "./style";
import { GetDepartureFlightData, GetFlightData } from "./action";
import { connect } from "react-redux";
import I18n from "../../localization/language";
import {
  MontserratBold,
  MontserratRegular,
  OpenSansBold,
  OpenSansRegular,
} from "../../assets/font";
import { FlightInfoStyle } from "./style";
import Header from "../../components/Header";
import SwitchToggle from "../../components/SwitchToggle";
import { TravelDropDown } from "../../components/SpecialAssistance";
import DropDown from "../../components/DropDown";

const TitleValue = ({ title, value, style }) => (
  <View
    style={[
      {
        width: "50%",
      },
      style,
    ]}
  >
    <Text
      style={{
        color: "rgb(0,121,183)",
        fontSize: size(15),
        fontFamily: OpenSansBold,
      }}
    >
      {title}
    </Text>
    <Text
      style={{
        color: "grey",
        fontSize: size(15),
        fontFamily: OpenSansBold,
      }}
    >
      {value}
    </Text>
  </View>
);

const size = (value) => RFValue(value);

class FlightInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departureModal: false,
      trackModal: false,
      flightDetails: [
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/AirAsia_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: I18n.t("test"),
          flightName: "AIR ASIA\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "SINGAPORE",
          flightName: "AIR INDIA\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "rgb(119,191,69)",
          flightStatus: "ON BOARDING",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/AirAsia_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "SINGAPORE",
          flightName: "AIR DUBAI\nAIRLINES",
          flightNo: "UL 4285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "PHILLIPINES",
          flightName: "AIR ASIA\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/AirAsia_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "RUSSIA",
          flightName: "AIR ASIA\nAIRLINES",
          flightNo: "UL 2143",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "ABU DHABHI",
          flightName: "AIR ASIA\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/AirAsia_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "PAKISTAN",
          flightName: "AIR ASIA\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "orange",
          flightStatus: "GATE CLOSED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "JAPAN",
          flightName: "AIR JAPAN\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/AirAsia_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "JAPAN",
          flightName: "TRUE JET\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
        {
          flightLogo: (
            <Image
              source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
              style={styles.flightLogo}
            />
          ),
          placeName: "CHINA",
          flightName: "GO AIR\nAIRLINES",
          flightNo: "UL 3285",
          flightDateTime: "08:10\n10/06/2020",
          flightStatusColor: "red",
          flightStatus: "FLIGHT CANCELLED",
        },
      ],
      date: moment().format("DD-MMM-YYYY"),
      time: moment().format("hh:mm A"),
      visible: false,
      searchText: "",
      searchedAry: [],
      selectedFlia: 0,
      klia1: [],
      klia2: [],
      flightInfo: [],
      loader: true,
      dropDown: [
        { label: "KLIA1", value: "klia1" },
        { label: "KLIA2", value: "klia2" },
      ],
      open: false,
      selectedTerminal: "klia1",
      departure: {
        klia1: [],
        klia2: [],
      },
      arrival: {
        klia1: [],
        klia2: [],
      },
      isArrival: false,
    };
  }

  searchFlight = (value) => {
    const { selectedFlia, arrival, departure, selectedTerminal } = this.state;
    var searchedAry = [];

    if (selectedFlia == 0) {
      if (selectedTerminal == "klia1") {
        searchedAry = departure.klia1.filter(
          (e) =>
            e.origin.city.toLowerCase().includes(value.toLowerCase()) ||
            e.codeShareFlights[0].airline.name
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            e.codeShareFlights[0].flightNumber
              .toLowerCase()
              .includes(value.toLowerCase())
        );
      } else {
        searchedAry = departure.klia2.filter(
          (e) =>
            e.origin.city.toLowerCase().includes(value.toLowerCase()) ||
            e.codeShareFlights[0].airline.name
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            e.codeShareFlights[0].flightNumber
              .toLowerCase()
              .includes(value.toLowerCase())
        );
      }
      console.log(searchedAry, "check array");
    } else {
      if (selectedTerminal == "klia1") {
        searchedAry = arrival.klia1.filter(
          (e) =>
            e.origin.city.toLowerCase().includes(value.toLowerCase()) ||
            e.codeShareFlights[0].airline.name
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            e.codeShareFlights[0].flightNumber
              .toLowerCase()
              .includes(value.toLowerCase())
        );
      } else {
        searchedAry = arrival.klia2.filter(
          (e) =>
            e.origin.city.toLowerCase().includes(value.toLowerCase()) ||
            e.codeShareFlights[0].airline.name
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            e.codeShareFlights[0].flightNumber
              .toLowerCase()
              .includes(value.toLowerCase())
        );
      }
    }

    this.setState({
      searchText: value,
      searchedAry: searchedAry,
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    try {
      if (!nextProps.FlightInfoReducer?.flightdataError) {
        const klia1 =
          nextProps.FlightInfoReducer.flightdata?.response?.data?.flightStatuses.filter(
            (item) => item.terminal == "KLIA"
          );
        const klia2 =
          nextProps.FlightInfoReducer.flightdata?.response?.data?.flightStatuses.filter(
            (item) => item.terminal == "KLIA2"
          );
        console.log("check klia1", klia1);
        console.log("check klia2", klia2);
        this.setState({
          arrival: {
            klia1,
            klia2,
          },
          loader: false,
        });
      }
      if (!nextProps.FlightDeparture?.flightdataError) {
        const klia1 =
          nextProps.FlightDeparture.flightdata.response.data.flightStatuses.filter(
            (item) => item.terminal == "KLIA"
          );
        const klia2 =
          nextProps.FlightDeparture.flightdata.response.data.flightStatuses.filter(
            (item) => item.terminal == "KLIA2"
          );
        console.log("check deparut klia1", klia1);
        console.log("check klia2", klia2);
        this.setState({
          departure: {
            klia1,
            klia2,
          },
          loader: false,
        });
      }
    } catch (error) {
      console.log("check error first", error);
      // alert("Something went wrong!", error);
    }
  }
  changeKlia = (index) => {
    this.setState({
      selectedFlia: index,
      loader: false,
    });
  };

  componentDidMount() {
    this.props.GetFlightData();
    this.props.GetDepartureFlightData();
  }

  render() {
    const {
      flightDetails,
      visible,
      date,
      time,
      searchText,
      searchedAry,
      selectedFlia,
      flightInfo,
      arrival,
      departure,
      loader,
      dropDown,
      selectedTerminal,
      departureModal,
      trackModal,
    } = this.state;
    var key = 0;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {/* Header */}

        <FlightInfoStyle.FlightHeadeView>
          <Header
            navigation={this.props.navigation}
            leftTitle={"Flight"}
            rightTittle={"Information"}
          />
        <View style={{width:'30%'}}>
        <DropDown
                  list={dropDown}
                  borderColor={"#F1DDE9"}
                  onSelectValue={(value) =>
                   this.setState({selectedTerminal:value,dropDownOpen:false})
                  }
                  borderRadius={25}
                  selectedValue={this.state.selectedTerminal}
                  placeholder={"KLIA"}
                  dropDownOpen={() =>
                    this.setState({
                      dropDownOpen: true,
                    })
                  }
                  dropDownClose={this.state.dropDownOpen}
                />
                </View>
        </FlightInfoStyle.FlightHeadeView>
        <View
          style={{
            flex: 1,
          }}
        >
          {/* SearchBar */}
          {/* <TextName onPress={() => this.setLaunguage()}>
            {I18n.t("test")}
          </TextName>
          <TextName onPress={() => this.setLaunguage()}>
            {I18n.t("test")}
          </TextName> */}
          <View
            style={{
              backgroundColor: "rgb(17,144,155)",
              paddingBottom: size(15),
            }}
          >
            <SearchBar
              onChangeText={this.searchFlight}
              onChangeKlia={this.changeKlia}
              selected={selectedFlia}
            />
            <View
              style={{
                flexDirection: "row",
                marginVertical: size(10),
                justifyContent: "space-evenly",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: size(15),
                  color: "white",
                  fontFamily: OpenSansBold,
                }}
              >
                GET PREVIOUS FLIGHTS{" "}
                <Image
                  source={require("../../assets/Images/favRightArrow.png")}
                  style={{
                    width: size(15),
                    height: size(15),
                    tintColor: "white",
                    resizeMode: "contain",
                  }}
                />
              </Text>
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontSize: size(12),
                    color: "white",
                    fontFamily: OpenSansRegular,
                  }}
                >
                  LAST UPDATE
                </Text>
                <Text
                  style={{
                    fontSize: size(12),
                    color: "white",
                    fontFamily: OpenSansRegular,
                  }}
                >
                  00-JUN 0000.{" "}
                  <Text style={{ fontFamily: OpenSansBold }}>9:08 AM</Text>
                </Text>
              </View>
            </View>
          </View>
          {/* Flight List */}
          {selectedFlia == 0
            ? (departure.klia2.length > 0 || departure.klia1.length > 0) && (
                <FlatList
                  // data={searchText != "" ? searchedAry : flightDetails}
                  data={
                    selectedTerminal == "klia2"
                      ? searchText != ""
                        ? searchedAry
                        : departure.klia2
                      : searchText != ""
                      ? searchedAry
                      : departure.klia1
                  }
                  style={{
                    marginTop: size(10),
                  }}
                  contentContainerStyle={{
                    paddingBottom: size(110),
                    paddingHorizontal: RFValue(14),
                  }}
                  renderItem={({ item, index }) => (
                    <FlightDetail
                      item={item}
                      onModal={() => this.setState({ departureModal: true })}
                    />
                  )}
                  keyExtractor={() => key++}
                  extraData={flightInfo}
                />
              )
            : (arrival.klia2.length > 0 || arrival.klia1.length > 0) && (
                <FlatList
                  data={
                    selectedTerminal == "klia2"
                      ? searchText != ""
                        ? searchedAry
                        : arrival.klia2
                      : searchText != ""
                      ? searchedAry
                      : arrival.klia1
                  }
                  style={{
                    marginTop: size(10),
                  }}
                  contentContainerStyle={{
                    paddingBottom: size(110),
                    paddingHorizontal: RFValue(14),
                  }}
                  renderItem={({ item, index }) => (
                    <FlightDetail
                      item={item}
                      onModal={() => this.setState({ departureModal: true })}
                    />
                  )}
                  keyExtractor={() => key++}
                />
              )}
        </View>
        <DateTimePicker
          mode={"datetime"}
          onConfirm={(dt) => {
            const date = moment(dt).format("DD-MMM-YYYY");
            const time = moment(dt).format("hh:mm A");
            this.setState({
              date,
              time,
              visible: false,
            });
          }}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
          isVisible={this.state.visible}
        />
        {searchText != "" && searchedAry.length == 0 && <NodataFound />}
        {loader && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: "50%",
              alignSelf: "center",
            }}
            color={"rgb(32,42,96)"}
            size={"large"}
          />
        )}
        <Modal 
          animationType={"slide"} 
          visible={departureModal}
          onRequestClose={()=>{
            this.setState({
              departureModal:false
            })
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                padding: size(15),
                backgroundColor: "rgb(0,146,156)",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={()=>{
                    this.setState({
                      departureModal:false
                    })
                  }}
                >
                <Image
                  source={require("../../assets/Images/BackArrow.png")}
                  style={{
                    tintColor: "white",
                    resizeMode: "contain",
                    width: size(25),
                    height: size(25),
                  }}
                />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: size(18),
                    color: "white",
                    marginLeft: size(10),
                    fontFamily: MontserratBold,
                  }}
                >
                  DEPARTURE
                </Text>
              </View>
              <TouchableOpacity
                onPress={()=>{
                  this.setState({
                    departureModal:false
                  })
                }}
              >
                <Image
                source={require("../../assets/Images/Close.png")}
                style={{
                  tintColor: "white",
                  resizeMode: "contain",
                  width: size(22),
                  height: size(22),
                }}
              />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: size(10),
                }}
              >
                <View
                  style={{
                    padding: size(20),
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View
                  style={{
                      width: "50%",
                    }}
                  >
                    <Image
                      source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
                      style={{
                        width: size(120),
                        height: size(120),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "50%",
                      paddingLeft: "10%",
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../../assets/Images/OnGoing.png")}
                        style={{
                          width: size(27),
                          height: size(27),
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: OpenSansBold,
                          color: "black",
                          fontSize: size(11),
                          textTransform: "uppercase",
                        }}
                      >
                        On GOING
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: size(10),
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: OpenSansBold,
                          color: "black",
                          fontSize: size(19),
                          textTransform: "uppercase",
                        }}
                      >
                        KUL{" "}
                      </Text>
                      <Image
                        source={require("../../assets/Images/DepartureIcon.png")}
                        style={{
                          width: size(18),
                          height: size(18),
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: OpenSansBold,
                          color: "black",
                          fontSize: size(19),
                          textTransform: "uppercase",
                        }}
                      >
                        {" "}
                        HYD
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: size(3),
                      }}
                    >
                      <Text
                        style={{
                          color: "rgb(0,121,183)",
                          fontSize: size(15),
                          fontFamily: OpenSansBold,
                        }}
                      >
                        KLIA
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: size(11),
                          fontFamily: OpenSansBold,
                        }}
                      >
                        12:35 hrs{"\n"}Wed, 10 Jan 2020
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: size(1),
                    width: "95%",
                    alignSelf: "center",
                    backgroundColor: "lightgrey",
                  }}
                />
                <View
                  style={{
                    alignSelf: "center",
          paddingVertical: size(10),
                    paddingHorizontal: size(10),
                  }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: size(11),
                    }}
                  >
                    Note : SLIK AUR (S) PTE LTD is a codeshare partner of
                    SINGAPORE AIRLINES Please proceed to board flight SQ 0125.
                  </Text>
                </View>
                <View
                  style={{
                    height: size(1),
                    width: "95%",
                    alignSelf: "center",
                    backgroundColor: "lightgrey",
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: size(10),
                    marginVertical: size(10),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <TitleValue title={"CHECK-IN COUNTERS"} value={"LO1"} />
                    <TitleValue
                      title={"BOARDING GATE"}
                      value={"H2"}
                      style={{
                        paddingLeft: size(20),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: size(10),
                      width: "100%",
                    }}
                  >
                    <TitleValue
                      title={"AIRLINE"}
                      value={"SLIK AIR (S)PTE.LTD"}
                    />
                    <TitleValue
                      title={"FLIGHT TYPE"}
                      value={"NON-STOP"}
                      style={{
                        paddingLeft: size(20),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <TitleValue title={"FIGHT NUMBER"} value={"MI 581"} />
                  </View>
                </View>
                <View
                  style={{
                    height: size(1),
                    width: "95%",
                    alignSelf: "center",
                    backgroundColor: "lightgrey",
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingHorizontal: size(40),
                    paddingVertical: size(15),
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                    }}
                    onPress={()=>{
                      this.setState({
                        departureModal:false,
                        trackModal:true
                      })
                    }}
                  >
                    <Image
                      source={require("../../assets/Images/TrackMyFlightIcon.png")}
                      style={{
                        width: size(58),
                        height: size(58),
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: size(13),
                        textTransform: "uppercase",
                        fontFamily: OpenSansBold,
                        textAlign: "center",
                      }}

                      >
                      Track{"\n"}My Flight
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/Images/TrackMyFlightIcon.png")}
                      style={{
                        width: size(58),
                        height: size(58),
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: size(13),
                        textTransform: "uppercase",
                        fontFamily: OpenSansBold,
                        textAlign: "center",
                      }}
                    >
                      Plan{"\n"}My Journey
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: size(1),
                    width: "95%",
                    alignSelf: "center",
                    backgroundColor: "lightgrey",
                  }}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
        <Modal 
          transparent 
          visible={trackModal}
          animationType={'slide'}
          onRequestClose={()=>{
            this.setState({trackModal:false})
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                alignSelf: "center",
                backgroundColor: "white",
                borderRadius: size(20),
                padding: size(15),
              }}
            >
              <TouchableOpacity
              style={{
                position:"absolute",
                top:size(12),
                right:size(15)
              }}
              onPress={()=>{
                this.setState({trackModal:false})
              }}
            >
            <Image
                source={require("../../assets/Images/Close.png")}
                style={{
                  resizeMode: "contain",
                  width: size(20),
                  height: size(20),
                }}
              />
            </TouchableOpacity>
              <Image
                source={require("../../assets/Images/Malaysia_Airlines_Logo.png")}
                style={{
                  width: size(44),
                  height: size(44),
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                    fontSize: size(18),
                    textAlign: "center",
                    color: "rgb(77,43,97)",
                    marginTop: size(10),
                    fontFamily: MontserratRegular,
                    textShadowColor: "rgb(27,41,89)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 3,
                }}
              >
                  You are now Tracking
              </Text>
              <Text
                style={{
                  fontSize: size(18),
                  textAlign: "center",
                  color: "rgb(77,43,97)",
                  fontFamily: MontserratBold,
                  textShadowColor: "rgb(27,41,89)",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                  EK 0440
              </Text>
              <Text
                style={{
                  fontSize: size(15),
                  textAlign: "center",
                  color: "black",
                  fontFamily: MontserratRegular,
                  marginTop:size(20),
                  paddingHorizontal:size(25)
                }}
              >
                  You will now receive alerts for this flight
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(0,146,156)",
                  height:size(40),
                  alignSelf:"center",
                  marginTop:size(15),
                  width:'90%',
                  justifyContent:"center",
                  alignItems:"center"
                }}
                onPress={()=>{
                  this.setState({trackModal:false})
                }}
              >
                <ImageBackground
                style={{
                  width:'100%',
                  height:'100%',
                  justifyContent:"center",
                  alignItems:"center"
                }}
                source={require('../../assets/Images/flightInfo_bg.png')}
              >
                <Text
                  style={{
                    color:'white',
                    fontFamily:OpenSansBold,
                    fontSize:size(13)
                  }}
                >DONE</Text>
              </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    FlightInfoReducer: state.FlightInfoReducer,
    FlightDeparture: state.FlightDepartureInfo,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  GetFlightData: GetFlightData,
  GetDepartureFlightData: GetDepartureFlightData,
};

/**
 * Exports
 */
export default connect(mapStateToProps, mapDispatchToProps)(FlightInfo);
