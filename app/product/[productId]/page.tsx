import React from "react";
import Container from "@/app/component/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

products;

interface IParams {
  productId?: string;
}
const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />

        <div className="flex flex-col mt-20 gap-4">
          <div> Add Rating </div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
