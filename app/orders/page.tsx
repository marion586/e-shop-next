import Container from "@/app/component/Container";
import React from "react";

import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/component/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserIdd";
import OrdersClient from "./OrdersClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Ooops! Access denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }
  return (
    <Container>
      {" "}
      <OrdersClient orders={orders} />
    </Container>
  );
};

export default Orders;
