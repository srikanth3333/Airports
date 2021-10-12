import React from 'react';
import { ImageBackground, View,Image ,Text,StyleSheet, SafeAreaView,TouchableOpacity} from 'react-native';
//import { ImagePicker } from '../../Components/Comman';
//import ImagePicker from '../../Components/EditProfile/index';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from '../../assets/styles';
import { size } from '../../assets/size';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
    ButtonWithBackground,
    SafeView,
    AuthHeader,
    AuthCancel,
    AuthContainer,
    LightText,
    TextBoxWithBackground,
    MarginTop,
    DropDowns,
    KeyboardAvoidingView,
    ProfileContainer,
    DropDownsGEnder,
    CameraEditContainer
  } from '../../components/Common/index';
  class EditPhotScreen extends React.Component{
      render(){
          return(
              <SafeView>
                <CameraEditContainer>  
          <KeyboardAwareScrollView>
          <AuthCancel
              navigation={this.props.navigation}
              title={
                <Text style={styles.LoginTitle}>
                  <LightText text={"Edit"}/>
                  {" Photo"}
                </Text>
              }
            />
          
          <ButtonWithBackground onPress={() => this.props.navigation.navigate("")} text={"USE CAMERA"} />
          <ButtonWithBackground onPress={() => this.props.navigation.navigate("")} text={"FROM ALBUM"} />
          <Text style={styles.editCameraTitle}>
                  <LightText text={""} />
                  {" CLEAR"}
                </Text>
                 
          </KeyboardAwareScrollView>
          </CameraEditContainer>  
        </SafeView>
          )
      }
  }
  export default EditPhotScreen;