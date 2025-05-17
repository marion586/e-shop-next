import React from "react";
import Container from "@/app/component/Container";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/component/NullData";
import OrderDetails from "./OrderDetails";

interface IParams {
  orderId?: string;
}
const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);
  if (!order) return <NullData title="Ooops! No Data" />;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
