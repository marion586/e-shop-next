import React from "react";
interface IParams {
  productId?: string;
}
const Product = ({ params }: { params: IParams }) => {
  console.log("Product ID:", params);
  return <div>Product</div>;
};

export default Product;
