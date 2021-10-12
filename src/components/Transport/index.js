import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { size } from "../../assets/size";
import { BackButton } from "../../components/Common";
import {
  HeaderContainer,
  HeaderText,
  style,
  TopBack,
  TransportIcon,
  TransportTypeContainer,
  TransportType,
  RowAlignMent,
  TravelDetail,
  Row,
  TimeIcon,
  TimeContainer,
  Estimation,
  Time,
} from "../../screens/Transport/style";

export function Header({ navigation }) {
  return (
    <HeaderContainer>
      <BackButton onPress={() => navigation.goBack()} />
      <HeaderText>Transport</HeaderText>
    </HeaderContainer>
  );
}

export function TravelDropDown({
  list,
  placeholder,
  setValue,
  value,
  extraStyle,
}) {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(placeholder);
  const [items, setItems] = useState(list);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      zIndex={100}
      placeholder={placeholder}
      style={style.dropDownStyle}
      textStyle={style.dropDownTextStyle}
      dropDownContainerStyle={{
        borderColor: "rgb(233,82,138)",
      }}
      containerStyle={[style.dropDownContainer, extraStyle]}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}

export function TopBackground() {
  return (
    <TopBack
      style={{
        top: size(60) + useSafeAreaInsets().top,
      }}
    />
  );
}

export function TransportTypes({
  transportTypeData,
  onTransport,
  isActiveIndex,
}) {
  return (
    <TransportTypeContainer>
      {transportTypeData.map((item, index) => (
        <TransportType onPress={() => onTransport(index)}>
          <TransportIcon
            source={
              isActiveIndex == index ? item.activeIcon : item.inActiveIcon
            }
          />
        </TransportType>
      ))}
    </TransportTypeContainer>
  );
}

export function TravelDetails() {
  return (
    <RowAlignMent>
      <TravelDetail>Travel Details</TravelDetail>
      <Row>
        <TimeIcon source={require("../../assets/Images/time.png")} />
        <TimeContainer>
          <Estimation>Estimate Travel Duration</Estimation>
          <Time>5 hrs 42 mins</Time>
        </TimeContainer>
      </Row>
    </RowAlignMent>
  );
}