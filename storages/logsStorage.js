import AsyncStorage from '@react-native-community/async-storage';

const key = 'logs';

const logsStorage = {
  async get() {
    try {
      const raw = await AsyncStorage.get(key);
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (err) {
      throw new Error('Failed to load logs');
    }
  },
  async set(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      throw new Error('Failed to save logs');
    }
  },
};

export default logsStorage;
