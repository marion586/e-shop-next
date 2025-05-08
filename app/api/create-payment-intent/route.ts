import Stripe from "stripe";

import prisma from "@/libs/prismadb";

import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  let totalPrice = items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal;
  }, 0);
  const price: any = Math.floor(totalPrice);
  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: {
      connect: {
        id: currentUser.id,
      },
    },
    amount: total,
    currency: "usd",
    status: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
    deliveryStatus: "pending",
  };
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id.id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id.id,
        {
          amount: total,
        }
      );

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentId: payment_intent_id.id,
          },
        }),
        prisma.order.update({
          where: {
            paymentIntentId: payment_intent_id.id,
          },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return NextResponse.json({
        paymentIntent: updated_intent,
      });
    }
  } else {
    //create the intent
    console.log("creating new payment intent", payment_intent_id);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      orderData.paymentIntentId = paymentIntent.id;

      //create the order
      await prisma.order.create({
        data: orderData,
      });
      return NextResponse.json({
        paymentIntent,
      });
    } catch (error) {
      console.log("error creating payment intent", error);
      return NextResponse.json(
        { error: "Failed to create payment intent" },
        { status: 500 }
      );
    }
  }
}
