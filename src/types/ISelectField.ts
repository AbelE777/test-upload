/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldErrors, UseFormRegister } from 'react-hook-form';
export interface ISelectField {
  label: string
  options: Array<string>
  name: string;
  errors:FieldErrors<any>
  register: UseFormRegister<any>;
  rules?:any;
  control:any
}