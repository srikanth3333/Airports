import React, { PureComponent } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  FlatList,
  Pressable,
  Modal,
  PermissionsAndroid,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import LinearGradient from "react-native-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { red, white } from "../../assets/colors";
import styles from "../../assets/styles";
import {
  ButtonWithBackground,
  GeneralItem,
  LightText,
  MarginTop,
} from '../../components/Common'
import ErrorInfo from "../../components/Errorinfo";
import MAGeneralListItem from "../../components/MAGeneralListItem";
import { Wrapper } from "../../services";
import { getLoggenInUserData } from "../../storage/reduxStore";
import { windowHeight } from "../../utils/constants";
import { isEmpty } from "../../utils/globalMethods";
import { postProfileImage,clearImage } from "../Auth/action";
import { MyProfileStyles } from "./style";
import { useFocusEffect } from '@react-navigation/native';

const size = (value) => RFValue(value);


         
class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    props.navigation.addListener('focus', () => {
      this.setUserName()
    });
    this.state = {
      list: [
        {
          title: "Promotions",
          icon: require("../../assets/Images/percentage.png"),
          navigateTo: "Promotion",
        },
        {
          title: "Inbox",
          icon: require("../../assets/Images/Inbox.png"),
          navigateTo: "Inboxes",
        },

        {
          title: "Favourites",
          icon: require("../../assets/Images/favorite.png"),
          navigateTo: "",
        },
        
      ],
      list2: [
        {
          title: "Settings",
          icon: require("../../assets/Images/Settings.png"),
          navigateTo: "Settings",
        },
        {
          title: "Feedback",
          icon: require("../../assets/Images/Feedback.png"),
          navigateTo: "FeedBack",
        },
        {
          title: "General",
          icon: require("../../assets/Images/General.png"),
          navigateTo: "General",
        },
      ],

      list3: [
        {
          title: "Organize",
          icon: require("../../assets/Images/Settings.png"),
          navigateTo: "Settings",
        },
      ],
      socialLinks: [
        {
          icon: require("../../assets/Images/facebook-rect.png"),
          link: "https://m.facebook.com/MalaysiaAirportsOfficial/",
        },
        {
          icon: require("../../assets/Images/twitter-bird.png"),
          link: "https://mobile.twitter.com/MY_Airports",
        },
        {
          icon: require("../../assets/Images/youtube.png"),
          link: "https://youtube.com/c/malaysiaairportsMAHB",
        },
        {
          icon: require("../../assets/Images/instagram.png"),
          link: "https://www.instagram.com/malaysiaairports/",
        },
        {
          icon: require("../../assets/Images/weibo.png"),
          link: "https://weibo.com/malaysiaairports",
        },
      ],
      editModal: false,
      userName: '',
      showerror: null
    };
  }

  componentDidMount() {
    this.setUserName();
  }

  setUserName = () => {
    if (getLoggenInUserData() && !isEmpty(getLoggenInUserData())) {
      let userName = `${getLoggenInUserData().firstName} ${getLoggenInUserData().lastName}`
      this.setState({ userName })
    } else {
      this.setState({ userName: 'Guest' })
    }
  }

  launchImageLibraryForProfile = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Image::Response = ', response);

      if (response.didCancel) {
        console.log('Image::User cancelled image picker');
      } else if (response.error) {
        console.log('Image::ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('Image::User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('Image::responsee', JSON.stringify(response));
        const { assets } = response;
        console.log('Image::responsee Assets', assets);
        debugger
        if (assets.length > 0) {
          let parsedResPath = assets[0]
          this.setState({
            filePath: parsedResPath,
            fileData: parsedResPath.fileName,
            fileUri: parsedResPath.uri,
            editModal: false
          });
          //API Call for Profile Photo
          this.initAPICallforProfileImage(parsedResPath);
        }


      }
    });
  }

  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "MYAirports Camera Permission",
            message: "MYAirports needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.launchCameraForProfile();
        } else {
          Alert('Permission Denied')
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.launchCameraForProfile()
    }

  };


  launchCameraForProfile = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        const { assets } = response;
        console.log('Image::responsee Assets From Camera', assets);
        if (assets.length > 0) {
          let parsedResPath = assets[0]
          this.setState({
            filePath: parsedResPath,
            fileData: parsedResPath.fileName,
            fileUri: parsedResPath.uri,
            editModal: false
          });
          //API Call for Profile Photo
          this.initAPICallforProfileImage(parsedResPath);
        }
      }
    });

  }

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
            this.setState({ showerror: "Profile image uploaded successfully", success: true });
          },
          onError: (error) => {
            this.setState({ showerror: "Some error occured", success: false })
          }
        })
      })
      .catch(err => {
        this.setState({ showerror: "Something went wrong", success: false });
      });

  }

  renderProfileImage = (userdata) => {
    let imageURI = this.state.fileUri
      ? this.state.fileUri
      :userdata.userProfile.image;
      return (
        imageURI?<Image
          source={{uri:imageURI}}
          style={styles.profilePic}
        />:
        <Image
          source={require('../../assets/Images/MyProfile_Icon.png')}
          style={styles.profilePic}
        />
      )
   
  }

  renderSuccessToast = () => {
    setTimeout(() => {
      this.setState({showerror: null})
    }, 5000)
    return (
      <View style={{ marginTop: "4%", marginHorizontal: 16 }}>
        <ErrorInfo message={this.state.showerror} sucess={this.state.success} />
      </View>
    )
  }

  renderUserName = () => {
    const { userName } = this.state;
    return (
      <View
        style={{
          marginBottom: size(30),
          alignItems: "center",
        }}
      >
        <Text style={styles.helloTxt}>Hello</Text>
        <Text style={styles.generalTxt}>{userName.length > 15 ? userName.substring(0, 15) + "..." : userName}</Text>
      </View>
    )
  }

  render() {
    const { list, socialLinks, editModal, fileUri, list2, userName, list3 } = this.state;
    const { navigation } = this.props;
    return (
      <Wrapper>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientBox, { height: windowHeight / 3.3}]}
          colors={["rgb(48,22,51)", "rgb(216,11,99)"]}
        >
          <Pressable
            style={styles.backPressPos}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              source={require("../../assets/Images/BackArrow.png")}
              style={styles.backArrowGenral}
            />
          </Pressable>
          <Pressable
            style={styles.logoutTxt}
            onPress={() => {
              navigation.navigate("Logout");
            }}
          >
            <Text style={styles.helloTxt}>Logout</Text>
          </Pressable>
          {this.state.showerror ? this.renderSuccessToast() : null}
          {!this.state.showerror ? this.renderUserName() : null }

          <View style={styles.profileContainer}>
            <Pressable
              onPress={() => {
                this.setState({
                  editModal: true
                })
              }}
            >
              <Image
                source={require("../../assets/Images/Edit-Camera.png")}
                style={styles.profileUpdateicon}
              />
            </Pressable>
            <View>
            {this.renderProfileImage(this.props.SplashReducer)}
            </View>
            <Pressable
              onPress={() => this.props.navigation.navigate('Editprofile')}
            >
              <Image
                source={require("../../assets/Images/Edit-Profile.png")}
                style={styles.profileUpdateicon}
              />
            </Pressable>
          </View>
        </LinearGradient>
        <View style={{ backgroundColor: '#FBF7EF', zIndex: -9 }}>
          {/* <MarginTop top={size(85)} /> */}
          <MyProfileStyles.FlatlistContainer>
            <ScrollView style={{flex:1}}>
              <FlatList
                data={list}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <MyProfileStyles.IconViewContainerI>
                    <MAGeneralListItem item={item} onPressHandler={() => this.props.navigation.navigate(item.navigateTo)} />
                  </MyProfileStyles.IconViewContainerI>
                )}
                keyExtractor={(item, index) => index}
              // numColumns={3}
              />
              <FlatList
                data={list2}
                style={{marginTop: 35,marginHorizontal: 10}}
                scrollEnabled={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <MyProfileStyles.IconViewContainerI>
                    <MAGeneralListItem item={item} onPressHandler={() => this.props.navigation.navigate(item.navigateTo)} />
                  </MyProfileStyles.IconViewContainerI>
                )}
                keyExtractor={(item, index) => index}
              // numColumns={3}
              />
              <FlatList
                data={list3}
                style={{marginTop: 35, marginHorizontal: 10}}
                scrollEnabled={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <MyProfileStyles.IconViewContainerI>
                    <MAGeneralListItem item={item} onPressHandler={() => this.props.navigation.navigate(item.navigateTo)} />
                  </MyProfileStyles.IconViewContainerI>
                )}
                keyExtractor={(item, index) => index}
              // numColumns={3}
              />
            </ScrollView>
          </MyProfileStyles.FlatlistContainer>
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
                <Text style={[styles.loginTitle, { fontSize: size(25) }]}>
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
                <View
                  style={styles.flexWithjustifyCenter}
                >
                  <MarginTop top={size(-75)} />
                  <ButtonWithBackground
                    onPress={this.requestCameraPermission}
                    text={"USE CAMERA"}
                    extraTxtStyle={{}}
                  />
                  <MarginTop top={size(-25)} />
                  <ButtonWithBackground
                    onPress={this.launchImageLibraryForProfile}
                    text={"FROM ALBUM"}
                    extraTxtStyle={{}}
                  />
                  <MarginTop top={size(20)}/>
                  <TouchableOpacity onPress={()=>this.props.clearImage()}>
                  <Text style={styles.clear}>CLEAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.SplashReducer.loading,
    SplashReducer: state.SplashReducer,
  };
};

/**
 * Dispatch to Props
 */
const mapDispatchToProps = {
  postProfileImage: postProfileImage,
  clearImage:clearImage
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
