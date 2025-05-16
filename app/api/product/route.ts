import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { description, price, brand, category, inStock, name, images } = body;

  const product = await prisma.product.create({
    data: {
      description,
      name,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
    } as any,
  });
  return NextResponse.json(product, {
    status: 201,
    statusText: "Created",
  });
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();

  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: { inStock },
  });
  return NextResponse.json(product, {
    status: 201,
    statusText: "Created",
  });
}
