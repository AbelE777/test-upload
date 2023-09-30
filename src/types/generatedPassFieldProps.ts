/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister, FieldErrors } from 'react-hook-form';
export interface GeneratedPasswordInputProps {
  type:string;
  label:string;
  name:string;
  autofocus:boolean;
  rules?:any;
  register: UseFormRegister<any>;
  errors:FieldErrors<any>;
  tooltipText?: string;
  defValue?: string;
  control?: any;
  handleGeneratePassword: any
}