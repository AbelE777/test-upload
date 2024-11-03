import { infinity } from "ldrs";

infinity.register();

interface Props {
  loadingMessage?: string
}

const CustomSpinner = ({loadingMessage}: Props) => {
  return (
    <div
      className="fixed inset-0 bg-black flex items-center z-50 h-screen"
      style={{
        opacity: "0.83",
      }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        role="status"
      >
        <l-infinity
          size="55"
          stroke="5"
          stroke-length="0.15"
          bg-opacity="0.07"
          speed="0.6"
          color="white"
        ></l-infinity>
        {loadingMessage && <p className="text-white">{loadingMessage}</p>}
      </div>
    </div>
  );
};

export default CustomSpinner;
