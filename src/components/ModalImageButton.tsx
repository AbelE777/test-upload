import { Button } from "@material-tailwind/react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  text: string;
  handleClick: () => void;
  iconColor?: string;
}

const ModalImageButton = ({ icon, text, handleClick, iconColor }: Props) => {
  const Icon = icon;

  return (
    <Button variant="gradient" color="white" size="sm" onClick={handleClick} className="dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <Icon size={30} className={`dark:text-gray-100 ${iconColor?iconColor:""}`} />
        <span className="mt-2 dark:text-gray-100">{text}</span>
      </div>
    </Button>
  );
};

export default ModalImageButton;
