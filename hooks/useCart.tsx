import { useContext, useState } from "react";
import { createContext } from "react";

type CartContextType = {
  cartTotalQty: number;
};

export const CartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
  [propName: string]: any;
}

export const cartContextProvider = (props: CartContextProviderProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);

  const value = {
    cartTotalQty,
  };

  return <CartContext.Provider value={{ cartTotalQty }} {...props} />;
};
