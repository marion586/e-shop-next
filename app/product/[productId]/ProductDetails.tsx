"use client";

import Button from "@/app/component/Button";
import ProductImage from "@/app/component/products/ProductImage";
import SetColor from "@/app/component/products/SetColor";
import SetQuantity from "@/app/component/products/SetQuantity";
import { productRating } from "@/utils/productRating";
import { Rating } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import Horizontal from "@/app/component/Horizontal";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";

import { useRouter } from "next/navigation";
interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  //client component is interactive and render in the server
  console.log(product, "product");
  console.log(product.images[0], "product images");
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const [isProductInCart, setIsProductInCart] = useState(false);
  console.log(cartProducts);

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);
  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity == 100) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity == 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl  font-medium to-slate-700"> {product.name} </h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating(product)} readOnly />
          <div> {product.reviews.length} reviews </div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>

        <div>
          <span className="font-semibold">CATEGORY:</span>
          <span>{product.category}</span>
        </div>

        <div>
          <span className="font-semibold">BRAND:</span>
          <span>{product.brand}</span>
        </div>

        <div
          className={`${product.inStock ? "text-teal-400 " : "text-rose-400"}`}
        >
          {product.inStock ? "In stock" : "Out of Stock"}
        </div>

        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-200 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span> Product added to Cart </span>
            </p>

            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            {" "}
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <Button
              small
              label="Add to Cart"
              onClick={() => handleAddProductToCart(cartProduct)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
