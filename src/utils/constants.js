import { Dimensions, Platform } from "react-native";
import moment from 'moment'
import * as React from 'react';

export const AuthContext = React.createContext();
export const MenuContext = React.createContext();
/**
 * Constant containing device's window height
 */
export const windowHeight = Dimensions.get("window").height;

/**
 * Constant containing device's window width
 */
export const windowWidth = Dimensions.get("window").width;

/**
 * Constant to check if device OS is Android
 */
export const IS_ANDROID = Platform.OS === "android";

/**
 * Constant to check if device OS is iOS
 */
export const IS_IOS = Platform.OS === "ios";

/**
 * Constant for data to configure for showing and Filtering in Algolia
 */

export const  localizeDate = (date) => {
    return moment.utc(moment(date).subtract('8', 'hours').format("YYYY-MM-DD HH:mm:ss")).local()
}

export const FLIGHT_LIMIT = 100





