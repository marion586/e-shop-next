"use client";

interface ListRatingProps {
  product: any;
}

import Heading from "@/app/component/Heading";
import Horizontal from "@/app/component/Horizontal";
import { Avatar, Rating } from "@mui/material";
import moment from "moment";
import React from "react";

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product review" />

      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div
                key={review.id}
                className="max-w-[300px] flex flex-col gap-2 "
              >
                <div className="flex gap-2 items-center">
                  <Avatar src={review.user.image} />

                  <div className="font-semibold">{review?.user.name}</div>

                  <div className="font-light">
                    {" "}
                    {moment(review.createdDate).fromNow()}{" "}
                  </div>
                </div>

                <div className="mt-2">
                  <Rating
                    readOnly
                    value={review.rating}
                    precision={0.5}
                    size="small"
                  />

                  <div>
                    <span className="ml-2 text-slate-500 font-light">
                      {review.comment}
                    </span>

                    <Horizontal width="full" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
