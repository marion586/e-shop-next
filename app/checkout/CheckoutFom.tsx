"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Heading from "../component/Heading";
import Button from "../component/Button";

interface CheckoutFomProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutFom: React.FC<CheckoutFomProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();

  const stripe = useStripe();

  const elements = useElements();

  const [isLoading, setIsLoading] = React.useState(false);

  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) return;

    if (!clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          console.log(result.error.message);
          toast.error("Checkout failed");
          setIsLoading(false);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            toast.success("Checkout success");
            handleSetPaymentSuccess(true);
            handleClearCart();
            handleSetPaymentIntent(null);
          }
        }
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb">
        <Heading title="Enter your details to complete checkout" />
      </div>

      <h2 className="font-semibold  mb-2"> Payment Information</h2>

      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "KE"] }}
      />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
          paymentMethodOrder: ["card"],
        }}
      />

      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total : {formattedPrice}
      </div>

      <Button
        label={isLoading ? "Processing..." : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutFom;
