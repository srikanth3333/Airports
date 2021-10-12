import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { white } from "../../assets/colors";
import { OpenSansBold } from "../../assets/font";
import styles from "../../assets/styles";
import { GeneralStyles } from './styles'
import {
  BackButton,
  BackTitleHeader,
  GeneralItem,
  MarginTop,
  SocialLinks,
} from "../../components/Common";
import MAGeneralListItem from "../../components/MAGeneralListItem";

const size = (value) => RFValue(value);

class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: "About",
          icon: require("../../assets/Images/AboutIcon.png"),
          navigateTo: "About",
        },
        {
          title: "  Contact Us",
          icon: require("../../assets/Images/phone-menu.png"),
          navigateTo: "ContactUs",
        },

      ],
      list2: [
        {
          title: "Terms of Use",
          icon: require("../../assets/Images/TermsIcon.png"),
          navigateTo: "Terms",
        },
        {
          title: "Privacy Policy",
          icon: require("../../assets/Images/Privacy.png"),
          navigateTo: "PrivacyPolicy",
        },
      ],
      socialLinks: [
        {
          icon: require("../../assets/Images/facebook-rect.png"),
          link: "https://m.facebook.com/MalaysiaAirportsOfficial/",
        },
        {
          icon: require("../../assets/Images/twitter-bird.png"),
          link: "https://mobile.twitter.com/MY_Airports",
        },
        {
          icon: require("../../assets/Images/youtube.png"),
          link: "https://youtube.com/c/malaysiaairportsMAHB",
        },
        {
          icon: require("../../assets/Images/instagram.png"),
          link: "https://www.instagram.com/malaysiaairports/",
        },
        {
          icon: require("../../assets/Images/weibo.png"),
          link: "https://weibo.com/malaysiaairports",
        },
      ],
    };
  }
  render() {
    const { list, list2, socialLinks } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <MarginTop top={size(20)} />
        <BackTitleHeader navigation={this.props.navigation} title={"GENERAL"} />
        {/* <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBox}
          colors={["rgb(48,22,51)", "rgb(216,11,99)"]}
        > */}
          <Pressable
            style={styles.backPressPos}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              source={require("../../assets/Images/BackArrow.png")}
              style={styles.backArrowGenral}
            />
          </Pressable>
          <Text style={styles.generalTxt}>General</Text>
        {/* </LinearGradient> */}
        <MarginTop top={size(20)} />
        <GeneralStyles.FlatlistContainer>

          <FlatList
            data={list}
            style={{}}
            renderItem={({ item, index }) => (
              <GeneralStyles.IconViewContainerI >
                <MAGeneralListItem item={item} onPressHandler={() => this.props.navigation.navigate(item.navigateTo)} />
              </GeneralStyles.IconViewContainerI>
            )}
            numColumns={2}
          />

          <FlatList
            data={list2}
            style={{}}
            renderItem={({ item, index }) => (
              <GeneralStyles.IconViewContainerII >
                <MAGeneralListItem item={item} onPressHandler={() => this.props.navigation.navigate(item.navigateTo)} />
              </GeneralStyles.IconViewContainerII>
            )}
            numColumns={2}
          />

        </GeneralStyles.FlatlistContainer>
        <View
          style={[styles.flexRow, { justifyContent: "center", bottom: "-30%" }]}
        >
          {socialLinks.map((item) => {
            return (
              <Pressable onPress={() => Linking.openURL(item.link)}>
                <Image source={item.icon} style={styles.socialIcon} />
              </Pressable>
            );
          })}
        </View>

      </SafeAreaView>
    );
  }
}

export default General;
