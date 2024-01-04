import { IconType } from "react-icons";

export interface ISidebarItem {
  id: string;
  text: string;
  icon: IconType;
  iconImg?: string;
  sufixValue?: number | null;
  to: string | null;
}

export interface IAccordionOptions {
  id: string;
  open?: number;
  text: string;
  leftIcon: IconType;
  rightIcon: IconType;
  to: string | null;
  subOptions: { icon: IconType; id: string; text: string; to: string }[];
}
