import React, { useState } from "react";

interface ISwitch {
  defaultValue?: boolean;
}
const Switch: React.FC<ISwitch> = ({ defaultValue = false }) => {
  const [state, setState] = useState<boolean>(defaultValue);
  return <div>Switch</div>;
};

export default Switch;
