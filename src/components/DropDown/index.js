import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { color } from "react-native-reanimated";
import { commanStyle } from "../Common/style";

const DropDown = (props) => {
  const {
    placeholder,
    extraStyle,
    dropDownOpen,
    dropDownClose,
    onSelectValue,
    list,
    selectedValue,
    borderColor,
    borderRadius,
    height,
    borderWidth,
    placeholderStyle
  } = props;
  const [open, setOpen] = useState(dropDownClose);
  const [value, setValue] = useState(selectedValue);
  const [items, setItems] = useState(list);

  return (
    <DropDownPicker
      open={dropDownClose}
      value={selectedValue ? selectedValue : null}
      items={items}
      placeholder={placeholder}
      style={[
        commanStyle.dropBox,
        { borderColor: '#B31F8472', borderRadius: borderRadius, borderWidth: borderWidth,height:height,zIndex:1},
      ]}
      textStyle={commanStyle.dropDownText}
      placeholderStyle={{color:'#C7C7CD'}}
      placeholderStyle={ placeholderStyle}
      setOpen={setOpen}
      setValue={(callback) => onSelectValue(callback(items.value))}
      setItems={setItems}
      onPress={() => dropDownOpen()}
    />
  );
};

export default DropDown;

DropDown.prototype = {
  borderRadius: 0,
};
