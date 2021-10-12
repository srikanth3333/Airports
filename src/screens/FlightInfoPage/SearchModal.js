import React, { Component } from 'react'
import { connect } from 'react-redux'
// import I18n from 'react-native-i18n'
import { FlatList, RefreshControl, StyleSheet, ScrollView, View, Dimensions, Platform, TouchableOpacity, ActivityIndicator, AppState, Keyboard, Text,Modal ,Image} from 'react-native'
import { get } from 'lodash'
import { FlightInfoStyle } from "../FlightInfo/style";
import { Header } from "../../components/Header";
import DropDown from "../../components/DropDown";
import SwitchToggle from "../../components/SwitchToggle";
import { size } from "../../assets/size";
import {   MontserratBold,
  MontserratRegular,
  CenturyGothicBold,
  CenturyGothicRegular,
  OpenSansBold,
  OpenSansLight,
  OpenSansRegular, } from '../../assets/Fonts/font';

// import Modal from '../../components/Modal'
// import CategoryGroup from '../../components/CategoryGroup'
// import Icon from '../../components/Icon'
// import Dropdown from '../../components/Dropdown'
// import { Text, Text, Label, Text } from '../../components/Typography'

// import Input from '../../components/Input'

// import { colors } from '../../general/styles'
// import style from '../InboxPage/style';
import { flightInfo, search } from "./Action";
import { TextInput } from 'react-native-gesture-handler';
// import flightInfoStyle from './style';
import {
  FlightDetail,
  FlightInfoHeader,
  FlightInfoText,
  KLIA,
  NodataFound,
  SearchBar,
} from "../../components/FlightInfo"; 
// import FlightInfoCard from '../../components/FlightInfoCard'
// import DepartureArrivalTabs from './DepartureArrivalTabs'
import selectSearchFlights from './selectSearchFlights'

class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearchActive: false,
      searchTerm: '',
      selectedItem: null,
      showFlights: false,
      flightsFor: '',
      refreshingFlights: false,
      refreshing: false,
      results: [],
      lateResults: [],
      appState: AppState.currentState,
      terminal: 'KLIA',
      departureActive: true,
      text: '',
      dropDown: [
        { label: "KLIA", value: "klia" },
        { label: "KLIA2", value: "klia2" },
      ],
    ListKlia : [
        { label: "departure", value: true },
        { label: "arrival", value:false },
      ]
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.onItemPress = this.onItemPress.bind(this)
    this.onModalHide = this.onModalHide.bind(this)
    this.handleItemPress = this.handleItemPress.bind(this)
    this._handleAppStateChange = this._handleAppStateChange.bind(this)
  }

  componentDidMount() {
    const that = this;
    debugger
    setTimeout(() => {
      that.props.fetchFlightMetadata()
    }, 500)

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    this.props.fetchFlightMetadata()
    this.setState({ appState: nextAppState });
  }

  handleSearch(text, { loadAll, departureActive } = { loadAll: false, departureActive: this.state.departureActive }) {
    const isSearchActive = (text && text.length > 0)
    const textContent = 'search_modal'
    if (this.state.isSearchActive !== isSearchActive || this.state.searchTerm !== text) {
      this.setState({
        isSearchActive: isSearchActive,
        searchTerm: text
      })
    }
    this.setState({ refreshing: true });
    if (!isSearchActive || (this.state.showFlights && text !== this.state.flightFor)) {
      this.setState({
        showFlights: false,
        flightsFor: '',
        results: [],
        refreshing: false,
        refreshingFlights: false,
        selectedItem: null,
        lateResults: [],
        text: ''
      })
      this.props.clearSearchResults()
    } else {
      const { flightMeta = {} } = this.props.flightMetadata;
      const { airlineOperators = [], airportCodes = [], flights = [] } = flightMeta
      const searchTerm = text || '';
      const searchTermLowerCase = searchTerm.toLowerCase().trim();
      let results = [];
      const spacelessSearchTerm = searchTermLowerCase.replace(/\s/g, '')
      const searchFlightsFor = [];
      airlineOperators.forEach((item, index) => {
        const itemName = get(item, 'operatorName', '');
        const doesItStartWith = itemName.toLowerCase().startsWith(searchTermLowerCase);
        if (doesItStartWith) {
          debugger;
          results.push({
            prefix: '',
            highlight: itemName.substr(0, searchTermLowerCase.length),
            suffix: itemName.substr(searchTermLowerCase.length),
            item: item,
            type: 'operator'
          })
        }
        const opcode = get(item, 'operator', '').toLowerCase();
        const lenOpCode = opcode.length;
        const lenTerm = spacelessSearchTerm.length;
        const searchTermPrefix = spacelessSearchTerm.substr(0, lenTerm > lenOpCode ? lenOpCode : lenTerm)
        if (opcode.startsWith(searchTermPrefix)) {
          searchFlightsFor.push(item)
        }
      });

      flights.forEach((item, index) => {
        const itemName = get(item, 'flightNumber', '')
        const indexAtSearchTerm = itemName.toLowerCase().indexOf(' ' + searchTermLowerCase)
        const hasNumber = (indexAtSearchTerm > -1)
        if (hasNumber) {
          results.push({
            prefix: itemName.substr(0, indexAtSearchTerm),
            highlight: itemName.substr(indexAtSearchTerm, (searchTermLowerCase.length + 1)),
            suffix: itemName.substr(indexAtSearchTerm + (searchTermLowerCase.length + 1)),
            item: item,
            type: 'flight'
          })
        }
      });

      airportCodes.forEach((item, index) => {
        const itemName = get(item, 'city', '') ? get(item, 'city', '').toLowerCase() : '';
        const doesItStartWith = itemName.startsWith(searchTermLowerCase)

        if (doesItStartWith && itemName !== 'kuala lumpur') {
          (!departureActive) ?
            results.push({
              prefix: '',
              highlight: itemName.substr(0, searchTermLowerCase.length),
              suffix: itemName.substr(searchTermLowerCase.length) + ` (${textContent.origin})`,
              item: item,
              type: 'airport-origin'
            })
            :
            results.push({
              prefix: '',
              highlight: itemName.substr(0, searchTermLowerCase.length),
              suffix: itemName.substr(searchTermLowerCase.length) + ` (${textContent.destination})`,
              item: item,
              type: 'airport-destination'
            })
        } else if (doesItStartWith && itemName === 'kuala lumpur') {
          (departureActive) ?
            results.push({
              prefix: '',
              highlight: itemName.substr(0, searchTermLowerCase.length),
              suffix: itemName.substr(searchTermLowerCase.length) + ` (${textContent.origin})`,
              item: item,
              type: 'airport-origin'
            })
            :
            results.push({
              prefix: '',
              highlight: itemName.substr(0, searchTermLowerCase.length),
              suffix: itemName.substr(searchTermLowerCase.length) + ` (${textContent.destination})`,
              item: item,
              type: 'airport-destination'
            })
        }
      });

      const MAX_FLIGHTS = 20
      const that = this;
      //setTimeout(() => {
      const resArray = results;
      for (var xi = 0; xi < searchFlightsFor.length; xi++) {
        const e = searchFlightsFor[xi];
        const flights = e.flights
        for (var yi = 0; yi < flights.length; yi++) {
          const m_item = flights[yi];
          if (m_item.leg == (departureActive ? 'D' : 'A')) {
            const m_itemName = get(m_item, 'spacelessFlightNumber', '');
            const doesItStartWith = m_itemName.toLowerCase().startsWith(spacelessSearchTerm);
            if (doesItStartWith) {
              resArray.push({
                prefix: '',
                highlight: m_itemName.substr(0, spacelessSearchTerm.length),
                suffix: m_itemName.substr(spacelessSearchTerm.length),
                item: m_item,
                type: 'flight'
              })
              if (!loadAll)
                if (resArray.length > MAX_FLIGHTS) {
                  break;
                }
            }
          }
        }

        if (!loadAll)
        console.log("resArray",resArray)
          if (resArray.length > MAX_FLIGHTS) {
            break;
          }
      }
      //that.setState({lateResults: resArray})


      this.setState({
        showFlights: false,
        flightsFor: '',
        refreshingFlights: false,
        selectedItem: null,
        results: results,
        lateResults: [],
        refreshing: false
      })
      //}, 0);

    }
  }

  onModalHide() {
    this.setState({
      isSearchActive: false,
      searchTerm: '',
      text: ''
    })
  }

  onItemPress(item) {
    Keyboard.dismiss();
    this.props.onFlightClicked(item);
  }

  handleItemPress(item, { loadAll } = { loadAll: false }) {
    const textContent = 'search_modal'
    const leg = this.state.departureActive ? 'D' : 'A'
    this.setState({ refreshingFlights: true })
    if (item.type == 'place') {
      const { path } = item.item
      this.props.selectPlace(path)
      if (this.props.onSearchItemClick) {
        this.props.onSearchItemClick(item)
      }
    } else if (item.type == 'operator') {
      this.setState({ showFlights: true, selectedItem: item, flightsFor: item.item.operatorName })
      this.props.searchFlightsByAirline({ code: item.item.operator, loadAll: loadAll, leg: leg })
      this.setState({ text: item.item.operatorName })
    } else if (item.type == 'airport-origin') {
      this.setState({ showFlights: true, selectedItem: item, flightsFor: item.item.city + ` (${textContent.origin})` })
      this.props.searchFlightsByCity({ code: item.item.airportCode, prefix: 'Origin', loadAll: loadAll, leg: leg })
      this.setState({ text: item.highlight + item.suffix })
    } else if (item.type == 'airport-destination') {
      this.setState({ showFlights: true, selectedItem: item, flightsFor: item.item.city + ` (${textContent.destination})` })
      this.props.searchFlightsByCity({ code: item.item.airportCode, prefix: 'Destination', loadAll: loadAll, leg: leg })
      this.setState({ text: item.highlight + item.suffix })
    } else if (item.type == 'flight') {
      this.setState({ showFlights: true, selectedItem: item, flightsFor: item.item.flightNumber })
      this.props.searchFlightsByFlightNumber({ flightNumber: item.item.flightNumber, loadAll: loadAll, leg: leg })
      this.setState({ text: item.item.flightNumber })
    }
    Keyboard.dismiss();
    this.setState({ refreshingFlights: false })
  }

  handleFlightTypeSelected = (departureActive) => {
    this.setState({
      departureActive: departureActive
    })
    if (this.state.isSearchActive && this.state.showFlights) return
    this.handleSearch(this.state.searchTerm, { loadAll: true, departureActive: departureActive })
  }

  renderSearchResult = (data) => {
    const { terminal, departureActive } = this.state;
    const terminalLC = (terminal || '').toLowerCase();
    let filteredResults = data.filter((item) => {
      if ((item.terminal || '').toLowerCase() === terminalLC && item.leg === (departureActive ? 'D' : 'A')) {
        return item;
      }
    });
    return <FlatList
      keyExtractor={(item, index) => item.codeshareId.toString() || index.toString()}
      data={filteredResults}
      extraData={this.state}
      renderItem={
        ({ item }) => {
          return (
            <FlightDetail
            {...item} onPress={() => this.onItemPress(item)}
            />          )
        }
      } />
  }

  render() {
    // const { language, onSearchItemClick } = this.props
    const textContent = 'search_modal'
    const { terminal, departureActive } = this.state
    const { dropdown: terminalDropdownOptions } = 'flight_info'
    // const terminalDropdownSelectedIndex = terminalDropdownOptions.indexOf(terminal) || -1
    const { searchTerm, results = [], lateResults = [] } = this.state;

    const data = this.props.flightSearchResults
    // const terminalLC = (terminal || '').toLowerCase()
    let searchError = this.props.searchError
    if (searchError === "no result") {
      searchError = textContent.no_result
    }
    console.log(lateResults)
    return (     
      <Modal {...this.props} style={styles.modal} onModalHide={this.onModalHide} onShow={() => {
        const that = this;
        setTimeout(() => {
          that.props.fetchFlightMetadata()
        }, 500)
      }}>
        {/* Searchbar here */}
        
        {/* <View style={{ width: "40%",paddingHorizontal:size(10),marginLeft:"60%",marginTop:20}}> */}
        <FlightInfoStyle.FlightHeadeView>
        <Header
            navigation={this.props.navigation}
            leftTitle={"FLIGHT"}
            rightTittle={"INFORMATION"}
          />
           <View style={{ width: "25%",marginRight:5 }}>
            <DropDown
              list={this.state.dropDown}
              borderColor={"#F1DDE9"}
              onSelectValue={(value) => {
                this.setState({ terminal: value, dropDownOpen: false });
              }}
              borderRadius={25}
              borderWidth={1}
              height={40}
              selectedValue={this.state.terminal}
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
              backgroundColor: "#009BA7",
              paddingBottom: size(15),
              height: size(170)
            }}
          >
          <View style={{
                flexDirection: "row",
                marginVertical: size(20),
                justifyContent: "space-around",
                alignItems:"center",
                paddingHorizontal: size(-15),
              }}>
          <View style={{ width: "130%",marginLeft:33 }}>
<SwitchToggle list={this.state.ListKlia}  onChange={this.handleFlightTypeSelected}
/>
</View>
<View
               style={{
                width: "50%",
                //alignItems: "flex-end",
                marginLeft:"-80%" 
              }}
              >
                <Text
                  style={{
                    fontSize: size(15),
                    color: "white",
                    fontFamily: OpenSansRegular,
                  }}
                >
                  LAST UPDATE
                </Text>
                <Text
                  style={{
                    fontSize: size(15),
                    color: "white",
                    fontFamily: OpenSansRegular,
                  }}
                >
                  {/* {getDateFormat(lastUpdate)} */}
                   00- JUN 0000, 9: 08 AM
                </Text>
              </View>
</View>
          <View style={{ width: "95%" ,paddingHorizontal: size(10),marginLeft:10,paddingVertical:20}}>
        <View style={styles.searchContainer}>
        
             {this.state.text !== '' ?
             
             <TextInput
             style={styles.searchInputTextBox}
               value={this.state.text}
               placeholder={"Search Flight"}
               onChangeText={this.handleSearch} />
             :
             <TextInput
             style={styles.searchInputTextBox}
             placeholder={"Search Flight"}
             onChangeText={this.handleSearch} />
           }
            <Image
          source={require('../../assets/Images/Departure_Icon.png')}
          style={styles.departureIcon}
        />
                   
</View>
</View>

        </View>
        <View
            style={{
              backgroundColor: "#F5FEFF",
              paddingBottom: size(15),
              height: "75%"
            }}
          >
        

        <ScrollView style={styles.itemContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing || this.state.refreshingFlights}
              onRefresh={() => {
                if (this.state.showFlights) {
                  this.handleItemPress(this.state.selectedItem, { loadAll: true })
                } else {
                  this.handleSearch(this.state.searchTerm, { loadAll: true })
                }
              }}
            />}
          keyboardShouldPersistTaps='always' >
          {this.state.isSearchActive ?
            (this.state.showFlights ? <View style={{ marginHorizontal: 20 }}>
              {!searchError && (!data || data.length < 1) && <ActivityIndicator style={{ margin: 20 }} size="large" />}
              {searchError && <Text>{searchError}</Text>}
              {!searchError && data && data.length > 0 && <Text>{this.state.flightsFor}</Text>}
              {this.renderSearchResult(data)}
            </View> :
              <View style={{ marginHorizontal: 20 }}>
                {((!results || results.length < 1) && (!lateResults || lateResults.length < 1)) && <View stlye={{ paddingTop: 15 }}><Text>
                  {'no_result'}
                </Text></View>}

                {results.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.handleItemPress(item)}
                      style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 15, borderBottomColor: '#00000010' }}>
                      <Text style={styles.searchResultText}>
                        {item.prefix}
                        <Text style={styles.searchResultHighlightedText}>{item.highlight}</Text>
                        {item.suffix}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
                {lateResults.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.handleItemPress(item)}
                      style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 15, borderBottomColor: '#00000010' }}>
                      <Text style={styles.searchResultText}>
                        {item.prefix}
                        <Text style={styles.searchResultHighlightedText}>{item.highlight}</Text>
                        {item.suffix}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>) :
            <View></View>
          }
        </ScrollView>
        </View>
      </Modal>
    )
  }
}

const mapState = state => ({
  // language: state.i18n.currentLanguage,
  flightMetadata: state.search.flightMetadata,
  searchError: state.search.searchError,
 flightSearchResults: selectSearchFlights(state),
})

const mapDispatch = dispatch => ({
  searchFlightsByCity: (cityCode) => dispatch(search.searchFlightsByCity(cityCode)),
  searchFlightsByAirline: (airportCode) => dispatch(search.searchFlightsByAirline(airportCode)),
  searchFlightsByFlightNumber: (flightNumber) => dispatch(search.searchFlightsByFlightNumber(flightNumber)),
  fetchFlightMetadata: () => dispatch(search.fetchFlightMetadata()),
  clearSearchResults: () => dispatch(search.clearSearchResults())
})

export default connect(mapState, mapDispatch)(SearchModal)

const { height: viewportheight, width: viewportwidth } = Dimensions.get('window')

const modalWidth = viewportwidth - 40
const modalMinHeight = (Platform.OS === 'ios') ? viewportheight - 103 : viewportheight - 145
const modalTop = (Platform.OS === 'ios') ? 40 : 20;


const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: modalWidth,
    top: modalTop,
  },
  searchContainer: {
    // paddingHorizontal: 20,
    // paddingBottom: 10,
    // borderWidth:2,
    // borderColor:"black",
    // borderRadius:20,
    // width:"70%",marginTop:30

    
      borderWidth: 0.5,
      borderRadius: size(30),
      //width: "55%",
      //marginTop: 10,
      paddingRight: size(15),
      // paddingVertical:size(0),
      height:size(40),
      flexDirection: "row",
      backgroundColor:'white',
      alignItems: "center",
      justifyContent: "space-between",

  },
  searchInputTextBox: {
    flex: 1,
    borderRadius: size(30),
    backgroundColor: 'white',
    padding:8,
    fontSize: size(14),
    fontFamily: OpenSansBold,
  },
  departureIcon: {
    width: size(28),
    height: size(28),
    resizeMode: "contain",
  },
  itemContainer: {
    //borderColor:"#707070",
    //borderWidth:2,
    marginLeft:30,
    marginTop: 10,
    height: modalMinHeight - 60
  },
  // searchResultText: { color: colors.secondary_light_gray },
  // searchResultHighlightedText: { color: colors.primary_blue }
})