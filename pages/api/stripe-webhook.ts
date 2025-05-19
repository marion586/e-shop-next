// import { NextApiRequest, NextApiResponse } from "next";
// import { buffer } from "micro";
// import Stripe from "stripe";
// import prisma from "@/libs/prismadb";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-04-30.basil",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const buf = await buffer(req);
//   console.log("Headers:", JSON.stringify(req.headers, null, 2));
//   const sig = req.headers["stripe-signature"];

//   if (!sig) {
//     return res.status(400).send("Missing the stripe signature");
//   }

//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       buf,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error) {
//     return res.status(400).send("Webhook error" + error);
//   }

//   switch (event.type) {
//     case "charge.succeeded":
//       const charge: any = event.data.object as Stripe.Charge;

//       if (typeof charge.payment_method == "string") {
//         await prisma?.order.update({
//           where: {
//             paymentIntentId: charge.payment_intent,
//           },
//           data: { status: "complete", address: charge.shipping?.address },
//         });
//       }
//       break;
//     default:
//       console.log("Unhandled event type", +event.type);
//   }

//   res.json({ received: true });
// }

import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil", // You might want to update this to match "2020-08-27" from your CLI
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("Missing Stripe signature");
    return res.status(400).json({ error: "Missing Stripe signature" });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log(`Webhook received: ${event.type}`);
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);

        try {
          await prisma.order.update({
            where: { paymentIntentId: paymentIntent.id },
            data: { status: "complete" },
          });
          console.log(`Order updated for payment intent: ${paymentIntent.id}`);
        } catch (err) {
          console.error(
            `Error updating order for payment intent ${paymentIntent.id}:`,
            err
          );
          // Don't throw here, just log the error
        }
        break;

      case "charge.succeeded":
        const charge: any = event.data.object as Stripe.Charge;

        // Only try to update if payment_intent exists
        if (typeof charge.payment_intent === "string") {
          try {
            // Check if order exists first
            const order = await prisma.order.findUnique({
              where: { paymentIntentId: charge.payment_intent },
            });

            if (!order) {
              console.log(
                `No order found for payment intent: ${charge.payment_intent}`
              );
              break;
            }

            // Create a properly structured address
            let addressData;
            if (charge.shipping?.address) {
              // Handle each field carefully to avoid undefined errors
              addressData = {
                city: charge.shipping.address.city || "",
                country: charge.shipping.address.country || "",
                line1: charge.shipping.address.line1 || "",
                line2: charge.shipping.address.line2 || null,
                postal_code: charge.shipping.address.postal_code || "",
                state: charge.shipping.address.state || "",
              };
            }

            await prisma.order.update({
              where: { paymentIntentId: charge.payment_intent },
              data: {
                status: "complete",
                ...(addressData ? { address: addressData } : {}),
              },
            });
            console.log(`Successfully updated order for charge: ${charge.id}`);
          } catch (err) {
            console.error(`Error processing charge ${charge.id}:`, err);
            // Don't throw here, just log the error
          }
        } else {
          console.log(`Charge ${charge.id} has no payment_intent string`);
        }
        break;

      case "charge.updated":
        console.log(`Received charge.updated event: ${event.id}`);
        // Handle if needed or just acknowledge
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always return 200 to acknowledge receipt, even if we had internal errors
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    // Return 200 anyway to prevent Stripe from retrying
    return res
      .status(200)
      .json({ received: true, warning: "Processed with errors" });
  }
}
