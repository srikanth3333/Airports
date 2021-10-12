import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './app-navigatior';
// import Splash from '../screens/Auth/splash';
import AuthStack from './auth-navigation';
import { AuthContext } from '../utils/constants';
import { getLoginStatus } from '../storage/reduxStore';
import { store } from "../store/configureStore";
import AsyncStorage from '@react-native-community/async-storage';

function Router() {
  const [show, setShow] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isGuest, setGuest] = useState(false);

useEffect(() => {
  checkLoginStatus();
}, [checkLoginStatus])

const checkLoginStatus = async () => {
  let isUserLoggedIn = await AsyncStorage.getItem('isLoggedIn')
  // console.log('dhgdhdhdghdg', isUserLoggedIn)
  isUserLoggedIn !== null && isUserLoggedIn == 'true' ? setLogin(true) : setLogin(false);
}

return (
    <AuthContext.Provider
       value={{show, setShow,isLogin, setLogin}}
     >
    <NavigationContainer>
      {
        isLogin ?
        <AppStack/>
        :
        <AuthStack/>
      }


    </NavigationContainer>
  </AuthContext.Provider>
);
}

export default Router;