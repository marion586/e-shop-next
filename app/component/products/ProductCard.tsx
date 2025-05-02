"use client";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
interface ProductCardProps {
  data: any;
}
import React from "react";

import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const productRating =
    data.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / data.reviews.length;
  return (
    <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounder-sm p-2 transition hover:scale-105 text-center text-sm">
      <div className="flex flex-col  items-center w-full gap-2">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.images[0].image}
            alt="Product Image"
            className="object-contain"
          />
        </div>
        <div>{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>
          {data.reviews.length > 0 ? (
            <span className="text-yellow-400">
              {data.reviews[0].rating}
              <span className="text-slate-400">/5</span>
            </span>
          ) : (
            <span className="text-slate-400">No reviews yet</span>
          )}
        </div>

        <div className="text-lg font-bold text-slate-800">
          {formatPrice(data.price)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
