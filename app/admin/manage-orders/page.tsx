import Container from "@/app/component/Container";
import React from "react";
import ManageOrdersClient from "./ManageOrdersClient";

import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/component/NullData";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Ooops! Access denied" />;
  }
  return (
    <Container>
      {" "}
      <ManageOrdersClient orders={orders} />
    </Container>
  );
};

export default ManageOrders;
