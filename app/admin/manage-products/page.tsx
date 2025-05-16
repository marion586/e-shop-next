import Container from "@/app/component/Container";
import React from "react";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/component/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Ooops! Access denied" />;
  }
  return (
    <Container>
      {" "}
      <ManageProductsClient products={products} />
    </Container>
  );
};

export default ManageProducts;
