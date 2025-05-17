import prisma from "@/libs/prismadb";
interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productId } = params;
    const product = await prisma.product.findUnique({
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
      where: {
        id: productId,
      },
    });

    if (!product) return null;
    return product;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
