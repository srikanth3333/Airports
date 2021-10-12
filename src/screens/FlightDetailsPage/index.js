import React, { Component } from "react";
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
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import moment from "moment";
import  TrackFlight  from "../Track_Flight";


import { plans, trackedFlights, push } from "./action";

import isPlanExisted from "../../utils/reduxSelect/isPlanExisted";
import isAlreadyTracking from "../../utils/reduxSelect/isAlreadyTracking";

import {
  statusCodeMap,
  DEFAULT_STATUS_CODE,
  DEFAULT_STATUS_TEXT,
  trackableStatusCodes,
} from "../../general/constants/flightStatuses";
import { flightStatusCodes } from "../../general/constants/statues";
import { localizeDate } from "../../utils/constants";

import getHeaderText from "./getHeaderText";
import getShareMessage from "./getShareMessage";
import getCodeshareInfo from "./getCodeshareInfo";
import getFlightDetails from "./getFlightDetails";
// import style from './style'
import styles from "../../assets/styles";
import {
  CenturyGothicRegular,
  MontserratBold,
  MontserratRegular,
  OpenSansBold,
  OpenSansRegular,
} from "../../assets/font";
import highlightText from "../../utils/display/highlightText";
import getTailImage from "../../utils/reduxSelect/getTailImage";
import { RFValue } from "react-native-responsive-fontsize";
const size = (value) => RFValue(value);

getStatusType = (type) => {
  return type;
};

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
class FlightDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackModal:false,
      isTrackFlightModalVisible: false,
      isCreatingPlan: false,
    };
    this._toggleTrackFlightModal = this._toggleTrackFlightModal.bind(this);
    this.shareFlight = this.shareFlight.bind(this);
    this.canShowTrackFlight = this.canShowTrackFlight.bind(this);
    this.createPlan = this.createPlan.bind(this);
  }

  _toggleTrackFlightModal() {
    this.setState({
      isTrackFlightModalVisible: !this.state.isTrackFlightModalVisible,
    });
  }

  shareFlight() {
    const { data, shareMessage } = this.props;

    if (!isEmpty(data)) {
      let finalMessage = shareMessage;
      finalMessage = finalMessage
        .split("[flight-number]")
        .join(data.flightNumber);
      finalMessage = finalMessage.split("[airline]").join(data.airline);
      finalMessage = finalMessage.split("[from-city]").join(data.originCity);
      finalMessage = finalMessage.split("[to-city]").join(data.destinationCity);
      finalMessage = finalMessage.split("[start-date]").join(data.startDate);
      finalMessage = finalMessage.split("[start-time]").join(data.startTime);
      finalMessage = finalMessage.split("[end-date]").join(data.endDate);
      finalMessage = finalMessage.split("[end-time]").join(data.endTime);
      Share.share({ message: finalMessage });
    }
  }

  canShowTrackFlight() {
    const { data } = this.props;
    /*if (isEmpty(data) || isEmpty(data.statusCode)) {
      return false
    }*/
    if (isEmpty(data)) {
      return false;
    }
    if (flightStatusCodes.FLIGHT_CLOSED.includes(data.statusCode)) {
      return false;
    }
    if (data.isArrival) {
      const now = moment(localizeDate(new Date()));
      const flightTime = moment(localizeDate(data.flightTime));
      var duration = moment.duration(now.diff(flightTime)).asHours();
      if (isNaN(duration)) {
        return false;
      }
      if (duration > 4) {
        return false;
      }
      if ([flightStatusCodes.FLIGHT_CANCELLED].includes(data.statusCode)) {
        return false;
      }
    } else {
      if (
        [
          flightStatusCodes.FLIGHT_DEPARTED,
          flightStatusCodes.FLIGHT_CANCELLED,
        ].includes(data.statusCode)
      ) {
        return false;
      }
    }
    return true;
  }

  isMainCodeshareFlight(data, mainCodeShareFlightData) {
    const codeshareId = get(data, "codeshareId");
    const mainCodeShareId = get(mainCodeShareFlightData, "codeshareId");
    return (
      !!codeshareId && !!mainCodeShareId && codeshareId === mainCodeShareId
    );
  }

  createPlan() {
    this.setState({
      isCreatingPlan: true,
    });
    const {
      selectFlight,
      data: { id, codeshareId, planData },
      alreadyTracking,
      trackFlight,
      userProfile,
      saveFlightToUserAccount,
    } = this.props;
    if (!alreadyTracking) {
      trackFlight(codeshareId);
      if (!isEmpty(userProfile)) {
        saveFlightToUserAccount(codeshareId);
      }
    }
    selectFlight(id, codeshareId, planData);

    const that = this;
    setTimeout(() => {
      that.setState({
        isCreatingPlan: false,
      });
    }, 5000);
  }

  onTrackButtonPressed = (id, planData) => {
    const { userProfile, trackFlight, saveFlightToUserAccount } = this.props;
    trackFlight(id);
    if (!isEmpty(userProfile)) {
      saveFlightToUserAccount(id, planData);
    }
  };

  onUntrackButtonPressed = (id) => {
    const { userProfile, untrackFlight, removeFlightFromUserAccount } =
      this.props;
    untrackFlight(id);
    if (!isEmpty(userProfile)) {
      removeFlightFromUserAccount(id);
    }
  };

  render() {
    const {
      id,
      headerText,
      data,
      goBack,
      userProfile,
      tailImage,
      alreadyTracking,
      codeshareInfo,
      isPlanExisted,
      textContent,
    } = this.props;

    let status = DEFAULT_STATUS_CODE;
    let statusText = DEFAULT_STATUS_TEXT;

    const statusDetail = get(statusCodeMap, get(data, "statusCode", ""));

    if (statusDetail) {
      status = statusDetail.status;
      statusText = statusDetail.text.toUpperCase();
    }

    const statusStyle = data ? getStatusType(status) : null;
    const showTrackButton = this.canShowTrackFlight();
    return (
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
              onPress={() => {
                this.setState({
                  departureModal: false,
                });
                this.props.navigation.goBack()
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
            onPress={() => {
              this.setState({
                departureModal: false,
              });
              this.props.navigation.goBack()
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
                  source={tailImage}
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
                {!isEmpty(statusDetail) && statusDetail && (
                  <View
                    style={{
                      width: "100%",
                      //alignItems: "center",
                    }}
                  >
                    <Image
                      source={statusDetail.image}
                      style={{
                        width: size(27),
                        height: size(27),
                        marginRight: size(42),
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: OpenSansBold,
                        color: "black",
                        fontSize: size(11),
                        marginRight: size(42),
                        textTransform: "uppercase",
                      }}
                    >
                      {statusText}
                    </Text>
                  </View>
                )}
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
                    {data.originCode}
                  </Text>
                  <Image
                    source={require("../../assets/Images/DepartureIcon.png")}
                    style={{
                      width: size(20),
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
                    {data.destinationCode}
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
                    {data.originAirport}
                  </Text>
                 {data.isArrival? <Text
                    style={{
                      color: "black",
                      fontSize: size(11),
                      fontFamily: OpenSansBold,
                    }}
                  >
                    {data.endTime}
                    {"\n"}
                    {data.endDate}
                  </Text>: <Text
                    style={{
                      color: "black",
                      fontSize: size(15),
                      fontFamily: OpenSansBold,
                    }}
                  >
                    {data.startTime}
                    {"\n"}
                    {data.startDate}
                  </Text>}
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
              {!isEmpty(codeshareInfo) && (
                <Text
                  style={{
                    color: "#000000",
                    fontSize: size(11),
                    fontFamily: CenturyGothicRegular,
                  }}
                >
                  {highlightText(get(codeshareInfo, "message"))}
                </Text>
              )}
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
                {data.isArrival ? (
                  <TitleValue
                    title={"ARRIVAL GATE"}
                    value={data.checkInCounters}
                  />
                ) : (
                  <TitleValue
                    title={"CHECK-IN COUNTERS"}
                    value={data.checkInCounters}
                  />
                )}
                {data.isArrival ? (
                  <TitleValue
                    title={"BAGGAGE CLAIM"}
                    value={data.belt}
                    style={{
                      paddingLeft: size(20),
                    }}
                  />
                ) : (
                  <TitleValue
                    title={"BOARDING GATE"}
                    value={data.gate}
                    style={{
                      paddingLeft: size(20),
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: size(10),
                  width: "100%",
                }}
              >
                <TitleValue title={"AIRLINE"} value={data.airline} />
                <TitleValue
                  title={"FLIGHT TYPE"}
                  value={data.flightType}
                  style={{
                    paddingLeft: size(20),
                    textTransform: "uppercase",
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
                <TitleValue title={"FLIGHT NUMBER"} value={data.flightNumber} />
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
              {showTrackButton && (
                <View>
                <TouchableOpacity
               // onPress={() => this.props.navigation.navigate("PromotionDetails",{details:item})}
                  style={{
                    alignItems: "center",
                  }}
                  onPress={() => {
                    this.setState({
                      departureModal: false,
                      trackModal: true,
                    });
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
               
                </View>
               
               
              )}
               
              {showTrackButton && !isPlanExisted && (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/Images/PlanMyJourneyIcon.png")}
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
              )}
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
        <Modal
          transparent
          visible={this.state.trackModal}
          animationType={"slide"}
          onRequestClose={() => {
            this.setState({ trackModal: false });
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
                height:"40%",
                width: "90%",
                alignSelf: "center",
                backgroundColor: "white",
                borderRadius: size(20),
                padding: size(15),
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: size(12),
                  right: size(15),
                }}
                onPress={() => {
                  this.setState({ trackModal: false });
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
                source={tailImage}
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
               {data.flightNumber}
              </Text>
              <Text
                style={{
                  fontSize: size(15),
                  textAlign: "center",
                  color: "black",
                  fontFamily: MontserratRegular,
                  marginTop: size(20),
                  paddingHorizontal: size(25),
                }}
              >
                You will now receive alerts for this flight
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(0,146,156)",
                  height: size(40),
                  alignSelf: "center",
                  marginTop: size(22),
                  width: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({ trackModal: false });
                }}
              >

                <ImageBackground
                style={{
                  width: '100%',
                  height:'100%',
                  justifyContent:"center",
                  alignItems:"center"
                }}
                source={require('../../assets/Images/flight_BG.jpeg')}
                >
                <Text
                  style={{
                    color: "white",
                    fontFamily: OpenSansBold,
                    fontSize: size(13),
                  }}
                >
                  DONE
                </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapState = (state, props) => {
  console.log(props);
  const { id, codeshareId } = get(props, "route.params", {});
  const data = getFlightDetails(state, id, codeshareId);
  console.log(data);
  return {
    alreadyTracking: isAlreadyTracking(state, codeshareId),
    id: id,
    headerText: getHeaderText(state, id),
    shareMessage: getShareMessage(state, id),
    textContent: "flight_details",
    codeshareInfo: getCodeshareInfo(state, id, codeshareId),
    data: data,
    userProfile: get(state, "userProfile", { token: "", profile: {} }),
    isPlanExisted: isPlanExisted(state, codeshareId),
    tailImage: getTailImage(state, data ? data.flightNumber : null),
    isUnavailable: get(state, "flightInfo.flightUnavailable", null),
    hasError: get(state, "flightInfo.detailRequestError", null) != null,
  };
};

const mapDispatch = (dispatch, props) => ({
  goBack: () => dispatch(rootNav.back()),
  selectFlight: (id, codeshareId, planData) => {
    // TODO: remove this in sprint 2
    dispatch(plans.removeCurrentPlan());
    dispatch(
      rootNav.navigate("BoardingPlan", {
        id: id,
        codeshareId: codeshareId,
        planData: planData,
      })
    );
    // dispatch(plans.createPlan(id, codeshareId, planData))
  },
  trackFlight: (id) => dispatch(push.subscribeToTopic(id)),
  untrackFlight: (id) => dispatch(push.unSubscribeFromTopic(id)),
  saveFlightToUserAccount: (id, planData) =>
    dispatch(trackedFlights.trackFlight({ id: id, flightInfo: planData })),
  removeFlightFromUserAccount: (id) =>
    dispatch(trackedFlights.untrackFlight(id)),
  showPlan: (args) =>
    dispatch(
      rootNav.navigateMultiple([
        { routeName: "BoardingPassForm" },
        { routeName: "BoardingPlan" },
      ])
    ),
});

export default connect(mapState, mapDispatch)(FlightDetailsPage);
