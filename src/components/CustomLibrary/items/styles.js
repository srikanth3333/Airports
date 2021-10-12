import { StyleSheet, I18nManager } from 'react-native';


export default StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderRadius: 0,
    justifyContent: I18nManager.isRTL? 'flex-end':'flex-start',
    flexDirection:I18nManager.isRTL?'row-reverse':'row',
  },
});