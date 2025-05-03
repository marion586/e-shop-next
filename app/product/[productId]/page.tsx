import React from "react";
import Container from "@/app/component/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";
interface IParams {
  productId?: string;
}
const Product = ({ params }: { params: IParams }) => {
  console.log("Product ID:", params);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />

        <div className="flex">
          <div> Add Rating </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
