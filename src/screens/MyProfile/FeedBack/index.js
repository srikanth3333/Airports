import React from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { pink } from "../../../assets/colors";
import styles from "../../../assets/styles";
import {
  BackButton,
  ButtonWithBackground,
  LightText,
  MarginTop,
} from "../../../components/Common";
import { submitFeedBack } from "../action";
import Loader from "../../../components/Loader";
import DropDown from "../../../components/DropDown";
import { getLoggenInUserData } from "../../../store/configureStore";
import { CenturyGothicRegular } from "../../../assets/font";

const size = (value) => RFValue(value);

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      terminals: [
        { label: "KLIA (KUL)", value: "KLIA (KUL)" },
        { label: "KLIA2 (KUL)", value: "KLIA2 (KUL)" },
      ],
      category: [
        { label: "My Flight", value: "My Flight" },
        { label: "Shopping", value: "Shopping" },
        { label: "Guide Me", value: "Guide Me" },
        { label: "Transport", value: "Transport" },
        { label: "Rewards", value: "Rewards" },
        { label: "Others", value: "Others" },
      ],
    };
  }

  submitFeedBack = () => {
    if (
      this.state.terminal &&
      this.state.categoryvalue &&
      this.state.feedback
    ) {
      let data = {
        name: `${this.props.userdata.firstName} ${this.props.userdata.lastName}`,
        emailAddress: `${this.props.userdata.emailAddress}`,
        terminal: this.state.terminal,
        category: this.state.categoryvalue,
        experience: this.state.feedback,
      };
      this.props.submitFeedBack({
        data,
        onSuccess: (data) => {
          this.props.navigation.navigate('FeedBackDone')
        },
        onError: (err) => Alert.alert(err),
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { navigation } = this.props;
    const { selectedTab, data, terminals, category } = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <View
          style={
            ([styles.marginContainer], { marginHorizontal: 16, marginTop: 26 })
          }
        >
          <BackButton onPress={() => navigation.goBack()}/>
          <MarginTop top={size(-27)} />
          <View style={styles.alignStart}>
            <Text style={[styles.loginTitle, { fontSize: size(20), marginLeft: 10 }]}>
              <LightText text={"SHARE YOUR "} />
              FEEDBACK
            </Text>
          </View>
          <KeyboardAwareScrollView
            contentContainerstyle={[styles.flex]}
            enableOnAndroid
          >
            <Loader loading={this.props.loading} />
            <MarginTop top={size(70)} />
            <View style={[styles.flex, { justifyContent: "space-between" }]}>
              <View>
                <DropDown
                 borderWidth={1}
                 height={45}
                  list={terminals}
                  borderColor={"#F1DDE9"}
                  onSelectValue={(value) => this.setState({ terminal: value,terminalDropDown:false })}
                  selectedValue={this.state.terminal}
                  placeholder={"Select a Airport"}
                  dropDownOpen={() =>
                    this.setState({
                      terminalDropDown: true,
                      categoryDropDown: false,
                    })
                  }
                  dropDownClose={this.state.terminalDropDown}
                />
                {this.state.error && !this.state.terminal? (
                  <Text style={{ color: "red", fontFamily: CenturyGothicRegular }}>Please select terminal</Text>
                ) : null}
                <MarginTop top={size(30)} />
                <DropDown
                  borderWidth={1}
                  height={45}
                  list={category}
                  borderColor={"#F1DDE9"}
                  onSelectValue={(value) =>
                    this.setState({ categoryvalue: value,categoryDropDown:false })
                  }
                  selectedValue={this.state.categoryvalue}
                  placeholder={"Select a feedback category"}
                  dropDownOpen={() =>
                    this.setState({
                      terminalDropDown: false,
                      categoryDropDown: true,
                    })
                  }
                  dropDownClose={this.state.categoryDropDown}
                />
                {this.state.error && !this.state.categoryvalue ? (
                  <Text style={{ color: "red", fontFamily: CenturyGothicRegular }}>Please select category</Text>
                ) : null}
                <MarginTop top={size(30)} />
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={styles.textArea}
                  blurOnSubmit={false}
                  onChangeText={(value) => this.setState({ feedback: value })}
                  placeholder={"Share your Experience"}
                />
                {this.state.error && !this.state.feedback ? (
                  <Text style={{ color: "red", fontFamily: CenturyGothicRegular }}>Please Enter feedback</Text>
                ) : null}
              </View>
              <ButtonWithBackground
                onPress={this.submitFeedBack}
                text={"SUBMIT"}
                extraStyle={{ marginBottom: size(10) }}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    userdata: state.SplashReducer.userProfile,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  submitFeedBack: submitFeedBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
