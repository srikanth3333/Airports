import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import {
//   Container,
//   ViewArea,
//   BorderPadding,
//   SettingsIcon,
//   HeaderText,
//   BackArrow,
//   Icon,
//   Subcontainer,
//   LanguageStyles,
// } from "./styles";
import { LanguageStyles } from "./styles";
import { AuthHeader } from "../../components/Common/index";
import I18n from "../../localization/language";

class Languages extends React.Component {
  constructor(props) {
    super(props);
  }

  changeLanguage = (language) => {
    I18n.locale = language;
    this.setState({
      check: true,
    });
  };

  render() {
    return (
      <LanguageStyles.ViewArea>
        <LanguageStyles.Container>
          <View style={{ flexDirection: "row", marginTop: 35,marginLeft:10 }}>
            <LanguageStyles.HeaderContainer>
            <AuthHeader navigation={this.props.navigation} />
            </LanguageStyles.HeaderContainer>
            <View style={{ marginLeft:-10}}>
             {/*  <LanguageStyles.HeaderText style={{ color: "gray" }}>SETTINGS</LanguageStyles.HeaderText> */}
              <LanguageStyles.HeaderText>LANGUAGES</LanguageStyles.HeaderText>
            </View>
          </View>

          <View style={{ marginTop: 80 }} />
          <LanguageStyles.ContainerTouch onPress={()=>this.changeLanguage("en")}>
            <LanguageStyles.Subcontainers>
              <LanguageStyles.Icon
                style={{ marginLeft: -5 }}
                source={require("../../assets/Images/ChangeLanguage01.png")}
              />
              <LanguageStyles.SettingsIcons>English</LanguageStyles.SettingsIcons>
            </LanguageStyles.Subcontainers>
          </LanguageStyles.ContainerTouch>

          <LanguageStyles.BorderPadding style={{ marginTop: 30 }} />
          <LanguageStyles.ContainerTouch onPress={()=>this.changeLanguage("bm")}>
            <LanguageStyles.Subcontainer>
              <View style={{marginLeft: 65}}>
              <LanguageStyles.Icon
                source={require("../../assets/Images/ChangeLanguage01.png")}
              />
              </View>
              <View  >
              <LanguageStyles.SettingsIcon>Bahasa Malaysia</LanguageStyles.SettingsIcon>
              </View>
            </LanguageStyles.Subcontainer>
          </LanguageStyles.ContainerTouch>

          <LanguageStyles.BorderPadding style={{ marginTop: 30 }} />
          <LanguageStyles.ContainerTouch onPress={()=>this.changeLanguage("cn")}>
            <LanguageStyles.Subcontainer>
            <View style={{marginLeft: -25}}>
              <LanguageStyles.Icon
                source={require("../../assets/Images/ChangeLanguage02.png")}
              />
              </View>
              <LanguageStyles.SettingsIcon>中国</LanguageStyles.SettingsIcon>
            </LanguageStyles.Subcontainer>
          </LanguageStyles.ContainerTouch>
          <LanguageStyles.BorderPadding style={{ marginTop: 30 }} />
        </LanguageStyles.Container>
      </LanguageStyles.ViewArea>
    );
  }
}

export default Languages;
