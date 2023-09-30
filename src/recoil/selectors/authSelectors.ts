
import { selector } from 'recoil';
import { userState, isAuthenticatedState, isLoadingState } from '../atoms';

export const currentUserSelector = selector({
  key: 'currentUserSelector',
  get: ({ get }) => get(userState),
});

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => get(isAuthenticatedState),
});

export const isLoadingSelector = selector({
  key: 'isLoadingSelector',
  get: ({ get }) => get(isLoadingState),
});
