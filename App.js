/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogContextProvider} from './contexts/LogContext';
import SearchContextProvider from './contexts/SearchContext';
import RootStack from './screens/RootStack';

function App() {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <LogContextProvider>
          <RootStack />
        </LogContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
}

export default App;
