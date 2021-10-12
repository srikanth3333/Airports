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
import { color } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { black, white } from "../../../assets/colors";

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

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { list } = this.state;
    return (
      <SafeAreaView style={[styles.container, ]}>
        <GeneralTitleHeader navigation={this.props.navigation} lightTitle={'ABOUT  '} 
            bolTitle={'KL INTERNATIONAL'} />
             <MarginTop top={size(-15)} />
             <Title bolTitle={'AIRPORT (KUL)'}/>
        {/* <Title
            lightTitle={'ABOUT'}
            bolTitle={'KL INTERNATIONAL'}
            //bolTitle={'AIRPORT (KUL)'}
          
            //icon={require("../../../assets/Images/AboutIcon.png")}
          />
          <Title bolTitle={'AIRPORT (KUL)'}/> */}
        <ScrollView
          style={{
            padding: size(5),
            marginLeft: size(10),
          }}
        >
          {/* <View style={[styles.flexRow, { alignItems: "center" }]}>
            <Image
              source={require("../../../Assets/Images/AboutIcon.png")}
              style={styles.infoIcon}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <Text style={[styles.aboutTitle]}>About</Text>
              <Text
                style={[styles.aboutTitle, { fontFamily: "Montserrat-Bold" }]}
              >
                MYairports 2.0
              </Text>
            </View>
          </View> */}
          {/* <Title
            lightTitle={'About'}
            bolTitle={'MYairports 2.0'}
            icon={require("../../../assets/Images/AboutIcon.png")}
          /> */}
          <MarginTop top={size(52)} />
          <Text
            style={{
              fontSize: size(18),
              color: "rgb(166,39,94)",
              // fontWeight: "bold",

              fontFamily: "CenturyGothic-Bold",
              color:"#BB1F68"
            }}
          >
            Malaysia Airports manages and operates 39 airports in Malaysia and
            one international airport in Istanbul,Turkey. The 39 airports in
            Malaysia comprise 5 international, 16 domestic and 18 Short Take-Off
            and Landing Ports(STOL Ports).
          </Text>
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
            AETRA awards, 2006 ACI-ASQ awards and 2007 ACI-ASQ awards while the
            Low Cost Carrier Terminal (LCCT-KLIA) was named CAPA Low Cost Airport
            of the Year at the CAPA Aviation Awards for Excellence 2006.
            Malaysia Airport has also received numerous awards that acknowledged
            it's commitment in service, community engagement, corporate
            responsibility and organisational excellence.{"\n\n"}
            KLIA has taken a big stide in the realisation of becoming a global
            integrate hub.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default About;
