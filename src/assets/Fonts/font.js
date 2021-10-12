import {Platform, PixelRatio} from 'react-native';
import {windowHeight} from '../../utils/constants';
const DEFAULT_RESIZE_SCREEN = Platform.OS === 'ios' ? 812 : 667;

export function fontResize(fontSize, screenSize) {
  let scale = windowHeight / DEFAULT_RESIZE_SCREEN;
  if (Platform.OS === 'ios' && windowHeight <= 812) {
    scale = 1;
  }
  const newSize = fontSize * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0.5;
  }
}

export function RA(size, screenSize) {
  let scale = windowHeight / DEFAULT_RESIZE_SCREEN;
  if (Platform.OS === 'ios' && windowHeight <= 812) {
    scale = 1;
  }
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0.5;
  }
}


export const fonts = {
  OpenSansBold: "OpenSans-Bold",
  OpenSansLight: "OpenSans-Light",
  OpenSansRegular: "OpenSans-Regular",
  CenturyGothicRegular: "CenturyGothic-Regular",
  CenturyGothicBold: "CenturyGothic-Bold",
  MontserratBold: "Montserrat-Bold",
  MontserratRegular: "Montserrat-Regular",
  MontserratItalic: "Montserrat-Italic"
};
