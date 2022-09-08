import React, { useEffect, useState } from "react";
import { Range as ReactRange } from "react-range";
import { getTrackBackground, Direction } from "react-range";
interface IRangeProps {
  values: number[];
  defaultValues?: number[];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (values: number[]) => void;
}
const Range: React.FC<IRangeProps> = ({
  values,
  defaultValues = [0.2, 0.5],
  min = 0,
  max = 1,
  step = 0.1,
  onChange = () => {},
}) => {
  return (
    <ReactRange
      step={step}
      allowOverlap={true}
      min={min}
      max={max}
      values={values || defaultValues}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className="rounded-full"
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            position: "relative",
            background: values.length > 1 ? "#cbd5e1" : undefined,
            backgroundImage:
              values.length <= 1
                ? getTrackBackground({
                    min: min,
                    max: max,
                    values: values,
                    colors: ["#818cf8", "#cbd5e1"],
                  })
                : undefined,
          }}
        >
          <div
            className="absolute inset-0 bg-indigo-400 h-full"
            style={{
              width: `${
                ((Math.max(...values) - Math.min(...values)) / (max - min)) *
                100
              }%`,
              marginLeft: `${
                ((Math.min(...values) - min) / (max - min)) * 100
              }%`,
            }}
          />
          {children}
        </div>
      )}
      renderThumb={({ props, index }) => (
        <div
          {...props}
          className="bg-transparent grid place-items-center"
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            // backgroundColor: `${index === 0 ? "#999" : "#495"}`,
          }}
        >
          <div className="w-5 h-5 rounded-full bg-indigo-600"></div>
        </div>
      )}
    />
  );
};

export default Range;
