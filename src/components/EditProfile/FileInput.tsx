import { FieldErrors, UseFormRegister } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputFileProps {
  label:string;
  name:string;
  rules?:any;
  register: UseFormRegister<any>;
  errors:FieldErrors<any>;
}

const FileInput = ({ label, name, rules, register, errors }:InputFileProps) => {
  
  return (
    <>
      <input
        {...register(name, rules)}
        autoComplete="off"
        type="file"
        accept=".jpg, .jpeg, .png"
        id={name}
        className={`hidden`}
        // onChange={(e)=>{
        //   if(capitalize)handleInputChange(e)
        // }}
      />
      <label htmlFor={name}>
        {label}
      </label>
    </>
  );
};

export default FileInput;
