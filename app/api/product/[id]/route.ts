import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role != "ADMIN") {
    return NextResponse.error();
  }
  const product = await prisma?.product.delete({
    where: { id: params.id },
  });
  return NextResponse.json(product, {
    status: 201,
    statusText: "Created",
  });
}
