"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import React from "react";
import Image from "next/image";

import { setBorderImageColor } from "@/utils/setBorderImageColor";
interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h[300px]  sm:min-h[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative w-[80%] aspect-square rounded border-teal-300  ${setBorderImageColor(
                cartProduct,
                image
              )}`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      <div className="col-span-5 relative aspect-square">
        <Image
          fill
          className="w-full h-full object-container"
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
        />
      </div>
    </div>
  );
};

export default ProductImage;
