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
import styles from '../../assets/styles';


const size = value => RFValue(value);

class Notifications extends React.Component {
  constructor(props) {
    super(props);
   
  }
  render() {
    
 
    return (
      <SafeAreaView style={[styles.container,{justifyContent:"center",alignItems:"center"}]}>
        <Text>Coming Soon</Text>
      </SafeAreaView>
    );
  }
}

export default Notifications;
