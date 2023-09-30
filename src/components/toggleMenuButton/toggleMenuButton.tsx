import { HiMiniChevronDoubleRight } from "react-icons/hi2";

interface Props {
  handleToggleSidenav:() => void;
  isSidenavOpen: boolean
}

const ToggleMenuButton = ({handleToggleSidenav, isSidenavOpen}:Props) => {
  return (
    <button
      className="p-2 rounded-full block bg-indigo-500 dark:bg-white dark:border dark:border-gray-300 outline-none text-white dark:text-black"
      onClick={handleToggleSidenav}
    >
      <HiMiniChevronDoubleRight
        className={`transition-transform ${isSidenavOpen ? "rotate-180" : ""}`}
        size={22}
      />
    </button>
  );
};

export default ToggleMenuButton;
