import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

interface ICounter {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const Counter: React.FC<ICounter> = ({
  defaultValue = 0,
  min = 0,
  max = 10,
  step = 1,
  onChange = () => {},
}) => {
  const [count, setCount] = useState<number>(defaultValue);
  function handleIncrement() {
    setCount((prev) => {
      let newCount = prev + step;
      if (newCount > max) return prev;
      return newCount;
    });
  }
  function handleDecrement() {
    setCount((prev) => {
      let newCount = prev - step;
      if (newCount < min) return prev;
      return newCount;
    });
  }
  useEffect(() => {
    onChange(count);
  }, [count]);
  return (
    <div className="flex">
      <button
        onClick={handleDecrement}
        className="bg-indigo-600 text-white w-8 rounded"
      >
        -
      </button>
      <div className="w-10 h-8 grid place-items-center">{count}</div>
      <button
        onClick={handleIncrement}
        className="bg-indigo-600 text-white w-8 rounded"
      >
        +
      </button>
    </div>
  );
};

export default Counter;

{
  /* <NumberFormat
          value={count}
          defaultValue={defaultValue}
          isAllowed={(values) => {
            const { floatValue } = values;
            if (floatValue) {
              if (floatValue < min) return false;
              if (floatValue > max) return false;
              console.log("reached true");
              return true;
            }
            return false;
          }}
        /> */
}
