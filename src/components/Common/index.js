import { func } from "prop-types";
import React, { useState } from "react";
import {
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Picker,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import LinearGradient from "react-native-linear-gradient";
import { maroon, maroonlight, white } from "../../assets/colors";
import { CenturyGothicRegular, MontserratBold, MontserratRegular, OpenSansRegular } from "../../assets/font";
//import { OpenSansRegular } from "../../assets/font";
import { size } from "../../assets/size";
import styles from "../../assets/styles";
import { commanStyle } from "./style";
import moment from "moment";
import { height } from "../Login/constant";
import themes from "../../themes";

export function SafeView({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
export function BackButton(props) {
  return (
    <Pressable onPress={props.onPress}>
      <Image
        source={require("../../assets/Images/BackArrow.png")}
        style={commanStyle.backButton}
      />
    </Pressable>
  );
}
// export function TextBoxWithBackground({
//   placeholder,
//   isSecure,
//   onChangeText,
//   extraStyle,
// }) {
//   return (
//     <ImageBackground
//       source={require("../../assets/Images/TextBoxShadow.png")}
//       style={[commanStyle.textBoxBackground, extraStyle]}
//       resizeMode={"stretch"}
//     >
//       <TextInput
//         style={[commanStyle.textBox]}
//         secureTextEntry={isSecure}
//         placeholder={placeholder}
//         onChangeText={onChangeText}
//       />
//     </ImageBackground>
//   );
// }

export function ButtonWithBackground({ onPress, text, extraStyle }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={extraStyle}>
        <ImageBackground
          style={commanStyle.buttonBackground}
          resizeMode={"stretch"}
          source={require("../../assets/Images/SubmitBackground.png")}
        >
          <Text style={commanStyle.buttonTxt}>{text}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
export function MarginTop({top, bg}){
  return(<View
    style={{
        marginTop:top,
        backgroundColor: bg ? bg : white
    }}
/>)
}
export function AuthHeader({ navigation, title, screen, isSignupEntry, extraParams }) {

  

  return (
    <View style={commanStyle.HeaderContainer}>
      <View style={{paddingBottom: isSignupEntry ? 100 : 0}}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      {title}
      <View style={commanStyle.empty} />
    </View>
  );
}
export function LightText({ text }) {
  return (
    <Text style={{ fontWeight: "500", fontFamily: MontserratRegular }}>
      {text}
    </Text>
  );
}
export function AuthContainer({ children, isFromSignUp }) {
  return <View style={[commanStyle.authContainer, isFromSignUp && {marginTop: height / 3.8} ]}>{children}</View>;
}
export function SettingsContainer({ children }) {
  return <View style={commanStyle.ProfileContainer}>{children}</View>;
}

export function Dropdowns({ list, borderColor, placeholder }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(placeholder);
  const [items, setItems] = useState(list);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      placeholder={placeholder}
      style={[commanStyle.dropBox, { borderColor: borderColor }]}
      textStyle={commanStyle.dropDownText}
      dropDownContainerStyle={{
        borderWidth: 0.3,
      }}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}

export function DropDowns() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Malaysia");
  const [items, setItems] = useState([
    { label: "Japan", value: "Japan" },
    { label: "India", value: "India" },
    { label: "Malaysia", value: "Malaysia" },
    { label: "China", value: "China" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      style={{ borderWidth: 1, borderColor: themes.borderColorPink, borderRadius: 0 }}
      textStyle={{
        fontSize: size(17),
        paddingHorizontal: size(8),
        color: "grey",
      }}
      dropDownContainerStyle={{
        borderWidth: 0.3,
      }}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}

export function BackTitleHeader(props) {
  return (
    <View style={commanStyle.backConatiner}>
      <BackButton onPress={() => props.navigation.goBack()} />
      <Text style={commanStyle.backTitle}>{props.title}</Text>
    </View>
  );
}

export function GeneralTitleHeader(props) {
  return (
    <View style={commanStyle.backConatiner}>
      <BackButton onPress={() => props.navigation.goBack()} />
      {/* <Text style={commanStyle.generalTitle}>{props.title}</Text> */}
      <View
        style={{
          flexDirection: "row",
          //alignItems: "baseline",
        }}
      >
        <Text style={[styles.aboutTitle, { paddingHorizontal:5}]}>{props.lightTitle}</Text>
        <Text style={[styles.aboutTitle, { fontFamily: "Montserrat-Bold",marginLeft:-5 }]}>
          {props.bolTitle}
        </Text>
      </View>
    </View>
  );
}
export function GeneralItem(props) {
  const { item, extraIconStyle, extraTextStyle, extraConStyle } = props;
  return (
    <Pressable
      onPress={() => props.navigation.navigate(item.navigateTo)}
      style={(commanStyle.generalContainer, extraConStyle)}
    >
      <Image
        resizeMode={"center"}
        source={item.icon}
        style={(commanStyle.generalItemIcon, extraIconStyle)}
      />
      <Text style={(commanStyle.generalItemText, extraTextStyle)}>
        {item.title}
      </Text>
    </Pressable>
  );
}
export function Title({ lightTitle, bolTitle, icon }) {
  return (
    <View style={[styles.flexRow, { alignItems: "center",paddingHorizontal:20 }]}>
      <Image source={icon} style={styles.infoIcon} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <Text style={[styles.aboutTitle, { paddingHorizontal:5}]}>{lightTitle}</Text>
        <Text style={[styles.aboutTitle, { fontFamily: "Montserrat-Bold",marginLeft:-5 }]}>
          {bolTitle}
        </Text>
      </View>
    </View>
  );
}

export function AuthCancel({ navigation, title }) {
  return (
    <View style={commanStyle.HeaderContainer}>
      <View style={commanStyle.empty} />
      {title}
      <CancelButton onPress={() => navigation.goBack()} />
    </View>
  );
}
export function HeaderEnd({ navigation, title }) {
  return (
    <View style={commanStyle.HeaderContainer}>
      <BackButton onPress={() => navigation.goBack()} />
      {title}
      <View style={commanStyle.empty} />
    </View>
  );
}

export function CancelButton(props) {
  return (
    <Pressable onPress={props.onPress}>
      <Image
        source={require("../../assets/Images/Close.png")}
        style={commanStyle.cancelButton}
      />
    </Pressable>
  );
}
export function PhotoIcon(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        {props.uri?<Image
          source={{
            uri: props.uri,
          }}
          style={commanStyle.circleIcon}
        />:
        <Image
          source={props.asset}
          style={commanStyle.circleIcon}
        />}
        <Image
          source={require("../../assets/Images/Edit_Camera.png")}
          style={commanStyle.camerIcon}
        />
      </View>
    </TouchableOpacity>
  );
}

export function ProfileDetailsContainer(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={commanStyle.bodycontainer}
      >
        <View>
          <Image
            style={commanStyle.image}
            source={require("../../assets/Images/Promotions.png")}
          />
          <Text style={commanStyle.detailText}>Promotions</Text>
        </View>
        <View>
          <Image
            style={commanStyle.image}
            source={require("../../assets/Images/Inbox.png")}
          />
          <Text style={[commanStyle.detailText, { marginLeft: -3 }]}>
            Inbox
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignContent: "space-between",
            justifyContent: "space-between",
          }}
        >
          <Image
            style={commanStyle.image}
            source={require("../../assets/Images/Settings.png")}
          />
          <Text style={[commanStyle.detailText, { marginLeft: -8 }]}>
            Settings
          </Text>
        </View>
      </TouchableOpacity>
      <MarginTop top={size(60)} />
      <TouchableOpacity
        onPress={props.onPress}
        style={commanStyle.bodycontainer}
      >
        <View>
          <Image
            style={commanStyle.image}
            source={require("../../assets/Images/favorite.png")}
          />
          <Text style={commanStyle.detailText}>Favourites</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={props.onPress}
            style={commanStyle.bodycontainer}
          >
            <View>
              <Image
                style={commanStyle.image}
                source={require("../../assets/Images/Promotions.png")}
              />
              <Text style={commanStyle.detailText}>Promotions</Text>
            </View>
            <View>
              <Image
                style={commanStyle.image}
                source={require("../../assets/Images/Inbox.png")}
              />
              <Text style={[commanStyle.detailText, { marginLeft: -3 }]}>
                Inbox
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignContent: "space-between",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={commanStyle.image}
                source={require("../../assets/Images/Settings.png")}
              />
              <Text style={[commanStyle.detailText, { marginLeft: -8 }]}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <MarginTop top={size(60)} />
          <TouchableOpacity
            onPress={props.onPress}
            style={commanStyle.bodycontainer}
          >
            <View>
              <Image
                style={commanStyle.image}
                source={require("../../assets/Images/favorite.png")}
              />
              <Text style={commanStyle.detailText}>Favourites</Text>
            </View>
          {/*  <View>
              <Image
                style={commanStyle.image}
                source={require("../../assets/Images/Feedback.png")}
              />
              <Text style={commanStyle.detailText}>Feedback</Text>
          </View> */}
            <View
              style={{
                flexDirection: "column",
                alignContent: "space-between",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={commanStyle.image}
                source={require("../../assets/Images/General.png")}
              />
              <Text style={[commanStyle.detailText, { marginLeft: -10 }]}>
                General
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export function TextBoxWithBackground({
  placeholder,
  isSecure,
  onChangeText,
  extraStyle,
}) {
  return (
    <ImageBackground
      source={require("../../assets/Images/TextBoxShadow.png")}
      style={[commanStyle.textBoxBackground, extraStyle]}
      resizeMode={"stretch"}
    >
      <TextInput
        style={[commanStyle.textBox]}
        secureTextEntry={isSecure}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </ImageBackground>
  );
}

export function MarginLeft({ left }) {
  return (
    <View
      style={{
        marginLeft: left,
      }}
    />
  );
}

export function DropDownsGEnder(data) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data.selectedValue);
  const [items, setItems] = useState([
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
    { label: "others", value: "others" },
  ]);
  return (
    <DropDownPicker
      open={open}
      value={data.selectedValue ? data.selectedValue : null}
      items={items}
      placeholder="Gender"
      style={{ borderWidth: 1, borderColor: "lightgrey", borderRadius: 0 }}
      textStyle={{
        fontSize: size(17),
        paddingHorizontal: size(8),
        color: "grey",
      }}
      dropDownContainerStyle={{
        borderWidth: 0.3,
      }}
      setOpen={setOpen}
      setValue={(callback) => data.onSelectValue(callback(items.value))}
      setItems={setItems}
    />
  );
}

export function DropDownsGEnderBirthday(values) {
  return (
    <ImageBackground
      source={require("../../assets/Images/TextBoxShadow.png")}
      style={[commanStyle.textBoxBackground]}
      resizeMode={"stretch"}
    >
      <TouchableOpacity onPress={() => values.onPressDropDown()}>
        <View>
          <TextInput placeholder={values.date} editable={false} />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export function ToggleSwitch() {
  return (
    <Switch
      style={{ marginTop: 40 }}
      value={true}
      onValueChange={(val) => console.log(val)}
      disabled={false}
      activeText={"On"}
      inActiveText={"Off"}
      circleSize={35}
      barHeight={30}
      circleBorderWidth={15}
      backgroundActive={"pink"}
      backgroundInactive={"gray"}
      circleActiveColor={"#30a566"}
      circleInActiveColor={"#000000"}
      changeValueImmediately={true}
      changeValueImmediately={true}
      innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
      outerCircleStyle={{}}
      renderActiveText={true}
      renderInActiveText={false}
      switchLeftPx={2}
      switchRightPx={2}
      switchWidthMultiplier={2}
      switchBorderRadius={40}
    />
  );
}

export function Tabs({ iconPath, text, isActive, onSelect }) {
  return (
    <Pressable
      style={{
        alignItems: "center",
      }}
      onPress={onSelect}
    >
      <Image
        source={iconPath}
        style={{
          width: size(25),
          height: size(25),
          resizeMode: "contain",
          tintColor:
            text == "Messages"
              ? isActive
                ? "rgb(216,11,99)"
                : "rgba(216,11,99,0.5)"
              : isActive
              ? maroon
              : "rgba(0,0,0,0.3)",
        }}
      />
      <MarginTop top={size(8)} />

      <Text
        style={{
          fontSize: size(16),
          fontFamily: MontserratRegular,
          color: isActive ? "black" : "grey",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
export function WhiteLines({ number, color, width }) {
  return (
    <>
      {new Array(number).fill("1").map((item, index) => {
        return (
          <View
            style={[
              styles.whiteLines,
              {
                backgroundColor: index % 2 == 0 ? "white" : color,
                width: width,
              },
            ]}
          />
        );
      })}
    </>
    // <View style={[styles.whiteLines,{backgroundColor:index%2==0?'white':'rgb(248,0,106)'}]}/>
  );
}
export function MaroonGradient({ children }) {
  return (
    <LinearGradient
      style={[styles.linearContainer, {}]}
      colors={[maroon, maroonlight]}
    >
      {children}
    </LinearGradient>
  );
}
export function NotificationCard({ extraStyle }) {
  return (
    <Pressable
      style={[styles.flexRow, extraStyle]}
      onPress={() => {
        this.props.navigation.navigate("Notification");
      }}
    >
      <MaroonGradient>
        <View style={styles.linearSubCon}>
          <View style={styles.carIconContainer}>
            <Image
              source={require("../../assets/Images/car.png")}
              style={styles.carIcon}
            />
          </View>
          <Text style={styles.happyJrnyTxt}>
            You are on the way to airport Happy Journey
          </Text>
        </View>
      </MaroonGradient>
      <WhiteLines number={10} color={maroon} width={"1.2%"} />
    </Pressable>
  );
}

export function SocialLinks({socialLinks}) {
  return (
    <View style={[styles.flexRow, { justifyContent: "center", bottom: "12%" }]}>
      {socialLinks.map((item) => {
        return (
          <Pressable onPress={() => Linking.openURL(item.link)}>
            <Image source={item.icon} style={styles.socialIcon} />
          </Pressable>
        );
      })}
    </View>
  );
}

