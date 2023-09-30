import { UseFormRegister, FieldErrors } from 'react-hook-form';
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginInputProps {
  type:string;
  label:string;
  name:string;
  autofocus:boolean;
  rules?:any;
  register: UseFormRegister<any>;
  capitalize?:boolean;
  errors:FieldErrors<any>;
}
export interface LoginPasswordInputProps {
  label:string;
  name:string;
  rules?:any;
  register: UseFormRegister<any>;
  errors:FieldErrors<any>
}