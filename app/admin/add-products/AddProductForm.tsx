"use client";

import Button from "@/app/component/Button";
import Heading from "@/app/component/Heading";
import CategoryInput from "@/app/component/inputs/CategoryInput";
import CustomCheckBox from "@/app/component/inputs/CustomCheckBox";
import Input from "@/app/component/inputs/Input";
import SelectColor from "@/app/component/inputs/SelectColor";
import TextArea from "@/app/component/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { ImageType, UploadedImageType } from "@/types";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/Colors";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { resolve } from "path";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState<Boolean>(false);
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "product data");
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }
    if (!data.images || data.images.length == 0) {
      setIsLoading(false);
      return toast.error("no selected images");
    }
    const handleImageUploads = async () => {
      toast("Creating product . please Wait..");

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("error uploading image", error);
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      } finally {
        setIsLoading(false);
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    console.log(productData);

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
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

      <Button
        label={isLoading ? "Loading ..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
