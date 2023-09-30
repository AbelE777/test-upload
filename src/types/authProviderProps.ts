/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AuthProviderProps {
  children: JSX.Element[] | JSX.Element 
}

type authType = {
  user: any
}
export interface AuthContextType {
  auth:authType,
  setAuth: any
}