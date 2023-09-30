// recoil/atoms/authenticationAtom.ts

import { atom } from 'recoil';

const isAuthenticated = localStorage.getItem('is_authenticated') === 'true' ? true: false

export const isAuthenticatedState = atom({
  key: 'isAuthenticatedState',
  default: isAuthenticated
});
