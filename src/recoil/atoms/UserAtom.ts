import { atom } from "recoil";

type UserStateType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: null | any,
  isAdmin: null | any,
  access_token: null | string
}

export const userState = atom<UserStateType>({
  key: 'userState',
  default: {
    user: JSON.parse(localStorage.getItem('user_data')!) || null,
    isAdmin: JSON.parse(localStorage.getItem('is_admin')!) || null,
    access_token: localStorage.getItem('access_token') || null
  }
})