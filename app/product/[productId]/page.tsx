import React from "react";
import Container from "@/app/component/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/component/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdRating from "./AdRating";

interface IParams {
  productId?: string;
}
const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = (await getCurrentUser()) ?? (null as any);
  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />

        <div className="flex flex-col mt-20 gap-4">
          <AdRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
