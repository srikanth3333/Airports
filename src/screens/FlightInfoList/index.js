import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Image, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEmpty, isString } from "lodash";

import { flightInfo } from "../FlightInfoPage/Action";

import style from "./style";
import getFormattedFlights from "../../utils/reduxSelect/selectFlights";
import {
  FlightDetail,
  FlightInfoHeader,
  FlightInfoText,
  KLIA,
  NodataFound,
  SearchBar,
} from "../../components/FlightInfo";
class FlightInfoList extends Component {
  onItemPress = ({ id, codeshareId }) => {
    if (this.props.onItemPress) {
      this.props.onItemPress();
    }
    this.props.showDetails(id, codeshareId);
    this.props.navigation.navigate('FlightDetailsPage',{id:id,codeshareId:codeshareId})
  };
  render() {
    const {
      data,
      isSearchModal,
      noResultMessage,
      showDetails,
      onItemPress,
      fetchingDone,
      searchTerm,
      ...otherProps
    } = this.props;
    console.log(data);
    if (fetchingDone && isEmpty(data)) {
      if (isSearchModal) {
        return (
          <View style={{ paddingTop: 15 }}>
            <Caption>{noResultMessage}</Caption>
          </View>
        );
      } else {
        return (
          <View>
            <FlatList
              refreshing={false}
              {...otherProps}
              ListEmptyComponent={
                <View
                  style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    padding: 20,
                  }}
                >
                  <Text
                    style={{ color: "#000", marginTop: 10, height: "100%" }}
                  >
                    {noResultMessage}
                  </Text>
                </View>
              }
              ListFooterComponent={
                <View style={{ height: 200, backgroundColor: "green" }} />
              }
            />
          </View>
        );
      }
    } else {
      return (
        <View style={{paddingHorizontal:2}}>
          <FlatList
            refreshing={false}
            {...otherProps}
            keyExtractor={(item, index) =>
              item.codeshareId.toString() || index.toString()
            }
            data={data}
            renderItem={({ item }) => (
              <FlightDetail
              {...item} onPress={() => this.onItemPress(item)}
              />
            )}
            ListFooterComponent={
              <View style={{ height: 200}} />
            }
          />
          {!fetchingDone && data && data.length < 1 && (
            <ActivityIndicator
              style={{ position: "absolute", top: "50%", alignSelf: "center" }}
              size="large"
              color="#000"
            />
          )}
        </View>
      );
    }
  }
}

const mapState = (state, props) => {
  const { type, searchTerm } = props;
  const data = getFormattedFlights(state, type, searchTerm);
  const isSearchModal = isString(searchTerm) && !isEmpty(searchTerm);
  const messagePath = isSearchModal ? "no_result" : "flight_info.no_result";
  return {
    data: data,
    isSearchModal: isSearchModal,
    fetchingDone: !isEmpty(state.flightInfo.lastRequest),
  };
};

const mapDispatch = (dispatch, props) => {
  const { type } = props;
  return {
    showDetails: (id, codeshareId) =>
      dispatch(flightInfo.fetchFlight(id, codeshareId)),
    onRefresh: () => {
      dispatch(flightInfo.clearData());
      if (type === "departure") {
        dispatch(flightInfo.fetchDepartures());
      } else if (type === "arrival") {
        dispatch(flightInfo.fetchArrivals());
      }
    },
    onEndReached: () => {
      if (type === "departure") {
        dispatch(flightInfo.fetchDepartures());
      } else if (type === "arrival") {
        dispatch(flightInfo.fetchArrivals());
      }
    },
  };
};

export default connect(mapState, mapDispatch)(FlightInfoList);

FlightInfoList.propTypes = {
  type: PropTypes.oneOf(["arrival", "departure"]),
  data: PropTypes.array,
};
