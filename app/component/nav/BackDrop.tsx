import React from "react";

interface BackDropProps {
  onClick: () => void;
}
const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="z-20 bg-slate-400 w-screen h-screen transition fixed top-0 left-0 opacity-20"
    ></div>
  );
};

export default BackDrop;
