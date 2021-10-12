import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PromotionDetailstyles } from "./styles";
import { BackgroundImage } from "../../components/Login/index";
import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { WebView } from 'react-native-webview';
import { connect } from "react-redux";
import {formatPromotionDetails} from './selectors';
import { isEmpty, get, isArray, filter, set } from 'lodash'

class PromotionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {data}=this.props;
    return (
      <PromotionDetailstyles.ViewArea>

        {data && data.photo && data.photo.length>0?
       (<BackgroundImage
          img={{uri:data.photo[0]}}
        />)
        :
        <BackgroundImage
        img={require("../../assets/Images/promotionsMain.png")}
      />}
        <PromotionDetailstyles.HeadeView>
        <Header
            leftTitle={data.name}
            promotion={true}
            navigation={this.props.navigation}
          />
        </PromotionDetailstyles.HeadeView>
        <PromotionDetailstyles.container>
        <WebView
        originWhitelist={['*']}
        scalesPageToFit={false} 
        style={{backgroundColor:'#FDF2F7',flex:1,fontFamily:"CenturyGothic-Regular" }}
        source={{ html: data.longDescription }}
      />
        </PromotionDetailstyles.container>
      </PromotionDetailstyles.ViewArea>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { details } = get(props, 'route.params', {})
  return {
    data: formatPromotionDetails(state, details),
  }
}

export default connect(mapStateToProps, null)(PromotionDetails)

