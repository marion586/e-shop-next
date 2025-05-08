import React from "react";
import Container from "../component/Container";
import CartClient from "./CartClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Cart = async () => {
  const currentUser = (await getCurrentUser()) ?? null;
  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Cart;
