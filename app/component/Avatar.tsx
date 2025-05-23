import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="avatar"
        className=" rounded-full"
        height={30}
        width={30}
      />
    );
  }

  return <FaUserCircle className="text-slate-400" />;
};

export default Avatar;
