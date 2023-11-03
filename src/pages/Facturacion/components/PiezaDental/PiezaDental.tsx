import React, { useState } from "react";
import "./PiezaDental.css";

type Position = "top" | "bottom";

const PiezaDental = ({
  numeroPieza,
  position,
  setPiezasTemporal,
  piezasTemporal
}: {
  numeroPieza: number;
  position: Position;
  setPiezasTemporal: React.Dispatch<React.SetStateAction<number[]>>,
  piezasTemporal:number[]
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e?.target?.checked) {
      const arr = [...piezasTemporal, numeroPieza]
      setPiezasTemporal(arr)
    }
    else {
      const totalPiezasCopy = [...piezasTemporal]
      const index = totalPiezasCopy.indexOf(numeroPieza);
      totalPiezasCopy.splice(index, 1)
      setPiezasTemporal(totalPiezasCopy)
    }
    setIsChecked(!isChecked)
  }

  return (
    <div className="checkbox-wrapper-61 relative overflow-hidden">
      <input
        checked={isChecked}
        onChange={handleChecked}
        type="checkbox"
        className="check invisible hidden"
        id={numeroPieza.toString()}
      />
      <label htmlFor={numeroPieza.toString()} className="label">
        {position === "top" && (
          <span
            className={`ml-4 ${isChecked ? "text-blue-500 font-bold" : "font-medium"}`}
          >
            {numeroPieza}
          </span>
        )}
        <svg width="45" height="45" viewBox="0 0 95 95">
          <rect
            x="30"
            y="20"
            width="50"
            height="50"
            stroke={isChecked ? "#0a8bf2" : "black"}
            fill="none"
          />
          <g transform="translate(0,-952.36222)">
            <path
              d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4 "
              stroke={isChecked ? "#2397f3" : "black"}
              strokeWidth="3"
              fill="none"
              className="path1"
            />
          </g>
        </svg>
        {position === "bottom" && (
          <span
            className={`ml-4 ${isChecked ? "text-blue-500 font-bold" : "font-medium"}`}
          >
            {numeroPieza}
          </span>
        )}
      </label>
    </div>
  );
};

export default PiezaDental;
