import "flatpickr/dist/themes/material_blue.css";

import Flatpickr from "react-flatpickr";
import { Controller } from "react-hook-form";
import { IDatePickerFieldProps } from "../../types";
import { FormErrorMessage } from "..";

const DatePicker = ({ label, name, control }: IDatePickerFieldProps) => {
  const options = {
    dateFormat: "Y-m-d",
    maxDate: "today",
  };
  return (
    <div>
      <p>{label}</p>
      <Controller
        rules={{ required: "Este campo es obligatorio" }}
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Flatpickr
              options={options}
              onChange={(e: Array<Date>) => {
                field.onChange(new Date(e[0]));
              }}
              className={`${
                fieldState.invalid ? "dark:border-red-500 border-red-500" : ""
              } dark:bg-gray-900 dark:border-gray-300 border-gray-300 cursor-pointer text-center border-2 rounded-full p-2 w-full focus:border-blue-500 outline-none dark:text-gray-100 text-gray-900`}
            />
            {fieldState.invalid && (
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            )}
          </>
        )}
      />
    </div>
  );
};

export default DatePicker;
