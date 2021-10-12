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
  Platform,
  ActivityIndicator,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { GetTravellingData } from "../SpecialAssistance/action";
import { black, pink } from "../../assets/colors";
import { MontserratBold, MontserratRegular } from "../../assets/font";
import styles from "../../assets/styles";
import { BackButton, LightText, MarginTop } from "../../components/Common";
import { height } from "../../components/Login/constant";
import {
  TravelDropDown,
  TravelingChildItems,
} from "../../components/SpecialAssistance";
import { styles as travelStyle } from "./style";
import HTMLView from "react-native-htmlview";
import { BackgroundImage } from "../../components/Login";
import { isEmpty } from "../../utils/globalMethods";

const size = (value) => RFValue(value);

class TravelWithChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDataTerminal: "klia1",
      data: [
        {
          icon: require("../../assets/Images/butterflyalt.png"),
          title: "Baby Care Room",
          isExpandable: true,
          expand: false,
          img: {
            uri: "https://www.niehs.nih.gov/research/supported/translational/peph/podcasts/2016/mar29_childcare/img842390.jpg",
          },
          text: "Our baby care room are perfactly equipped to help you take care of your precious little tots. The rooms are equipped with baby bed, a chair and wash-basin. The rooms are located at Main Terminal Building, Contact Pier Building and in the setellite building.",
        },
        {
          icon: require("../../assets/Images/game-controller-outline.png"),
          title: "Children Play Area",
          isExpandable: false,
          expand: false,
          img: "",
          text: "The children play area is located in front of KFC, Departure Hall, Level 5",
        },
      ],
      dropDown: [
        { label: "KLIA", value: "klia1" },
        { label: "klia2", value: "klia2" },
      ],
      open: false,
      klia1: [],
      klia2: [],
      selectedTerminal: 'klia1',
      title: ''
    };
  }
  componentDidMount() {
    const { SpecialNeed, route } = this.props;
    console.log(this.props.route.params.klia1, "check first");
    if (!isEmpty(SpecialNeed) && SpecialNeed.dataSA && route.params.screen) {
      let klia1 = SpecialNeed.dataSA["klia1"].filter(itm => itm.group1 === route.params.screen);
      let klia2 = SpecialNeed.dataSA["klia2"].filter(itm => itm.group1 === route.params.screen);
      let title = this.props.route.params.title.trim();
      this.setState({
        klia1,
        klia2,
        title
      })
    }
    // this.props.GetTravellingData();
  }
  setValue = (callback) => {
    this.setState(state => ({
      selectedTerminal: callback(this.state.selectedTerminal)
    }));
    this.setState({
      customDataTerminal: this.state.selectedTerminal
    })
    var kliaSelectData = this.props.SpecialNeed.dataSA[this.state.customDataTerminal]
    var result = kliaSelectData.map((item,i) => {
      return item.group1 === this.props.route.params.screen ? item : null
    })
  }
  
  onExpand = (index) => {
    const { klia1, klia2, selectedTerminal, } = this.state;

    if (selectedTerminal == "klia1") {
      var values = klia1;
      values[index].isExpandable = !values[index].isExpandable;
      this.setState({
        klia1: values,
      });
    } else {
      var values = klia2;
      values[index].isExpandable = !values[index].isExpandable;
      this.setState({
        klia2: values,
      });
    }
  }
  render() {
    const { navigation } = this.props;
    const { data, dropDown, open, klia1, klia2, loading, selectedTerminal, title } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <BackgroundImage
          img={require("../../assets/Images/SA_BG.png")}
        />
        <View style={travelStyle.container}>
          <View
            style={[
              travelStyle.rowAlign,
              Platform.OS == "ios" ? { zIndex: 1 } : {},
            ]}
          >
            <BackButton
              onPress={() => navigation.goBack()}
              extraStyle={{ tintColor: "rgb(27,41,89)" }}
            />
            <View
              style={{
                marginLeft: size(13),
                //marginTop:size(15),
                width: '95%',
              }}
            >
              {/* <Text style={travelStyle.lightTitle}>Travelling</Text> */}

              {/*<Text style={travelStyle.boldTitle}>{title}</Text> */}

              {title.split(" ").length>1 && <Text style={travelStyle.lightTitle}>{title.split(" ")[0]}</Text>}
                <Text style={travelStyle.boldTitle}>{title.substring( title.indexOf(" ") + 1, title.length )}</Text>             
                <View style={{
                  width:'35%',
                }}/>
                
            </View>
            <TravelDropDown
              list={dropDown}
              placeholder="KLIA"
              setValue={this.setValue}
              value={selectedTerminal}
            />
          </View>
          <MarginTop top={50} />
          <FlatList
            data={selectedTerminal == "klia1" ? klia1 : klia2}
            contentContainerStyle={{
              paddingBottom: size(100),
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TravelingChildItems
                onExpand={() => this.onExpand(index)}
                item={item}
                index={index}
                length={klia1.length}
              />
            )}
          />
        </View>
        {loading && <ActivityIndicator
          style={{
            position: "absolute",
            top: '60%', zIndex: 1,
            alignSelf: "center",
            marginLeft: size(20)
          }}
          color="rgb(35,46,105)"
          size="large"
        />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SpecialNeed: state.SpecialNeed,
  };
};

export default connect(mapStateToProps)(TravelWithChild);