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
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";

import { Promotionstyles } from "./styles";
import { BackgroundImage } from "../../components/Login/index";
import SwitchToggle from "../../components/SwitchToggle";
import { SearchBox } from "../../components/Home";
import Carousel from "react-native-snap-carousel";
import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { BackButton, LightText, MarginTop } from "../../components/Common";
import { getPromotion,terminalDispatch } from "./action";
import { getPromotionPageData } from "./selector";
import { isEmpty, get, isArray, filter, set } from "lodash";
import { red } from "../../assets/colors";
import { getAssestImages } from "../../services/api-end-points";
import { font } from "../../assets/font";
import DropDown from "../../components/DropDown/index";

const size = (value) => RFValue(value);
const { height, width } = Dimensions.get("window");

const HTML_REGEX = /(<([^>]+)>)/ig

class Promotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownList : [
        { label: "KLIA", value: "KLIA" },
        { label: "klia2", value: "klia2" },
      ],
      images: [
        {
          img: require("../../assets/Images/ProBG.png"),
          title: "ERMAN@OurShop",
          subtitle: "Eraman can now deliver to your home with ourShop",
        },
        {
          img: require("../../assets/Images/ProBG.png"),
          title: "ERMAN@OurShop",
          subtitle: "Eraman can now deliver to your home with ourShop",
        },
      ],
      terminalState: "KLIA",
      searchText: "",
    };
  }

  componentDidMount() {
    this.props.getPromotion();
  }

  filterDataWithSearch(data, term, result = []) {
    if (term.length === 0) {
      return data;
    }
    data.forEach((section) => {
      const filteredPOIs = section.pois.filter((poi) =>
        poi.name.toUpperCase().includes(term.toUpperCase())
      );
      const promotions = get(section, "contentBlock.promotions", []) || [];
      const filteredPromotions = promotions.filter((promo) =>
        promo.name.toUpperCase().includes(term.toUpperCase())
      );
      if (!isEmpty(filteredPOIs) || !isEmpty(filteredPromotions)) {
        result.push({
          ...section,
          pois: filteredPOIs,
          contentBlock: {
            promotions: filteredPromotions,
          },
        });
      } else {
        const isNameMatched = section.categoryLabel
          .toUpperCase()
          .includes(term.toUpperCase());
        if (isNameMatched) {
          result.push(section);
        }
      }
    });
    return result;
  }



  _renderSections = (result = []) => {
    const { promotionData } = this.props;
    const { searchText } = this.state;
    const sections = get(promotionData, "subCategories", []);
    console.warn("sections==>>" + sections);
    const filteredSections = this.filterDataWithSearch(sections, searchText);
    filteredSections.forEach((section = {}, index) => {
      const { category = "", categoryLabel = "" } = section;
      const pois = get(section, "pois", []);
      const promotions = get(section, "contentBlock.promotions", []);
      // if (!isEmpty(pois)) {
      //     result.push(
      //          <View style={{flex:1}} key={category + index}>
      //             <Caption style={style.title}>{categoryLabel}</Caption>
      //             <View style={{ height: MenuCardStyle.container.height, marginVertical: 20 }}>
      //                 <MenuCarousel
      //                     renderItem={this._renderSectionPOIs}
      //                     data={pois} />
      //             </View>
      //         </View>
      //     )
      // } else
      if (!isEmpty(promotions)) {
        result.push(
          <View style={{flex:1,paddingVertical:20,borderColor:'#FDF2F7'}}>
            <Promotionstyles.CategoryLabel>{categoryLabel}</Promotionstyles.CategoryLabel>
          <Carousel
            layout={"default"}
            data={promotions}
            renderItem={this.renderImages}
            sliderWidth={width}
            itemWidth={width - width * 0.3}
            itemHeight={width}
            inactiveSlideScale={0.9}
            keyExtractor={(index) => index}
            scrollEventThrottle={16}
            inactiveSlideOpacity={1}
            inactiveSlideShift={size(-22)}
            hasParallaxImages={true}
            activeSlideAlignment="start"
          />
          </View>
        );
      }
    });
    return <ScrollView>{result}</ScrollView>;
  };

  onChangeText = (input) => {
    if (input.nativeEvent.text.length > 0) {
    this.setState({ searchText: input.nativeEvent.text})
    }else{
      this.setState({searchText:''})
    }
}

  renderImages = ({ item }) => {
    const formattedDescription = item.shortDescription.replace(HTML_REGEX, '')
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("PromotionDetails",{details:item})}
      >
        <View style={{ flex: 1}}>
          <View
            style={{
              backgroundColor: '#F4DEEB',
              width: width/1.5,
              borderRadius: 25,
              overflow: "hidden", //enable border,
              height: height/2.2,
              paddingTop: 1,
              shadowOpacity:100,
              shadowRadius: 2,
              elevation:2
            }}
          >
            <View
              style={{
                paddingHorizontal: 5, // 20pt
                paddingTop: 5,
                paddingBottom: 1,
                alignContent:'center',
                paddingHorizontal:20
              }}
            >
              <Text
                style={{ color: "#000", paddingBottom: 10,fontSize:16,fontWeight:'bold',fontFamily:"CenturyGothic-Regular" }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text
                style={{ color: "#000", paddingBottom: 2,fontSize:13 ,fontFamily:"CenturyGothic-Regular"}}
                numberOfLines={3}
                allowFontScaling={false}
              >
                {formattedDescription}
              </Text>
            </View>
            <Image
              source={{
                uri: `${getAssestImages()}/${item.squareImage.replace(
                  /\\/g,
                  "/"
                )}`,
              }}
              style={{
                height:'82%',
                width:'100%',
                resizeMode:'center',
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    console.log(this.props.promotionData);
    const { images } = this.state;
    return (
      <View style={{ flex: 1,backgroundColor:'#FDF2F7'}}>
        <BackgroundImage
          img={require("../../assets/Images/Promo_BG.png")}
        />
        <Promotionstyles.HeadeView>
          <Header
            leftTitle={"Promotions"}
            promotion={true}
            navigation={this.props.navigation}
          />
          </Promotionstyles.HeadeView>
        <Promotionstyles.container>
          <Promotionstyles.Alignment>
            <View style={{ width: "68%" ,}}>
              <SearchBox  onChangeHandler={(event) => this.onChangeText(event)} onPlaceholder={"Find anything"}/>
            </View>
           
            <View style={{ width: "27%", }}>
            <DropDown
                  list={this.state.dropDownList}
                  borderColor={"#B31F84"}
                  borderRadius={42}
                  borderWidth={1}
                  height={37}
                  onSelectValue={(value) =>
                    this.setState({ terminalState: value, dropDownOpen: false },()=>{
                      this.props.terminalDispatch(this.state.terminalState)
                    })
                  }
                  selectedValue={this.state.terminalState}
                  placeholder={"KLIA"}
                  dropDownOpen={() =>
                    this.setState({
                      dropDownOpen: true,
                    })
                  }
                  dropDownClose={this.state.dropDownOpen}
                />
            </View>

            
          </Promotionstyles.Alignment>
        
          <View
            style={{
             // flex: 1,
              marginBottom:'30%',
              alignSelf:'center',
              backgroundColor:'#FDF2F7',
              marginLeft:20
            }}
          >
            {this._renderSections()}
          </View>
          </Promotionstyles.container>

         
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    promotionData: getPromotionPageData(state),
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  getPromotion: getPromotion,
  terminalDispatch:terminalDispatch
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);
