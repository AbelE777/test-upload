import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoginPasswordInputProps } from "../../../types";

const PasswordInput = ({ label, name }: LoginPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          id="floating_outlined_password"
          className="tracking-widest border-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-slate-700 focus:outline-none focus:ring-0 focus:border-sky-500 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_outlined_password"
          className="tracking-widest absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-sky-500 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
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
    
  )
}

export default PasswordInput