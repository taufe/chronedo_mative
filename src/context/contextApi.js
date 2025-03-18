// /context/DataContext.js
import { createContext, useContext, useState } from 'react';

// Create Context
const DataContext = createContext();

// DataProvider component
export const DataProvider = ({ children }) => {
 

  return (
    <DataContext.Provider value={{  }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use DataContext
export const useData = () => useContext(DataContext);
