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
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { pink } from "../../assets/colors";
import { MontserratBold, MontserratRegular } from "../../assets/font";
import styles from "../../assets/styles";
import { BackButton, LightText, MarginTop } from "../../components/Common";
import { BackgroundImage } from "../../components/Login";
import { height } from "../../components/Login/constant";
import { AssistItems } from "../../components/SpecialAssistance";
import { styles as specialStyle } from "./style";
const size = (value) => RFValue(value);
import { connect } from "react-redux";
import { GetTravellingData } from "./action";
import { isEmpty } from "../../utils/globalMethods";
class SpecialAssistance extends React.Component {
  constructor(props) {
    super(props);
    const saTWC = "SATravellingWithChildren";
    const saWC = "SAWheelChair";
    const saOther = "SAOtherAssistance";
    this.state = {
      data: [
        {
          icon: require("../../assets/Images/child.png"),
          text: "Travelling with Children",
          navigateTo: "TravelWithChild",
          screen: saTWC
        },
        {
          icon: require("../../assets/Images/wheelchair.png"),
          text: "Assistance for person with reduced mobility and hidden disabilities",
          navigateTo: "TravelWithChild",
          screen: saWC
        },
        {
          id: 3,
          icon: require("../../assets/Images/AboutIcon.png"),
          text: "Others",
          navigateTo: "TravelWithChild",
          screen: saOther
        },
      ],
    };
  }
  componentDidMount(){
    this.props.GetTravellingData()
  }

  componentDidUpdate(prevProps, nextState){
    const {SpecialNeed} = this.props;
    let travelWithChildKli1;
    let travelWithChildKli2;
    let saWheelChairKli1;
    let saWheelChairKli2;
    let saOtherKli1;
    let saOtherKli2;
    const saTWC = "SATravellingWithChildren";
    const saWC = "SAWheelChair";
    const saOther = "SAOtherAssistance";
    if(SpecialNeed.dataSA !== prevProps.SpecialNeed.dataSA){
      console.log('SADATATATATTA', SpecialNeed.dataSA);
      if(!isEmpty(SpecialNeed.dataSA)){
        let klia1 = SpecialNeed.dataSA.klia1;
        let klia2 = SpecialNeed.dataSA.klia2;
        travelWithChildKli1 = klia1.length > 0 && klia1.filter(itm => itm.group1 === saTWC);
        travelWithChildKli2 = klia2.length > 0 && klia2.filter(itm => itm.group1 === saTWC);
        saWheelChairKli1 = klia1.length > 0 && klia1.filter(itm => itm.group1 === saWC);
        saWheelChairKli2 = klia2.length > 0 && klia2.filter(itm => itm.group1 === saWC);
        saOtherKli1 = klia1.length > 0 && klia1.filter(itm => itm.group1 === saOther);
        saOtherKli2 = klia2.length > 0 && klia2.filter(itm => itm.group1 === saOther);
      }
    }
  }
  somethingWentWrong() {
    alert("Something went wrong!");
    this.setState({ loading: false });
  }
  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <BackgroundImage
          img={require("../../assets/Images/SAbackground.png")}
        />
        <View style={specialStyle.container}>
          <View style={specialStyle.rowAlign}>
            <BackButton
              onPress={() => navigation.goBack()}
              extraStyle={{ tintColor: "rgb(27,41,89)" }}
            />
            <Text style={specialStyle.boldTitle}>Special</Text>
            <Text style={specialStyle.lightTitle}>Assistance</Text>
          </View>
          <MarginTop top={50} />
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <AssistItems
                length={data.length}
                navigation={navigation}
                item={item}
                index={index}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    SpecialNeed: state.SpecialNeed,
  };
};

export default connect(mapStateToProps, { GetTravellingData })(SpecialAssistance);