import { HiSun, HiMoon } from "react-icons/hi2";
import { useDarkMode } from "../../hooks";

const DarkToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="p-4 mx-auto">
      <div
        className={`relative w-14 h-8 bg-gray-700 rounded-full cursor-pointer transition-transform ${
          darkMode ? "bg-slate-500" : "bg-slate-400"
        }`}
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform flex justify-center items-center ${
            darkMode ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {darkMode ? (
            <HiMoon className="text-gray-800" />
          ) : (
            <HiSun className="text-yellow-700" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkToggle;
