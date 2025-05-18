"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { set } from "react-hook-form";
import CheckoutForm from "./CheckoutFom";
import Button from "../component/Button";

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const router = useRouter();
  useEffect(() => {
    //create a payment intent as soon as the page loads

    console.log("mandeha ny itent ");
    if (cartProducts) {
      setLoading(true);
      setError(null);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((response) => {
          if (response.status === 401) {
            return router.push("/login");
          }
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to create payment intent");
          }
        })
        .then((data) => {
          console.log("Payment intent created:", data, data.clientSecret);
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          setError("Failed to create payment intent");
          setLoading(false);
          toast.error("Failed to create payment intent");
        });
    }
  }, [cartProducts]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret ?? undefined,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#000",
        colorBackground: "#fff",
        colorText: "#000",
        fontFamily: "Helvetica Neue, Helvetica, sans-serif",
        fontSizeBase: "16px",
        spacingGridRow: "8px",
      },
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full" id="checkouct client">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"> Loading Checkout</div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-screen">
          <div className="error-message text-rose-500">
            {" "}
            Something went wrong {error}
          </div>
        </div>
      )}
      {paymentSuccess && (
        <div className="flex justify-center flex-col gap-4 items-center h-screen">
          <div className="success-message text-teal-500 text-center">
            {" "}
            Payment Success
          </div>
          <div className="max-w-[2200px] w-full">
            <Button
              label="View your orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
