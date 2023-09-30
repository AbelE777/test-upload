import { UseFormRegister } from 'react-hook-form';
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CheckProps {
  label:string;
  name:string;
  rules?:any;
  register: UseFormRegister<any>;
}