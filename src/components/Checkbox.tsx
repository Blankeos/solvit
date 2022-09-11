import React from "react";
import { BsCheck as CheckIcon } from "react-icons/bs";

interface ICheckboxProps {
  htmlFor: string;
  /** `checked` is the current state */
  checked: boolean;
  /** @param `checked` is the nextState after this button is pressed */
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  onChange,
  htmlFor,
  checked,
  disabled = false,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="relative flex-none h-7 w-7 grid place-items-center cursor-pointer"
    >
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        id={htmlFor}
        className="check-box bg-gray-300 transition duration-150 relative appearance-none w-7 h-7 rounded cursor-pointer disabled:opacity-50"
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <CheckIcon
        className="check-icon absolute text-white text-opacity-40 transition transform scale-75 ease-out duration-200"
        size="1.4rem"
      />
    </label>
  );
};

export default Checkbox;
