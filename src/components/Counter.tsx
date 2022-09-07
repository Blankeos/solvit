import React, { useEffect, useState } from "react";

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
      <div>{count}</div>
      <div className="flex flex-col">
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default Counter;
