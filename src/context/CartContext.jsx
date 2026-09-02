import React, {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // ================= CART =================

  const addToCart = (product) => {
    if (!product) return;

    setCartItems((prev) => {
      const exists = prev.find(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Math.max(
                1,
                (item.quantity || 1) - 1
              ),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // ================= WISHLIST =================

  const addToWishlist = (product) => {
    if (!product) return;

    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) return prev;

      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const toggleWishlist = (product) => {
    if (!product) return;

    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) {
        return prev.filter(
          (item) => String(item.id) !== String(product.id)
        );
      }

      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,

        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}