import {Platform} from 'react-native';

export class EnvUtils {
  static isIos() {
    return Platform.OS === 'ios';
  }
  static isAndroid() {
    return Platform.OS === 'android';
  }
}
