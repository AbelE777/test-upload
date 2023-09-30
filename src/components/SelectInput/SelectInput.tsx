import { Select, Option } from "@material-tailwind/react";
import { ISelectField } from "../../types";
import { Controller } from "react-hook-form";
import { FormErrorMessage } from "..";

export default function SelectInput({
  name,
  label,
  options,
  control,
}: ISelectField) {
  return (
    <div className="mx-5">
      <Controller
        name={name}
        control={control}
        rules={{ required: "Este campo es obligatorio" }}
        render={({ fieldState, field }) => (
          <>
            <Select
              error={fieldState.invalid}
              label={label}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              variant="standard"
              name={name}
              onChange={(e) => {
                field.onChange(e);
              }}
              className="dark:text-gray-300 text-gray-700"
            >
              {options.map((option, idx) => {
                let value = "";
                if (name === "rol") {
                  value = option
                } else value = option.replace("$", "");
                return (
                  <Option value={value} key={idx}>
                    {option === "1"
                      ? "Admin"
                      : option === "2"
                      ? "Empleado"
                      : `${option}`}
                  </Option>
                );
              })}
            </Select>
            {fieldState.invalid && (
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            )}
          </>
        )}
      />
    </div>
  );
}
