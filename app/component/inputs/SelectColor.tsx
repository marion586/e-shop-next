"use client";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

import { ImageType } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  isProductCreated,
  addImageToState,
  removeImageFromState,
}) => {
  const [isSelectected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
    if (!e.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, []);

  return (
    <div className="grid grid-cols-1  overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          type="checkbox"
          id={item.color}
          checked={isSelectected}
          onChange={handleCheck}
          className="cursor-Pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>

      <>
        {isSelectected && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
            {file && (
              <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                <p>{file?.name}</p>

                <div className="w-[70px]">
                  <Button
                    label="Cancel"
                    onClick={() => {
                      setFile(null);
                      removeImageFromState(item);
                    }}
                    small
                    outline
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
