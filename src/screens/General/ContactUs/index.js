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
  ContactItem,
  GeneralItem,
  MarginTop,
  SocialLinks,
  Title,
  GeneralTitleHeader
} from "../../../components/Common";

const size = (value) => RFValue(value);

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [
        // {
        //   icon: require("../../../assets/Images/PhoneIcon.png"),
        //   type: "Tel",
        //   text: "+6038777 7000 - HQ",
        // },
        // {
        //   icon: require("../../../assets/Images/TermsIcon.png"),
        //   type: "Fax",
        //   text: "+6038777 7778 - HQ",
        // },
        {
          icon: require("../../../assets/Images/email.png"),
          type: "Email",
          text: "CARE@malaysiaairports.com.my",
        },
        {
          icon: require("../../../assets/Images/phone-menu.png"),
          type: "KUL Call Centre (24 hours)",
          text: "+603 8777 8888",
        },
        // {
        //   icon: require("../../../assets/Images/PhoneIcon.png"),
        //   type: "KLIA2",
        //   text: "+60 38778 5500 Ext 01/02/03",
        // },
        // {
        //   icon: require("../../../assets/Images/AboutIcon.png"),
        //   type: "Address",
        //   text: "Malaysia Airports Holding Berhad. Malaysia Airport Corporate Office, Persiaran Korporat KLIA 64000 KLIA, Sepang, Selangor, MALAYSIA",
        // },
      ],
      socialLinks: [
        {
          icon: require("../../../assets/Images/facebook-rect.png"),
          link: "https://m.facebook.com/MalaysiaAirportsOfficial/",
        },
        {
          icon: require("../../../assets/Images/twitter-bird.png"),
          link: "https://mobile.twitter.com/MY_Airports",
        },
        {
          icon: require("../../../assets/Images/youtube.png"),
          link: "https://youtube.com/c/malaysiaairportsMAHB",
        },
        {
          icon: require("../../../assets/Images/instagram.png"),
          link: "https://www.instagram.com/malaysiaairports/",
        },
        {
          icon: require("../../../assets/Images/weibo.png"),
          link: "https://weibo.com/malaysiaairports",
        },
      ],
    };
  }
  render() {
    const { list, contactList, socialLinks } = this.state;
    return (
      <SafeAreaView style={[styles.container, ]}>
        <GeneralTitleHeader navigation={this.props.navigation} title={"GENERAL"} />
        <MarginTop top={size(-45)} />
        <Title
            lightTitle={"CONTACT"}
            bolTitle={"  US"}
            //icon={require("../../../assets/Images/PhoneIcon.png")}
          />
        <ScrollView
            style={{
              padding: size(5),
              marginLeft: size(10),
            }}
        >
          {/* <Title
            lightTitle={"Contact"}
            bolTitle={"Us"}
            icon={require("../../../assets/Images/PhoneIcon.png")}
          /> */}
          <MarginTop top={size(100)} />
          <FlatList
            data={contactList}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[styles.contactItemsContainer,{ borderBottomWidth: index == contactList.length - 1 ? 1 : 0,}]}
                >
                  <View
                    style={styles.iconTitle}
                  >
                    <Image
                      style={styles.contactIcon}
                      source={item.icon}
                    />

                    <Text
                      style={styles.contactTitle}
                    >
                      {item.type}
                    </Text>
                  </View>
                  <View
                    style={{
                      //width: "65%",
                    }}
                  >
                    <Text
                      style={styles.contactTxt}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <MarginTop top={size(270)}/>
                  <SocialLinks socialLinks={socialLinks}/>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ContactUs;
