import { LoginInputProps } from "../../../types";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import classNames from "classnames";
import { inputClasses, inputLabelClasses } from "../inputClases";

const CustomInput = ({
  type,
  label,
  name,
  rules,
  register,
  errors,
  autofocus,
}: LoginInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const error = errors[name];
  const inputClassDynamic = [
    ...inputClasses,
    error ? "border-red-500" : "dark:border-slate-600",
    error ? "focus:border-red-500" : "focus:border-blue-300",
    error ? "dark:border-red-500" : "dark:focus:border-blue-300",
  ];

  const labelClassDynamic = [
    ...inputLabelClasses,
    error ? "peer-focus:text-red-500" : "peer-focus:text-blue-300",
    error ? "text-red-500" : "",
    error ? "dark:text-red-500" : "",
  ];
  // const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   let value = e.target.value;

  //   value = value
  //     .split(' ')
  //     .map((word) => {
  //       return word.charAt(0).toUpperCase() + word.slice(1);
  //     })
  //     .join(' ');

  //   e.target.value = value;
  // };

  if (type === "password") {
    return (
      <>
        <div className="flex items-center">
          <input
            autoFocus={autofocus}
            {...register(name, rules)}
            type={showPassword ? "text" : "password"}
            id={name}
            className={classNames(inputClassDynamic)}
            placeholder=" "
          />
          <label htmlFor={name} className={classNames(labelClassDynamic)}>
            {label}
          </label>

          <button
            type="button"
            className="absolute  right-2 text-gray-500 dark:text-gray-400"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEye size={28} />
            ) : (
              <AiOutlineEyeInvisible size={28} />
            )}{" "}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <input
        autoFocus={autofocus}
        {...register(name, rules)}
        autoComplete="off"
        type={type}
        id={name}
        className={classNames(inputClassDynamic)}
        placeholder=" "
        // onChange={(e)=>{
        //   if(capitalize)handleInputChange(e)
        // }}
      />
      <label htmlFor={name} className={classNames(labelClassDynamic)}>
        {label}
      </label>
    </>
  );
};

export default CustomInput;
