import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FlightInfo from "../screens/FlightInfo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Splash from "../screens/Auth/splash";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Menu from "../screens/Menu";
import { AuthContext } from "../utils/constants";
import General from "../screens/General";
import About from "../screens/General/About";
import ContactUs from "../screens/General/ContactUs";
import PrivacyPolicy from "../screens/General/PrivacyPolicy";
import Terms from "../screens/General/Terms";
import MyProfile from "../screens/MyProfile";
import Logout from "../screens/MyProfile/Logout";
import ProfileEditScreen from "../screens/ProfileEdit";
import Inboxes from "../screens/MyProfile/Inbox/index";
import FeedBack from "../screens/MyProfile/FeedBack";
import styled from "styled-components";
import FeedBackDone from "../screens/MyProfile/FeedBack/feedback-done";
import Message from "../screens/MyProfile/Inbox/Messages";
import Settings from "../screens/Settings/index";
import ChangePassword from "../screens/ChangePassword/index";
import Languages from "../screens/Languages";
import SpecialAssistance from "../screens/SpecialAssistance";
import TravelWithChild from "../screens/SPATravelWithChild";
import KeyInfo from "../screens/KeyInfo";
import KeyInfoDetails from '../screens/KeyInfoDetails'
import Promotion from "../screens/Promotion";
import PromotionDetails from "../screens/PromotionDetails"; 
import FlightInfoPage from '../screens/FlightInfoPage';
import FlightDetailsPage from '../screens/FlightDetailsPage';
import Transport from "../screens/Transport";
import Stores from "../screens/Stores";
import StoreDetails from "../screens/StoreDetails";
import StoreRatings from "../screens/StoreRatings";
import Evoucher from "../screens/Evoucher";
import Website from "../screens/Website";
import MyPlan from "../screens/MyPlan";
import Login from '../screens/Auth/Login';
import { MontserratRegular } from "../assets/font";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");

function FlightInfoStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="FlightInfoPage" component={FlightInfoPage}/>
      <Stack.Screen name="FlightDetailsPage" component={FlightDetailsPage}/>
      <Stack.Screen name="FlightInfo" component={FlightInfo} />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator headerMode={"none"} tabBarVisible={false}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notification" component={Notifications} />
      <Stack.Screen name="Assistance" component={AssistanceStack} />
      {/* <Stack.Screen name="TravelWithChild" component={TravelWithChild} /> */}
      {/* <Stack.Screen name="General" component={General} /> */}
      <Stack.Screen name="KeyInfo" component={KeyInfo}/>
      <Stack.Screen name="KeyInfoDetails" component={KeyInfoDetails}/>
      <Stack.Screen name="Promotion" component={Promotion}/>
      <Stack.Screen name="PromotionDetails" component={PromotionDetails}/>
      <Stack.Screen name="About" component={About} /> 
      <Stack.Screen name="ContactUs" component={ContactUs} /> 
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} /> 
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="MyProfile" component={MyProfile}/>
      <Stack.Screen name="Transport" component={Transport}/>
      <Stack.Screen name="Stores" component={Stores}/>
      <Stack.Screen name="StoreDetails" component={StoreDetails}/>
      <Stack.Screen name="StoreRatings" component={StoreRatings}/>
      <Stack.Screen name="Evoucher" component={Evoucher}/>
      <Tab.Screen name="MyPlan" component={MyPlan}/>
    </Stack.Navigator>
  );
}

function MyProfileStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="FlightInfo" component={FlightInfo} />
    </Stack.Navigator>
  );
}
function AssistanceStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="SpecialAssistance" component={SpecialAssistance} />
      <Stack.Screen name="TravelWithChild" component={TravelWithChild} />
    </Stack.Navigator>
  );
}

function MenuStack(){
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="General" component={General} />
    </Stack.Navigator>
  );
}
function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
    const { show, setShow } = React.useContext(AuthContext);

    return (
      <SafeAreaView style={{ flexDirection: "row" }}>
        <ImageBackground
          source={require("../assets/Images/NavBG.png")}
          style={{
            flexDirection: "row",
            width: "100%",
            height: RFValue(83),
            position: "absolute",
            bottom: useSafeAreaInsets().bottom,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          // resizeMode={'stretch'}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
            if(route.name == "Menu"){
              setShow(!show)
            }else{
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };
            const { show, setShow } = React.useContext(AuthContext);
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => {
                  onPress(index);
                }}
                activeOpacity={1}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: "center",
                  zIndex: 1,
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                {index == 1 ? (
                  <ImageBackground
                    source={require("../assets/Images/MenuBG.png")}
                    style={{
                      width: RFValue(70),
                      height: RFValue(70),
                      resizeMode: "contain",
                      marginRight: RFValue(7),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={
                        show
                          ? require("../assets/Images/cancel.png")
                          : require("../assets/Images/HamBurgerMenu.png")
                      }
                      style={{
                        width: RFValue(30),
                        height: RFValue(30),
                        resizeMode: "contain",
                        tintColor: "white",
                      }}
                    />
                  </ImageBackground>
                ) : (
                  <Image
                    source={
                      index == 0
                        ? require("../assets/Images/SingleToken.png")
                        : require("../assets/Images/WayFinding.png")
                    }
                    style={{
                      width: RFValue(28),
                      height: RFValue(28),
                      resizeMode: "contain",
                    }}
                  />
                )}
                {
                  <Text
                    style={{
                      fontSize: RFValue(13),
                      fontFamily: MontserratRegular,
                      color: "#231F20",
                      marginBottom: index == 1 ? RFValue(18) : 0,
                      marginTop: RFValue(4),
                    }}
                  >
                    {index == 0
                      ? "SINGLE TOKEN"
                      : index == 2
                      ? "WAY FINDING"
                      : ""}
                  </Text>
                }
              </TouchableOpacity>
            );
          })}
        </ImageBackground>
      </SafeAreaView>
    );
}
export function TabStack({route, navigation}) {
  const {show, setShow}=React.useContext(AuthContext)
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
      <Tab.Screen name="FlightInfo" component={FlightInfoStack} />
    </Tab.Navigator>
  );
}

function AppStack() {
  // alert('called')
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="General" component={General} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="Editprofile" component={ProfileEditScreen} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="FeedBackDone" component={FeedBackDone} />
      <Stack.Screen name="Inboxes" component={Inboxes} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Promotion" component={Promotion}/>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword}/>
      <Stack.Screen name="Languages" component={Languages}/>
      <Stack.Screen name="Website" component={Website}/>
      <Stack.Screen name="MyPlan" component={MyPlan}/>
      <Stack.Screen name="Evoucher" component={Evoucher}/>
    </Stack.Navigator>
  );
}
export default AppStack;
