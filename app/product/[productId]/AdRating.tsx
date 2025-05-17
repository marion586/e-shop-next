import { SafeUser } from "@/types";
import { Order, Product, Review } from "@prisma/client";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

import React from "react";

const AdRating = () => {
  return <div></div>;
};

export default AdRating;
