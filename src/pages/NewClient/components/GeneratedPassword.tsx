import classNames from "classnames";
import { GeneratedPasswordInputProps } from "../../../types/generatedPassFieldProps";
import { inputClasses, inputLabelClasses } from "../../Login/inputClases";
import { Tooltip } from "@material-tailwind/react";
import { Controller } from "react-hook-form";
import { HiPlusSmall } from "react-icons/hi2";

const GeneratedPassword = ({
  type,
  label,
  name,
  rules,
  errors,
  register,
  autofocus,
  tooltipText,
  control,
  handleGeneratePassword
}: GeneratedPasswordInputProps) => {
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

  return (
    <div className="flex items-center">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={() => (
          <>
            <input
              autoFocus={autofocus}
              {...register(name, rules)}
              type={type}
              id={name}
              className={classNames(inputClassDynamic)}
              placeholder=" "
            />
            <label htmlFor={name} className={classNames(labelClassDynamic)}>
              {label}
            </label>

            <Tooltip
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content={tooltipText}
            >
              <button
                type="button"
                className="absolute  right-2 text-gray-500 dark:text-gray-400"
                onClick={() => {
                  handleGeneratePassword()
                }}
              >
                <HiPlusSmall size={30}/>{" "}
              </button>
            </Tooltip>
          </>
        )}
      />
    </div>
  );
};

export default GeneratedPassword;
