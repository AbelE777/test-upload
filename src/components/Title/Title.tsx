import classNames from "classnames";

interface Props {
  size: string;
  children: string;
  color: string;
  position: string;
}

const Title = ({ size, color, children, position }: Props) => {
  const fontSizeClasses = classNames({
    "text-xs": size === "small",
    "text-base": size === "medium",
    "text-2xl": size === "large",
  });
  const fontPosition = classNames({
    "justify-start": position === "left",
    "justify-center": position === "center",
    "justify-end": position === "right",
  });

  let colorClasses = ``;
  colorClasses = `text-${color}`;

  return (
    <h1
      className={`mx-5 md:mx-20 md:justify-normal justify-center dark:text-gray-100 mt-4 flex font-bold ${fontPosition} ${fontSizeClasses} ${colorClasses}`}
    >
      {children}
    </h1>
  );
};

export default Title;
