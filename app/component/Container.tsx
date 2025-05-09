import React, { Children } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2">{children}</div>
  );
};

export default Container;
