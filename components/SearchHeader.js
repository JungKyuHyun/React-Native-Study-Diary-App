import React, {useContext} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {SearchContext} from '../contexts/SearchContext';

function SearchHeader() {
  const {width} = useWindowDimensions();
  const {keyword, onChangeText} = useContext(SearchContext);

  return (
    <View style={[styles.block, {width: width - 32}]}>
      <TextInput
        value={keyword}
        onChangeText={onChangeText}
        placeholder="검색어!!"
        style={styles.input}
        autoFocus
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => onChangeText('')}>
        <Icon name="cancel" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
  },
});

export default SearchHeader;
