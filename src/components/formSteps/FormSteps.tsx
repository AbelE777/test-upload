import React from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

export default function FormSteps() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full px-24 py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        className="content-center"
        lineClassName="bg-indigo-100"
        activeLineClassName="bg-indigo-500"
      >
        <Step
          onClick={() => setActiveStep(0)}
          className={activeStep === 0 ? "!bg-indigo-700" : "!bg-indigo-200"}
        >
          <HiOutlineUser className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            {activeStep === 0 && (
              <>
                <Typography
                  variant="h6"
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                >
                  Paso 1
                </Typography>
                <Typography
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Elije Dr/Dra.
                </Typography>
              </>
            )}
          </div>
        </Step>
        <Step
          onClick={() => setActiveStep(1)}
          className={activeStep === 1 ? "!bg-indigo-700" : "!bg-indigo-200"}
        >
          <HiOutlineCog className="h-5 w-5 text-white" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            {activeStep === 1 && (
              <>
                <Typography
                  variant="h6"
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                >
                  Paso 2
                </Typography>
                <Typography
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Detalla el servicio
                </Typography>
              </>
            )}
          </div>
        </Step>
        <Step
          onClick={() => setActiveStep(2)}
          className={activeStep === 2 ? "!bg-indigo-700" : "!bg-indigo-200"}
        >
          <HiOutlineBuildingOffice2 className="h-5 w-5 text-white" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            {activeStep === 2 && (
              <>
                <Typography
                  variant="h6"
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                >
                  Paso 3
                </Typography>
                <Typography
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Factura
                </Typography>
              </>
            )}
          </div>
        </Step>
      </Stepper>

      {activeStep === 0 && <p>Hola mundo paso 1</p>}
      {activeStep === 1 && <p>Hola mundo paso 2</p>}
      {activeStep === 2 && <p>Hola mundo paso 3</p>}

      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
