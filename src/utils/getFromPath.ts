import { Location } from "react-router-dom";

export const getFromPath = (location:Location) => {
  const from = location.state?.from?.pathname || "/";
  return from;
};
