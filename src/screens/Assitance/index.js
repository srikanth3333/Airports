import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from '../../Assets/styles';
import {
  FlightDetail,
  FlightInfoHeader,
  FlightInfoText,
  KLIA,
  SearchBar,
} from '../../Components/FlightInfo';

const size = value => RFValue(value);

class Assistance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightDetails: [
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/AirAsia_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/Malaysia_Airlines_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'rgb(119,191,69)',
          flightStatus: 'ON BOARDING',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/AirAsia_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/Malaysia_Airlines_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/AirAsia_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/Malaysia_Airlines_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/AirAsia_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'orange',
          flightStatus: 'GATE CLOSED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/Malaysia_Airlines_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/AirAsia_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
        {
          flightLogo: (
            <Image
              source={require('../../Assets/Images/Malaysia_Airlines_Logo.png')}
              style={styles.flightLogo}
            />
          ),
          placeName: 'SINGAPORE',
          flightName: 'AIR ASIA\nAIRLINES',
          flightNo: 'UL 3285',
          flightDateTime: '08:10\n10/06/2020',
          flightStatusColor: 'red',
          flightStatus: 'FLIGHT CANCELLED',
        },
      ],
    };
  }
  render() {
    const {flightDetails} = this.state;
    var key = 0;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingHorizontal: RFValue(10),
          }}>
          {/* Header */}
          <FlightInfoHeader />

          {/* SearchBar */}
          <SearchBar />
          {/* Flight List */}
          <FlatList
            data={flightDetails}
            style={{
              marginTop: size(10),
            }}
            contentContainerStyle={{
              paddingBottom: size(110),
            }}
            renderItem={({item, index}) => <FlightDetail item={item} />}
            keyExtractor={() => key++}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Assistance;
