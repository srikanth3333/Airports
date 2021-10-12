 import I18n from 'i18n-js';
 import * as RNLocalize from 'react-native-localize';
 import en from './en';
 import cn from './cn';
import bm from './bm';
 /*
  * Setting Language
  */
 
 const locales = RNLocalize.getLocales();
 
 if (Array.isArray(locales)) {
   I18n.locale = 'en'; //locales[0].languageTag;
 }
 

 I18n.fallbacks = true;
 
 I18n.translations = {
   en: en,
   cn:cn,
   bm:bm
 };
 
 export default I18n;
 