import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import {  View } from 'react-native';
import { commanStyle } from '../Common/style';

class ToggleSwitch extends React.Component{
    render(){
        return(
<View style={{width:'27%',marginLeft:85,marginTop:27}}>
<SwitchSelector
style={{marginLeft:15}}
  initial={this.props.isTrue ? 1 : 0}
  //onPress={value => this.setState({ gender: value })}
  height={35}
  borderWidth={0.85}
  borderRadius={50}
  textColor={'#000000'}
  selectedColor={'#ffffff'}
  buttonColor={'#ff3385'}
  borderColor={'#B31F84'}
  hasPadding
  options={[
    { label: "ON", value: "ON"},
    { label: "OFF", value: "OFF"}
  ]}
  testID="gender-switch-selector"
  accessibilityLabel="gender-switch-selector"
/>
 </View>
        )
    }
}
export default ToggleSwitch;