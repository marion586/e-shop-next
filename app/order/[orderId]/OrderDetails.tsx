"use client";

import Heading from "@/app/component/Heading";
import Status from "@/app/component/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const router = useRouter();
  return (
    <div className="max-w-[1150px] m-aut flex flex-col  gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>

      <div className="">Order ID:{order.id}</div>

      <div className="">
        Total Amount :{" "}
        <span className="font-bold"> {formatPrice(order.amount)} </span>
      </div>

      <div className="flex gap-2 items-center">
        <div>Payment status</div>

        <div className="">
          {order.status == "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status == "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div>Delivery status</div>

        <div className="">
          {order.deliveryStatus == "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus == "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus == "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>Date : {moment(order.createdAt).fromNow()}</div>

      <div>
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 items-center pb-2">
          <div className="col-span-2 justify-self-start">PRODUCT</div>

          <div className="justify-self-center">PRICE</div>

          <div className=" justify-self-center">QTY</div>

          <div className="justify-self-end">TOTAL</div>
        </div>

        {order.products &&
          order.products.map((item) => (
            <OrderItem key={item.id} item={item}></OrderItem>
          ))}
      </div>
    </div>
  );
};

export default OrderDetails;
