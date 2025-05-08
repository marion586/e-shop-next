import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { useCallback, useContext, useState } from "react";
import { createContext, useEffect } from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  handleSetPaymentIntent: (paymentIntent: string | null) => void;

  paymentIntent: string | null;
};

export const CartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
  [propName: string]: any;
}

export const CartContextProvider = (props: CartContextProviderProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);
  const [cartTotalAmount, setCartTotalAmout] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");

    const paymentIntent = JSON.parse(eShopPaymentIntent);
    if (paymentIntent) {
      setPaymentIntent(paymentIntent);
    }
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc: { total: number; qty: number }, item: CartProductType) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmout(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  console.log("user cart qty adn subtotal", cartTotalQty, cartTotalAmount);
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product added to cart", { id: "add-to-cart" });
      console.log("product added");
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredProducts);
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
        toast.success("Product removed from cart");
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Maximum quantity reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex !== -1) {
          updatedCart[existingIndex].quantity += 1;
          setCartProducts(updatedCart);
          localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
        }
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Minimum quantity reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex !== -1) {
          updatedCart[existingIndex].quantity -= 1;
          setCartProducts(updatedCart);
          localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback((paymentIntent: string | null) => {
    setPaymentIntent(paymentIntent);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(paymentIntent));
  }, []);

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    cartTotalAmount,
    handleSetPaymentIntent,
    paymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
