"use client";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import { ImageType } from "@/types";

interface SelectImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({
  item,
  handleFileChange,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center"
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p> {item?.color} Image </p>
      )}
    </div>
  );
};

export default SelectImage;
