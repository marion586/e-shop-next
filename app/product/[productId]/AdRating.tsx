"use client";
import Heading from "@/app/component/Heading";
import Input from "@/app/component/inputs/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import Button from "@/app/component/Button";
interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        Order: Order[];
      })
    | null;
}

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const AdRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating == 0) {
      setIsLoading(false);
      return toast.error("No rating selected");
    }
    const ratingData = {
      ...data,
      user: user,
      useId: user?.id,
      product: product,
    };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating submitted");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (!user || !product) return null;
  const deliverdOrder = user?.Order.some(
    (order) =>
      order.products.find((item) => item.id == product.id) &&
      order.deliveryStatus == "delivered"
  );

  const userReview = product.reviews.find((review: Review) => {
    return review.userId == user.id;
  });

  if (userReview || !deliverdOrder) return null;
  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />

      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        label={isLoading ? "Loading" : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AdRating;
