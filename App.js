/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Platform, StatusBar} from 'react-native';
import Router from './src/navigation';
import {ThemeProvider} from 'styled-components';
import theme from './src/themes/index';
import store, {initializeStore} from './src/store/configureStore';
import {Provider} from 'react-redux';

class App extends React.Component{
  async componentDidMount(){
    initializeStore();
  }
  render(){
    return(
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={Platform.OS == 'android' ? "light-content" : "dark-content"} backgroundColor="#000000" />
        <Router />
      </ThemeProvider>
    </Provider>
    )
  }
}
export default App;
