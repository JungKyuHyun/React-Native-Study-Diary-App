import {Platform} from 'react-native';

export class EnvUtils {
  static #OS = Platform.OS;

  static isIos() {
    return this.#OS === 'ios';
  }
  static isAndroid() {
    return this.#OS === 'android';
  }
}
