import { RecoilRoot } from "recoil";

const RecoilProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
