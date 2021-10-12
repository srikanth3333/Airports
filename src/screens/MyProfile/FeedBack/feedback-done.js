import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { maroon, maroonlight, white, black } from "../../../assets/colors";
import { MontserratBold, MontserratRegular } from "../../../assets/Fonts";
//import style from "style-components";
import styles from "../../../assets/styles";
import { ButtonWithBackground } from "../../../components/Common";

const size = (value) => RFValue(value);

class FeedBackDone extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation}=this.props
    return (
      <SafeAreaView style={[styles.container]}>
        <LinearGradient style={[styles.flex]} colors={[maroon, maroonlight]}>
          <View style={[styles.marginContainer, { justifyContent: "center" }]}>
            <Image
              source={require("../../../assets/Images/thumbs-up.png")}
              style={{
                width: size(50),
                height: size(50),
                tintColor: white,
              }}
            />
            <Text style={styles.feedBackSubmit}>Feedback Submitted</Text>
            <Text style={styles.feedbackThank}>Thank You</Text>
          </View>
          <View style={[styles.smallFlex, {marginBottom: 50}]}>
            <ButtonWithBackground
              onPress={() => navigation.navigate("Home")}
              extraStyle={{}}
              text={"DONE"}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

export default FeedBackDone;
