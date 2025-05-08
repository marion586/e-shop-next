"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "../component/Heading";
import Button from "../component/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount, cartTotalQty } =
    useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-2xl">Your cart is empty</span>

        <div>
          <Link
            href="/"
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />

      <div className="mt-8 grid grid-cols-5 text-xs gap-4 pb-2 items-center">
        <div className="col-span-2 justify-self-start">Product</div>

        <div className="justify-self-center">Price</div>

        <div className="justify-self-center">Quantity</div>

        <div className="justify-self-end">Total</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>

      <div className="border-t-[1.5px] border-slate-300 mt-4 pt-4 flex items-center justify-between">
        <div className="w-[90px]">
          <Button
            small
            outline
            label="Clear Cart"
            onClick={() => handleClearCart()}
          />
        </div>

        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold items-center gap-2">
            <span>Subtotal</span>
            <span> {formatPrice(cartTotalAmount)} </span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculate at checkout
          </p>

          <Button
            label={currentUser ? "Checkout" : "Login to checkout"}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />
          <Link
            href="/"
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
