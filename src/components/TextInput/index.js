import React, { useEffect, useState } from "react";
import {
  TextInput,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { commanStyle } from "../Common/style";
import { RFValue } from "react-native-responsive-fontsize";
import { MATextinputStyle } from "./styles";
import { CenturyGothicRegular } from "../../assets/font";

const size = (value) => RFValue(value);

/**
 * REGEX
 */
export const EMOJI_REGEX = /^([a-zA-Z0-9@_+ '.-]+)$/;
export const EMOJI_REGEX_USER = /^([a-zA-Z0-9@_+ '.]+)$/;
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = new RegExp(
  "(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})"
);
export const FULL_NAME =
  /^([\u0621-\u064Aa-zA-Z'-.]+ [\u0621-\u064Aa-zA-Z'-.]+)$/;
export const LONG_FULL_NAME =
  /^([\u0621-\u064Aa-zA-Z'-.]+ [\u0621-\u064Aa-zA-Z'-.]+ [\u0621-\u064Aa-zA-Z'-.]+)$/;

export const MOBILE_NO = /^[0-9]+$/;

export const FIRST_NAME = /^[a-zA-Z ]{2,30}$/;

export const PASSPORT = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;

const TextBoxWithBackground = (props) => {
  const [errorView, setErrorView] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSecure, setSecure] = useState(props.isSecure);
  const {
    placeholder,
    onChangeText,
    extraStyle,
    value,
    isError,
    label,
    setReference,
    referenceName,
    returnKeyType,
    keyboardType,
    onSubmitEditing,
    editable,
  } = props;

  const validation = (label, value, isError) => {
    switch (label) {
      case "email":
        if (EMAIL_REGEX.test(value) && EMOJI_REGEX.test(value)) {
          isError(false);
          setErrorView(false);
        } else {
          setErrorView(true);
          setErrorMessage("Please enter Valid Email");
          isError(true);
        }
        break;
      case "first name":
        if (FIRST_NAME.test(value)) {
          isError(false);
          setErrorView(false);
        } else {
          setErrorView(true);
          setErrorMessage("Please enter first name");
          isError(true);
        }
        break;
      case "last name":
        if (FIRST_NAME.test(value)) {
          isError(false);
          setErrorView(false);
        } else {
          setErrorView(true);
          setErrorMessage("Please enter last name");
          isError(true);
        }
        break;
      case "password":
        if (PASSWORD_REGEX.test(value)) {
          isError(false);
          setErrorView(false);
        } else {
          setErrorView(true);
          setErrorMessage("Please enter valid password");
          isError(true);
        }
        break;
      case "Username":
        if (FULL_NAME.test(value)) {
          isError(false);
          setErrorView(false);
        } else {
          setErrorView(true);
          setErrorMessage("Please enter valid username");
          isError(true);
        }
        break;
      case "verification code":
        if (MOBILE_NO.test(value)) {
          isError(false);
          setErrorView(false);
        } else {
          setErrorView(true);
          setErrorMessage("Please enter valid code");
          isError(true);
        }
        break;
      case "Passport":
        if (PASSPORT.test(value)) {
          isError(false);
          setErrorView(false);
        } else {
          setErrorView(true);
          setErrorMessage("Please enter valid passport");
          isError(true);
        }
        break;
    }
  };

  handleChangeText = (event) => {
    onChangeText(event);
  };
  return (
    <MATextinputStyle.MainView>
      <MATextinputStyle.TextInputContainer>
        <TextInput
          ref={(text) => {
            setReference ? setReference(referenceName, text) : null;
          }}
          style={[commanStyle.textBox]}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          value={value}
          returnKeyType={returnKeyType}
          autoCapitalize={label == "Passport" ? "characters" : "none"}
          autoCorrect={false}
          editable={!editable ? editable : true}
          keyboardType={keyboardType ? keyboardType : "ascii-capable"}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={() => validation(label, value, isError)}
        />
        {label == "password" ? (
          <TouchableOpacity
            style={{ alignItems: "center", right: 1, position: "absolute", marginRight: 25, marginTop: 2 }}
            onPress={() => setSecure(!isSecure)}
          >
            <View>
              <Image
                source={
                  isSecure
                    ? require("../../assets/Images/EyeClose.png")
                    : require("../../assets/Images/EyeOpenIcon.png")
                }
                style={{
                  height: size(40),
                  width: size(20),
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </MATextinputStyle.TextInputContainer>
      {errorView ? <Text style={{ color: "red", fontFamily: CenturyGothicRegular }}>{errorMessage}</Text> : null}
    </MATextinputStyle.MainView>
  );
};

export default TextBoxWithBackground;
