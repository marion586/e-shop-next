import React from "react";
import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}
const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`${bg} ${color} px-1 h-full  rounded flex items-center gap-1 mt-3`}
    >
      <div className="flex items-center h-[30px] justify-center">
        {text} <Icon size={15} />
      </div>
    </div>
  );
};

export default Status;
