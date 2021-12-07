import React from 'react';
import {createContext, useState} from 'react';

export const SearchContext = createContext();

function SearchContextProvider({children}) {
  const [keyword, onChangeText] = useState('');

  return (
    <SearchContext.Provider value={{keyword, onChangeText}}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
