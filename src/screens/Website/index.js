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
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "../../assets/styles";
import styled from "styled-components/native";
import WebView from "react-native-webview";
const size = (value) => RFValue(value);

class Website extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }
  hideSpinner() {
    this.setState({ visible: false });
  }
  render() {
    
 
    return (
      <SafeAreaView style={[styles.container]}>
          <WebView
            source={{uri:'https://www.grab.com/'}}
            onLoad={() => this.hideSpinner()}
          />
           {this.state.visible && (
        <ActivityIndicator
          style={{ position: "absolute", top: '50%', left: '45%' }}
          size="large"
          color={'green'}
        />
      )}
      </SafeAreaView>
    );
  }
}

export default Website;