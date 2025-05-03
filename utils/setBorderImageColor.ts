import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";

export const setBorderImageColor = (
  cartProduct: CartProductType,
  image: SelectedImgType
) => {
  return cartProduct.selectedImg.color == image.color
    ? "border-[1.5px]"
    : "border-none";
};
