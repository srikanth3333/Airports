import React from "react";
import { Text, View, Appearance, I18nManager, Dimensions } from "react-native";
import DropDown from "../CustomLibrary/dropdown/index";
import mockdata from "./mock/index";
const defaultPlaceHolder = "1";

const MYDropDown = ({
  placeholder = defaultPlaceHolder,
  data = mockdata,
  dropDownStyle,
  onItemSelected,
  disabled = false,
  onIosPickerPressed,
  isPickerEnabled,
  iosPickerPlaceHolderValue,
  iosPickerDisabled,
  containerStyle,
}) => {
  const mockData = [
    {
      label: "1",
      value: 1,
    },
  ];

  return (
    <View>
      <DropDown
        iosPickerDisabled={iosPickerDisabled}
        placeholder={placeholder}
        data={data}
        disabled={disabled}
        isPickerEnabled={isPickerEnabled}
        onItemSelected={onItemSelected}
        onIosPickerPressed={onIosPickerPressed}
        iosPickerPlaceHolderValue={iosPickerPlaceHolderValue}
        pickerStyle={{
          paddingLeft: 6,
        }}
      />
    </View>
  );
};

export default MYDropDown;
