"use client";

import Heading from "@/app/component/Heading";
import CategoryInput from "@/app/component/inputs/CategoryInput";
import CustomCheckBox from "@/app/component/inputs/CustomCheckBox";
import Input from "@/app/component/inputs/Input";
import SelectColor from "@/app/component/inputs/SelectColor";
import TextArea from "@/app/component/inputs/TextArea";
import { ImageType } from "@/types";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/Colors";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState<Boolean>(false);

  console.log("images====>>", images);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter((item) => item.color != value.color);
        return filteredImages;
      }
      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Add product" center />
      <>
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
        />

        <Input
          id="brand"
          label="Brand"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <TextArea
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <CustomCheckBox
          id="inStock"
          register={register}
          label="This product is in stock"
        />
      </>

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label == "All") {
              return null;
            }
            return (
              <div key={item.label}>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category == item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available product colors and upload their images.
          </div>

          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            enim impedit eum perferendis ex rerum.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
