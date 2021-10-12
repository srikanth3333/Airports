import { grey } from "chalk";
import React, { PureComponent } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ImageBackground
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { black, white } from "../../assets/colors";
import { OpenSansRegular } from "../../assets/font";
import { size } from "../../assets/size";
import styles from "../../assets/styles";
import { getLoginStatus } from "../../storage/reduxStore";
import { AuthContext, windowHeight, windowWidth } from "../../utils/constants";

const { height, width } = Dimensions.get("window");
class Menu extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      navigationData: [],
      isShowModal: false,
    };
    this.isReduceBottomMargin = true
  }

  componentDidMount() {

  }

  setNavigationData = () => {
    let navData = {}
  }

  renderMenuItems = () => {
    const { show, setShow } = this.context;
    const menuDataItems = [
      {
        id: 1,
        title: "FLIGHTS",
        icon:require('../../assets/Images/Icons/flights-menu.png'),
        navigateTo: "FlightInfo",
      },
      {
        id: 2,
        title: "PROMOTIONS",
        navigateTo: "Promotion",
        icon:require('../../assets/Images/Icons/promotions-menu.png'),
      },
      {
        id: 3,
        title: "SHOPPING",
        icon:require('../../assets/Images/Icons/shopping-bag-menu.png'),
        navigateTo: "",
      },
      {
        id: 4,
        title: "GENERAL",
        navigateTo: "General",
        icon:require('../../assets/Images/Icons/General-menu.png'),
      },
      {
        id: 5,
        title: "CONTACT US",
        navigateTo: "ContactUs",
        icon:require('../../assets/Images/Icons/phone-menu.png'),
      },

    ];

    let myProfile = {
      id: 6,
      title: "MY PROFILE",
      navigateTo: "MyProfile",
      icon:require('../../assets/Images/Icons/user-avatar-menu.png'),
    };
    if(getLoginStatus()){
      menuDataItems.push(myProfile)
    }

    return (
      <>
      
        <FlatList
          data={menuDataItems}
          style={{
            marginTop: size(65),
          }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                style={[
                  styles.listItemContainer,
                  {
                    borderBottomWidth:
                    menuDataItems.length - 1 == index ? 1 : 0,
                  },
                ]}
                onPress={() => {
                  const { setLogin } = this.context;
                  this.props.navigation.navigate(item.navigateTo);
                  setShow(!show);
                }}
              >
                  <Image source={item.icon} style={styles.listItemImage} />
                  <Text style={styles.listItemText}>{item.title}</Text> 
              </Pressable>
            );
          }}
        />
        
      </>
    )
  }

  render() {
    const { show, setShow } = this.context;
    let isReduceBottom = getLoginStatus() ? false : true
    var key = 0;
    return (
      <SafeAreaView >
        
        <Modal
          transparent
          presentationStyle={'overFullScreen'}
          visible={show}
          onRequestClose={() => {
            setShow(!show);
          }}
        >
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={styles.menuContainer}
          >
            <View style={[styles.menuWhiteContainer, {height: isReduceBottom ? "75%" : "85%", marginTop: isReduceBottom ? '22%' : 0}]}>
              <Image
                source={require("../../assets/Images/HomeScreenLogo.png")}
                style={{
                  height: "13%",
                  width: "35%",
                  resizeMode: "stretch",
                  alignSelf: "center",
                  justifyContent: "center",
                  marginTop: 25,
                }}
              />
              {this.renderMenuItems()}
            </View>
          </TouchableOpacity>
        </Modal>
        
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({});
export default Menu;
 