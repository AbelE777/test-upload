import { Input } from "@material-tailwind/react";
import { createElement } from "react";
import { IconType } from 'react-icons';


type Props = {
  info: {
    label: string;
    value: string | undefined;
    icon: IconType;
}[]
};

const DataReadOnly = ({ info }: Props) => {
  
  const clases = "dark:text-gray-100 cursor-not-allowed"

  
  return (
    <section className={`md:w-4/5 md:mx-auto my-10`}>
      <div className="w-full block">
        {info?.map((data_, idx) => (
          <div key={idx} className="w-full mb-4">
            <Input
              readOnly
              color="blue"
              size="lg"
              crossOrigin="true"
              label={data_.label}
              icon={createElement(data_.icon, {
                className:"h-5 w-5 text-blue-gray-600"
              })}
              value={data_.value || ""}
              className={clases}
            />
        </div>
        ))}

        {/* <div className="w-full mb-4">
          <Input
            readOnly
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Correo"
            icon={<HiMiniAtSymbol className="h-5 w-5 text-blue-gray-600" />}
            value={email || ""}
            type="email"
            className={clases}
          />
        </div> */}
      </div>
      {/* <div className="w-full block md:flex gap-3">
        <div className="mb-4 w-full">
          <Input
            readOnly
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Teléfono"
            icon={
              <HiMiniDevicePhoneMobile className="h-5 w-5 text-blue-gray-600" />
            }
            value={telefono || ""}
            type="number"
            className={clases}
          />
        </div>
      </div> */}
    </section>
  );
};

export default DataReadOnly;
