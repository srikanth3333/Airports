import React from "react";
import {
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { commanStyle } from "../Common/style";

const DropDownPicker = (props) => {
  const { placeholder, extraStyle, onPressDropDown, date } = props;
  return (
    <ImageBackground
      source={require("../../assets/Images/TextBoxShadow.png")}
      style={[commanStyle.DropDownBackground, extraStyle]}
    >
      <TouchableOpacity onPress={() => onPressDropDown()}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[commanStyle.textBox]}
            editable={false}
            placeholder={placeholder}
            onPressIn={() => onPressDropDown()}
            value={date}
          />
          <TouchableOpacity>
            <Image
              source={require("../../assets/Images/down_arrow.png")}
              style={commanStyle.DownArrow}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default DropDownPicker;
