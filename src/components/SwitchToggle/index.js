import React from "react";
import SwitchSelector from "react-native-switch-selector";
import { View } from "react-native";

const SwitchToggle = (props) => {
  const {list,onChange} = props;

  return (
    <View style={{ width: "30%" }}>
      <SwitchSelector
        initial={0}
        height={35}
        borderWidth={0.1}
        borderRadius={20}
        textColor={"#000000"}
        selectedColor={"#ffffff"}
        buttonColor={"#ff3385"}
        borderColor={"#B31F84"}
        borderWidth={1}
        hasPadding
        onPress={onChange}
        options={list}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />
    </View>
  );
};
export default SwitchToggle;
