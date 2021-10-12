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

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { list } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <GeneralTitleHeader navigation={this.props.navigation} title={"GENERAL"} />
        <MarginTop top={size(-45)} />
        <Title
            lightTitle={"TERMS OF"}
            bolTitle={"  USE"}
           // icon={require("../../../assets/Images/TermsIcon.png")}
          />
        <ScrollView
          style={{
            padding: size(20),
          }}
        >
          {/* <MarginTop top={size(-15)} /> */}
          {/* <Title
            lightTitle={"Terms of"}
            bolTitle={"Use"}
            icon={require("../../../assets/Images/TermsIcon.png")}
          /> */}
          <MarginTop top={size(22)} />
          <Text
            style={styles.regularParagraph}
          >
            KL International Airport(KLIA), it's flagship airport was recently
            voted as the Large Airport of The Year at the CAPA Awards for
            Excellence in Asia Pacific Aviation 2014{"\n\n"} KLIA was also thrice voted
            as the Best Airport (15-25 million passengers per annum) in 2005
            AETRA awards. 2006 ACI-ASQ awards and 2007 ACI-ASQ awards
            while the Low Cost Carrier Terminal (LCCT-KLIA) was named CAPA Low
            Cost Airport of the Year at the CAPA Aviation Awards for Excellence
            2006. Malaysia Airport has also received numerous awards that
            acknowledged it's commitment in service, community engagement,
            corporate responsibility and organisational excellence.{"\n"}
          </Text>
          <Text
style={styles.regularParagraph}          >
            KLIA has taken a big stide in the realisation of becoming a global
            integrate hub.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Terms;
