import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { bindActionCreators } from "redux";
import moment from "moment";
import { isEmpty } from "lodash";

import FlightInfoList from "../FlightInfoList";

import { flightInfo, search } from "./Action";

import style from "./style";
import { showPrevFlightBtn } from "./selectors";
import { FlightInfoStyle } from "../FlightInfo/style";
import DropDown from "../../components/DropDown";
import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import {
  FlightDetail,
  FlightInfoHeader,
  FlightInfoText,
  KLIA,
  NodataFound,
  SearchBar,
} from "../../components/FlightInfo";
import {
  CenturyGothicRegular,
  MontserratBold,
  MontserratRegular,
  OpenSansBold,
  OpenSansRegular,
} from "../../assets/font";
import SearchModal from "./SearchModal";
const size = (value) => RFValue(value);

const getDateFormat = (str) => {
  const m = moment(str);
  if (str && moment.isMoment(m)) {
    return m.format("D MMM YYYY, h:mm a");
  }
  return "";
};

class FlightInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureActive: true,
      isSearchModalOpened: false,
      dropDown: [
        { label: "KLIA", value: "klia" },
        { label: "KLIA2", value: "klia2" },
      ],
      selectedFlia: 0,
    };
    this.getContent = this.getContent.bind(this);
    this.closeSearchModal = this.closeSearchModal.bind(this);
    this.toggleSearchModal = this.toggleSearchModal.bind(this);
    this.onFlightClicked = this.onFlightClicked.bind(this);
    this.onSearchFlightClicked = this.onSearchFlightClicked.bind(this);
  }

  getPrevFlights = () => {
    const getFlights = this.state.departureActive
      ? this.props.getPrevDepartures
      : this.props.getPrepArrivals;
    getFlights();
  };


  textInputFocus = () => {
    this.setState({ isShowListView: true });
  };

  onChangeText = (e) => {
    console.log("sahsahgshsgahsa", e.nativeEvent.text);
    if (e.nativeEvent.text.length > 0) {
      this.setState({ isShowListView: false });
    }
  };

  getContent() {
    const {
      language,
      network,
      isRequestStatusOK,
      showPrevFlightBtn,
      lastUpdate,
    } = this.props;
    const { departureActive } = this.state;
    const offlineMessage = "offline Message";
    const notAvailableMessage = "test";
    const btnVisible = departureActive
      ? showPrevFlightBtn.departure
      : showPrevFlightBtn.arrival;

    if (isRequestStatusOK) {
      return (
        <View style={style.flightList}>
          {/* SearchBar */}
          {/* <TextName onPress={() => this.setLaunguage()}>
            {I18n.t("test")}
          </TextName>
          <TextName onPress={() => this.setLaunguage()}>
            {I18n.t("test")}
          </TextName> */}
          <View
            style={{
              backgroundColor: "#009BA7",
              paddingBottom: size(5),
            }}
          >
            <SearchBar
              // onChangeText={this.searchFlight}
              onChangeKlia={this.handleFlightTypeSelected}
              selected={this.state.selectedFlia}
              onChangeHandler={(event) => this.onChangeText(event)}
              onFocusHandler={() => this.textInputFocus()}
            />
            {this.state.isShowListView ? (
               <SearchModal
               isVisible={this.state.isShowListView}
               onClose={this.toggleSearchModal}
               onBackButtonPress={this.closeSearchModal}
               onFlightClicked={this.onSearchFlightClicked}>
             </SearchModal>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                marginVertical: size(10),
                justifyContent: "space-between",
                paddingHorizontal: 16,
                marginTop:size(-10)
              }}
            >
              {btnVisible && (
                <TouchableOpacity onPress={this.getPrevFlights}>
                  <View style={{marginTop:size(50),marginLeft:size(50)}}>
                    <Text
                      style={{
                        fontSize: size(15),
                        color: "white",
                        fontFamily: OpenSansBold,
                        paddingTop:size(10),
                        paddingLeft:size(35)
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
                  </View>
                </TouchableOpacity>
              )}
              <View
                style={{
                  alignItems: "flex-end",
                  marginTop:size(-60),
                  marginLeft:size(-45)
                }}
              >
                <Text
                  style={{
                    fontSize: size(13.5),
                    color: "white",
                    fontFamily: CenturyGothicRegular,
                  }}
                >
                  LAST UPDATE
                </Text>
                <Text
                  style={{
                    fontSize: size(13.5),
                    color: "white",
                    fontFamily:CenturyGothicRegular,
                  }}
                >
                  {getDateFormat(lastUpdate)}
                </Text>
              </View>
            </View>
          </View>
          <FlightInfoList navigation={this.props.navigation} type={departureActive ? "departure" : "arrival"} />
        </View>
      );
    }
    //  else if (!network.isConnected) {
    //   return (
    //     <View style={style.flightList}>
    //       <OfflineMessage showIf={!network.isConnected} message={offlineMessage} closable={false} icon={require('../../assets/images/icons/wiFiNo.png')}/>
    //     </View>
    //   )
    // } else {
    //   return (
    //     <View style={style.flightList}>
    //       <OfflineMessage showIf={!isRequestStatusOK} message={notAvailableMessage} closable={false} icon={require('../../assets/images/icons/exclamation.png')}/>
    //     </View>
    //   )
    // }
  }

  closeSearchModal() {
    if (this.state.isSearchModalOpened) {
      this.setState({
        isSearchModalOpened: false,
      });
    }
  }

  toggleSearchModal() {
    const { isSearchModalOpened } = this.state;
    this.setState({
      isSearchModalOpened: !isSearchModalOpened,
    });
  }

  fetch_departure_flights = () => {
    const { flightActions } = this.props;
    flightActions.fetchDepartures();
  };

  fetch_arrival_flights = () => {
    const { flightActions } = this.props;
    flightActions.fetchArrivals();
  };

  componentDidMount() {
    const { flightActions } = this.props;
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      // alert('sbjssjbjs')
      flightActions.fetchDepartures()
    );
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      flightActions.fetchDepartures()
    );
  }

  handleFlightTypeSelected = (departureActive) => {
    this.props.flightActions.clearData();
    this.setState({
      departureActive: departureActive ? false: true,
      selectedFlia: departureActive,
    },()=>{
     this.state.departureActive ? this.fetch_departure_flights() : this.fetch_arrival_flights();
    });
  };

  handleTerminalSelected = () => {
    const { departureActive } = this.state;
    const { clearData } = this.props.flightActions;
    clearData();
    departureActive
      ? this.fetch_departure_flights()
      : this.fetch_arrival_flights();
  };

  componentWillUnmount() {
    this.props.flightActions.clearData();
    this.didFocusSubscription.remove();
    this.willFocusSubscription.remove();
  }

  onFlightClicked({ id, codeshareId }) {
    this.props.showDetails(id, codeshareId);
  }

  onSearchFlightClicked(item) {
    this.setState({
      isSearchModalOpened: false,
    });
    this.props.selectSearchFlight(item);
  }

  render() {
    // const { language, terminal, lastUpdate, network, isRequestStatusOK } = this.props
    // const { departureActive } = this.state;
    // const { dropdown: dropdownOptions, last_update } = 'flight_info'
    // const dropdownSelectedIndex = dropdownOptions.indexOf(terminal) || -1
    // const offlineMessage ='offline_message_flight_info'
    // const notAvailableMessage = 'not_available_message_flight_info'
    return (
      <React.Fragment>
        <FlightInfoStyle.FlightHeadeView>
          <Header
            navigation={this.props.navigation}
            leftTitle={"FLIGHT"}
            rightTittle={"INFORMATION"}
          />
          <View style={{ width: "25%" }}>
            <DropDown
              list={this.state.dropDown}
              borderColor={"#F1DDE9"}
              onSelectValue={(value) => {
                this.setState({ selectedTerminal: value, dropDownOpen: false },()=>{
                  this.props.setTerminal(this.state.selectedTerminal);
                  this.handleTerminalSelected();
                });
              }}
              borderRadius={25}
              borderWidth={1}
              height={40}
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

        <View>{this.getContent()}</View>
      </React.Fragment>
    );
  }
}

class OfflineMessage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.showIf) {
      this.setState({ hideView: false });
    }
  }

  render() {
    if (this.props.closable && this.state && this.state.hideView) {
      return <View></View>;
    } else {
      return (
        <View
          style={{ backgroundColor: "transparent", width: "100%", padding: 20 }}
        >
          <Image source={this.props.icon} />
          <H2 style={{ color: "#FFF", marginTop: 10, height: "100%" }}>
            {this.props.message}
          </H2>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  terminal: state.flightInfo.selected,
  lastUpdate: state.flightInfo.lastRequest,
  isRequestStatusOK: isEmpty(state.flightInfo.requestError),
  network: state.network,
  showPrevFlightBtn: showPrevFlightBtn(state),
});

const mapDispatchToProps = (dispatch) => ({
  flightActions: bindActionCreators(flightInfo, dispatch),
  showDetails: (id, codeshareId) =>
    dispatch(flightInfo.fetchFlight(id, codeshareId)),
  goBack: () => dispatch(rootNav.back()),
  setTerminal: (terminalCords) => {
    dispatch(flightInfo.setTerminal(terminalCords));
  },
  selectSearchFlight: (item) => dispatch(search.selectSearchFlight(item)),
  getPrevDepartures: () => dispatch(flightInfo.fetchPrevDepartures()),
  getPrepArrivals: () => dispatch(flightInfo.fetchPrevArrivals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightInfoPage);
