import React from "react";
import {
  Share, TouchableOpacity, View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { KeyInfoDetailsstyles } from "./styles";

const KeyInfoDetails = (props) => {
  const result = useSelector((state) => state.KeyInfoReducer.QA);
  const regex = /<\/?[^>]+(>|$)/gi;

  const _formatMessage=()=> {
    const text = result.question+'\n\n'+result.answer
    const cleanText = text.replace(/<\/?[^>]+(>|$)/gi, "")
    return cleanText
  }

  function onSharePress () {
    let shareOptions={
      title: 'Title',
      message:_formatMessage(),
    }
     Share.share(shareOptions);
  }
  return (
    <KeyInfoDetailsstyles.ViewArea>
      <LinearGradient
        colors={["#E0EDF8", "#EFF8F8"]}
        style={{
          height: "75%",
          width: "90%",
          margin: 20,
          padding: 40,
          borderRadius: 20,
          marginTop: "20%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent:'flex-end'
          }}
        >
          <TouchableOpacity onPress={() => onSharePress()}>
            <View>
            <KeyInfoDetailsstyles.Icon
              source={require("../../assets/Images/ShareIcon.png")}
            />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>props.navigation.goBack()}>
            <View>
            <KeyInfoDetailsstyles.Icon
              source={require("../../assets/Images/Close.png")}
            />
            </View>
          </TouchableOpacity>
        </View>
        <KeyInfoDetailsstyles.mainText>Question</KeyInfoDetailsstyles.mainText>

        <KeyInfoDetailsstyles.subText>
          {result.question}
        </KeyInfoDetailsstyles.subText>
        <KeyInfoDetailsstyles.mainText>Answer</KeyInfoDetailsstyles.mainText>

        <KeyInfoDetailsstyles.subText numberOfLines={3}>
          {result.answer.replace(regex, "")}
        </KeyInfoDetailsstyles.subText>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <KeyInfoDetailsstyles.button>
            <KeyInfoDetailsstyles.ButtonText>
              Ask Another Question
            </KeyInfoDetailsstyles.ButtonText>
          </KeyInfoDetailsstyles.button>
        </TouchableOpacity>
      </LinearGradient>
    </KeyInfoDetailsstyles.ViewArea>
  );
};

export default KeyInfoDetails;
