export const productRating = (data: any) => {
  const productRating =
    data.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / data.reviews.length;

  return productRating;
};
