import { IconType } from "react-icons";


const RenderIcon = ({ icon, nameclass="h-5 w-5" }: { icon: IconType, nameclass?:string }) => {
  const Icon = icon;
  return <Icon className={nameclass} />;
};

export default RenderIcon