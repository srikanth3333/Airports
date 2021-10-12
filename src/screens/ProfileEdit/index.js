import React from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
//import { ImagePicker } from '../../Components/Comman';
//import ImagePicker from '../../Components/EditProfile/index';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../assets/styles";
import { size } from "../../assets/size";
import {
  ButtonWithBackground,
  SafeView,
  AuthHeader,
  LightText,
  MarginTop,
  DropDowns,
  // ProfileContainer,
  DropDownsGEnder,
  PhotoIcon,
  MarginLeft,
} from "../../components/Common/index";
import { LoginSubContainer } from "../../components/Login";
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextBoxWithBackground from "../../components/TextInput";
import DropDownPicker from "../../components/DropdownPicker";
import { connect } from "react-redux";
import { postUserInfo, loader, postProfileImage,clearImage} from "../Auth/action";
import { objectOf } from "prop-types";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import Loader from "../../components/Loader";
import Errorinfo from "../../components/Errorinfo";
import { white } from "../../assets/colors";
import DropDown from "../../components/DropDown/index";
import countries from "../../utils/countries";
import { getCountry, getCountryID } from "../../utils/globalMethods";
import { EditprofilePageStyle } from "./styles";
import { useFocusEffect } from '@react-navigation/native';


/* function FetchUserData({ userId, onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      return () => alert("there");
    }, [userId, onUpdate])
  );

  return null;
} */

class ProfileEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      genderList: [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" },
        { label: "others", value: "others" },
      ],
      countryList: [{ label: "Malaysia", value: "Malaysia" }],
      country: "Malaysia",
    };
    this.inputs = {};
  }

  setReference = (name, comp) => {
    this.inputs[name] = comp;
  };

  handleOnSubmitEditing = (inputName) => {
    this.inputs[inputName].focus();
  };

  componentDidMount() {
    let userProfile = this.props.userProfile;
    if (objectOf(userProfile).length > 0) {
      this.setState({
        firstname: userProfile.firstName,
        lastname: userProfile.lastName,
        Email: userProfile.emailAddress,
        passport: userProfile.passport,
        Mobile: userProfile.mobile,
        adress: userProfile.address,
        gender: userProfile.gender,
        birthDay: userProfile.birthDay,
        validFirstName: true,
        validLastName: true,
        countryId: getCountryID(countries, userProfile.origin),
      });
    }
  }

  submitProfileData = () => {
    if (
      this.state.firstname &&
      this.state.lastname &&
      this.state.validFirstName &&
      this.state.validLastName
    ) {
      this.props.loader(true);

      let data = {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        origin: getCountry(countries, this.state.countryId),
        gender: this.state.gender,
        birthDay: this.state.birthDay
          ? moment(this.state.birthDay).format("yyyy-MM-DDTHH:mm:ss")
          : null,
        passport: this.state.passport,
        mobile: this.state.Mobile ? this.state.Mobile : null,
        address: this.state.adress,
        image: this.props.userProfile.image,
        notificationSettings: {
          alert: false,
          promotions: false,
          myFlight: true,
        },
      };
      this.props.postUserInfo({
        data,
        onSuccess: (data) => {
          this.props.loader(false);
          this.setState({
            showerror: "Profile Updated Sucessfully",
            sucess: true,
          });
          setTimeout(() => {
            this.setState({
              showerror: "",
              sucess: false,
            });
          }, 3000)
        },
        onError: (err) => {
          this.props.loader(false);
          this.setState({ showerror: err, sucess: false });
        },
      });
    }
  };

  launchImageLibraryForProfile = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response) => {
      console.log("Image::Response = ", response);

      if (response.didCancel) {
        console.log("Image::User cancelled image picker");
      } else if (response.error) {
        console.log("Image::ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log(
          "Image::User tapped custom button: ",
          response.customButton
        );
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log("Image::responsee", JSON.stringify(response));
        const { assets } = response;
        console.log("Image::responsee Assets", assets);
        debugger;
        if (assets.length > 0) {
          let parsedResPath = assets[0];
          this.setState({
            filePath: parsedResPath,
            fileData: parsedResPath.fileName,
            fileUri: parsedResPath.uri,
            editModal: false,
          });
          //API Call for Profile Photo
          this.initAPICallforProfileImage(parsedResPath);
        }
      }
    });
  };

  requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "MYAirports Camera Permission",
            message: "MYAirports needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.launchCameraForProfile();
        } else {
          Alert("Permission Denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.launchCameraForProfile();
    }
  };

  launchCameraForProfile = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log("response", JSON.stringify(response));
        const { assets } = response;
        console.log("Image::responsee Assets From Camera", assets);
        if (assets.length > 0) {
          let parsedResPath = assets[0];
          this.setState({
            filePath: parsedResPath,
            fileData: parsedResPath.fileName,
            fileUri: parsedResPath.uri,
            editModal: false,
          });
          //API Call for Profile Photo
          this.initAPICallforProfileImage(parsedResPath);
        }
      }
    });
  };

 
  initAPICallforProfileImage = (imgData) => {
    ImageResizer.createResizedImage(imgData.uri, 500, 300, 'JPEG', 100)
      .then(response => {
        debugger;
        // console.log('nammmememme', response.uri)
        let fileURI = Platform.OS === 'ios' ? response.uri.replace("file://", "") : response.uri
        // const data = new FormData();
        // data.append('image', fileURI)
        let imageData ={ uri:response.uri, type: this.state.filePath.type, name: 'userProfile' }
        let data = new FormData()
        data.append('files', imageData)
        this.props.postProfileImage({
          data,
          onSuccess: () => {
            this.setState({ showerror: "Profile image uploaded successfully", sucess: true });
          },
          onError: (error) => {
            this.setState({ showerror: "Some error occured", sucess: false })
          }
        })
      })
      .catch(err => {
        this.setState({ showerror: "Something went wrong", sucess: false });
      });

  }

  renderProfileImage = () => {
    let imageURI = this.state.fileUri
      ? this.state.fileUri
      :this.props.userProfile.image;
    return (
    imageURI?<View style={{ marginTop: 5 }}>
        <PhotoIcon
          uri={imageURI}
          onPress={() => this.setState({ editModal: true })}
        />
      </View>:
      <View style={{ marginTop: 5 }}>
        <PhotoIcon
          asset={require('../../assets/Images/MyProfile_Icon.png')}
          uri={''}
          onPress={() => this.setState({ editModal: true })}
        />
      </View>
    );
  };

  render() {
    
    const { editModal } = this.state;
    return (
      <SafeView>
        {/* <FetchUserData
          userId={this.state.firstname}
          onUpdate={this._handleUpdate}
        /> */}
        <View style={{ backgroundColor: white, flex: 1 }}>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "space-between",
                backgroundColor: white,
              }}
            >
              <AuthHeader
                navigation={this.props.navigation}
                title={
                  <Text style={styles.editProfileTitle}>
                    <LightText text={"EDIT"} />
                    {" PROFILE"}
                  </Text>
                }
              />
              {this.renderProfileImage()}
            </View>
            <Loader loading={this.props.loading}/>
            {this.state.showerror ? (
              <View style={{ marginTop: "4%", marginHorizontal: 16 }}>
                <Errorinfo
                  message={this.state.showerror}
                  sucess={this.state.sucess}
                />
              </View>
            ) : null}
            <KeyboardAwareScrollView style={{ backgroundColor: white }}>
              {/* <ProfileContainer> */}

              <LoginSubContainer>
                <MarginTop top={size(10)} />
                <EditprofilePageStyle.DividedView>
                  <TextBoxWithBackground
                    onChangeText={(firstname) => {
                      this.setState({ firstname: firstname });
                    }}
                    placeholder={"First Name"}
                    label={"first name"}
                    setReference={this.setReference}
                    referenceName="firstname"
                    returnKeyType={"next"}
                    onSubmitEditing={() =>
                      this.handleOnSubmitEditing("lastname")
                    }
                    value={this.state.firstname}
                    isError={(isError) =>
                      this.setState({ validFirstName: !isError })
                    }
                  />
                  <MarginLeft left={size(10)} />

                  <TextBoxWithBackground
                    onChangeText={(lastname) => {
                      this.setState({ lastname: lastname });
                    }}
                    placeholder={"Last Name"}
                    label={"last name"}
                    setReference={this.setReference}
                    referenceName="lastname"
                    returnKeyType={"next"}
                    onSubmitEditing={() =>
                      this.handleOnSubmitEditing("lastname")
                    }
                    value={this.state.lastname}
                    isError={(isError) =>
                      this.setState({ validLastName: !isError })
                    }
                    extraStyle={{
                      marginHorizontal: 30,
                    }}
                  />
                </EditprofilePageStyle.DividedView>
                <EditprofilePageStyle.DividedView style={{ marginTop: 15 }}>
                  <View style={{ width: "48%", marginRight: 11 }}>
                    <DropDown
                     borderWidth={1}
                     height={48}
                      list={this.state.genderList}
                      onSelectValue={(value) =>
                        this.setState({
                          gender: value,
                          genderDropDown: false,
                        })
                      }
                      open={this.state.genderOpen}
                      borderColor={"lightgrey"}
                      selectedValue={this.state.gender}
                      placeholder={"Gender"}
                      dropDownOpen={() =>
                        this.setState({
                          genderDropDown: true,
                          countryDropDown: false,
                        })
                      }
                      dropDownClose={this.state.genderDropDown}
                    />
                  </View>
                  <View style={{ width: "48%" }}>
                    <DropDownPicker
                      placeholder={"BirthDay"}
                      date={moment(this.state.birthDay).format("DD/MM /YYYY")}
                      onPressDropDown={() =>
                        this.setState({ visible: !this.state.visible })
                      }
                      extraStyle={{
                       // borderWidth: .5,
                        //borderColor: "#B31F8472",
                      }}
                    />
                    <DateTimePicker
                      mode={"date"}
                      maximumDate={moment().toDate()}
                      onConfirm={(dt) => {
                        const date = moment(dt).format("DD-MMM-YYYY");
                        this.setState({
                          birthDay: date,
                          visible: !this.state.visible,
                        });
                      }}
                      onCancel={() => {
                        this.setState({
                          visible: !this.state.visible,
                        });
                      }}
                      isVisible={this.state.visible}
                    />
                  </View>
                </EditprofilePageStyle.DividedView>
                <MarginTop top={size(10)} />

                <TextBoxWithBackground
                  onChangeText={(passport) => {
                    this.setState({ passport: passport.toUpperCase() });
                    let userPassport = passport.slice(-1)
                    if(userPassport.match(/^[^a-zA-Z0-9]+$/)) {
                      alert('Cannot enter special characters')
                      this.setState({ passport: '' });
                    }
                  }}
                  placeholder={"Passport Number"}
                  label={"Passport"}
                  setReference={this.setReference}
                  keyboardType={"alpha-numeric"}
                  referenceName="NRIC/Passport"
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.handleOnSubmitEditing("email")}
                  value={this.state.passport}
                  isError={(isError) =>
                    this.setState({ validPassport: !isError })
                  }
                />
                <MarginTop top={size(15)} />

                <TextBoxWithBackground
                  onChangeText={(Email) => {
                    this.setState({ Email: Email });
                  }}
                  label={"email"}
                  setReference={this.setReference}
                  referenceName="email"
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.handleOnSubmitEditing("Mobile")}
                  placeholder={"Enter Email"}
                  value={this.state.Email}
                  editable={false}
                  isError={(isError) => this.setState({ validEmail: !isError })}
                  extraStyle={{
                    marginVertical: 20,
                  }}
                />
                <MarginTop top={size(15)} />

                <TextBoxWithBackground
                  onChangeText={(Mobile) => {
                    this.setState({ Mobile: Mobile })
                    let userMobile = Mobile.slice(-1)
                    if(userMobile.match(/^[^a-zA-Z0-9]+$/)) {
                      alert('Cannot enter special characters')
                      this.setState({ Mobile: '' });
                    }else if(Mobile.length > 10) {
                      alert('Cannot be more than 10 characters')
                      this.setState({ Mobile: '' });
                    }
                  }}
                  label={"Mobile"}
                  setReference={this.setReference}
                  referenceName="Mobile"
                  returnKeyType={"next"}
                  keyboardType={"number-pad"}
                  onSubmitEditing={() => this.handleOnSubmitEditing("adress")}
                  placeholder={"Enter Mobile Number"}
                  value={this.state.Mobile}
                  keyboardtype={"numeric"}
                />
                <MarginTop top={size(15)} />

                <TextBoxWithBackground
                  onChangeText={(adress) => {
                    this.setState({ adress: adress });
                  }}
                  label={"adress"}
                  setReference={this.setReference}
                  referenceName="adress"
                  returnKeyType={"next"}
                  placeholder={"Enter address"}
                  value={this.state.adress}
                  extraStyle={{
                    marginVertical: 20,
                  }}
                />
                <MarginTop top={size(10)} />

                <DropDown
                  list={countries}
                  borderColor={"#B31F8472"}
                  borderWidth={1}
                  height={45}
                  onSelectValue={(value) =>
                    this.setState({ countryId: value, countryDropDown: false })
                  }
                  selectedValue={this.state.countryId}
                  placeholder={"Select a Country"}
                  dropDownOpen={() =>
                    this.setState({
                      countryDropDown: true,
                      genderDropDown: false,
                    })
                  }
                  dropDownClose={this.state.countryDropDown}
                />
                <ButtonWithBackground
                  onPress={() => this.submitProfileData()}
                  text={"SAVE"}
                />
              </LoginSubContainer>

              {/* </ProfileContainer> */}
            </KeyboardAwareScrollView>
          </View>
          <Modal
            transparent
            visible={editModal}
            onRequestClose={() => {
              this.setState({
                editModal: false,
              });
            }}
            animationType={"slide"}
          >
            <View style={styles.editModalCon}>
              <View style={styles.flex} />
              <View style={styles.modalWhiteCon}>
                <Text style={[styles.loginTitle, { fontSize: size(22) }]}>
                  <LightText text={"EDIT "} />
                  PHOTO
                </Text>
                <Pressable
                  style={styles.closeCon}
                  onPress={() => this.setState({ editModal: false })}
                >
                  <Image
                    source={require("../../assets/Images/Close.png")}
                    style={styles.closeIcon}
                  />
                </Pressable>
                <View style={styles.flexWithjustifyCenter}>
                  <MarginTop top={size(-65)} />
                  <ButtonWithBackground
                    onPress={this.requestCameraPermission}
                    text={"USE CAMERA"}
                    extraTxtStyle={{}}
                  />
                  <MarginTop top={size(-35)} />
                  <ButtonWithBackground
                    onPress={this.launchImageLibraryForProfile}
                    text={"FROM ALBUM"}
                    extraTxtStyle={{}}
                  />
                  <MarginTop top={size(20)} />
                  <TouchableOpacity onPress={()=>this.props.clearImage()}>
                  <Text style={styles.clear}>CLEAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    userProfile: state.SplashReducer.userProfile,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  postUserInfo: postUserInfo,
  loader: loader,
  postProfileImage: postProfileImage,
  clearImage:clearImage
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);
