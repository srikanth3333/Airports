import React, { PureComponent } from 'react';
import {  Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Splash from '../screens/Auth/splash';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import SignupEntry from '../screens/Auth/SignUpEntry';
import SignUp from '../screens/Auth/SignUp';
import EmailVerification from '../screens/Auth/EmailVerification';
import { TabStack } from './app-navigatior';
import General from '../screens/General';

const Stack = createStackNavigator();
const { height, width } = Dimensions.get('window');
function AuthStack(){
  return(
    <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="SignupEntry" component={SignupEntry}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen name="General" component={General} />
        <Stack.Screen name="EmailVerification" component={EmailVerification}/>
    </Stack.Navigator>
  )
}
export default AuthStack;
