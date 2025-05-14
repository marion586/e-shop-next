"use client";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageToState: (value: ImageType) => void;
  isProductCreated: boolean;
}

import { ImageType } from "@/types";
import React, { useCallback, useEffect, useState } from "react";

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  isProductCreated,
  addImageToState,
  removeImageToState,
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
      removeImageToState(item);
    }
  }, []);

  return <div></div>;
};

export default SelectColor;
