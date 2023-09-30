/* eslint-disable @typescript-eslint/no-explicit-any */
import  { createContext, useState } from 'react';
import {  AuthProviderProps } from '../../types';

export const AuthContext = createContext<any>(undefined);


export const AuthProvider = ({ children }:AuthProviderProps ) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
