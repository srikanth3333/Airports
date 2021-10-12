import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import styles from "../../../assets/styles";
import {
  BackButton,
  BackTitleHeader,
  GeneralItem,
  MarginTop,
  Title,
  GeneralTitleHeader
} from "../../../components/Common";

const size = (value) => RFValue(value);

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { list } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
         {/* <MarginTop top={size(10)} /> */}
        <GeneralTitleHeader navigation={this.props.navigation} title={"GENERAL"}  />
        <MarginTop top={size(-45)} />
        <Title
            lightTitle={"PRIVACY"}
            bolTitle={"  POLICY"}
           // icon={require("../../../assets/Images/Privacy.png")}
          />
        <ScrollView
          style={{
            padding: size(1),
            marginLeft: size(10),
            padding: size(20),
          }}
        >
          
          {/* <Title
            lightTitle={"Privacy"}
            bolTitle={"Policy"}
            icon={require("../../../assets/Images/Privacy.png")}
          /> */}
          <MarginTop top={size(22)} />
          <Text
            style={{
              fontSize: size(17),
              fontFamily: "CenturyGothic-Regular",
              color:"#37183C"
            }}
          >
            KL International Airport(KLIA), it's flagship airport was recently
            voted as the Large Airport of The Year at the CAPA Awards for
            Excellence in Asia Pacific Aviation 2014. KLIA was also thrice voted
            as the Best Airport (15-25 million passengers per annum) in 2005
            AETRA awards.{"\n\n"} 2006 ACI-ASQ awards and 2007 ACI-ASQ awards
            while the Low Cost Carrier Terminal (LCCT-KLIA) was named CAPA Low
            Cost Airport of the Year at the CAPA Aviation Awards for Excellence
            2006. Malaysia Airport has also received numerous awards that
            acknowledged it's commitment in service, community engagement,
            corporate responsibility and organisational excellence.{"\n"}
          </Text>
          <Text
            style={{
              //color: "rgb(77,43,97)",
              fontSize: size(17),
              fontFamily: "CenturyGothic-Regular",
              color:"#37183C"
            }}
          >
            KLIA has taken a big stide in the realisation of becoming a global
            integrate hub.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PrivacyPolicy;
