import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // ================= CART =================

  const [cartItems, setCartItems] = useState(() => {

    const savedCart =
      localStorage.getItem("cartItems");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });


  // ================= WISHLIST =================

  const [wishlistItems, setWishlistItems] =
    useState(() => {

      const savedWishlist =
        localStorage.getItem("wishlistItems");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

    });


  // ================= SAVE CART =================

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);


  // ================= SAVE WISHLIST =================

  useEffect(() => {

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);


  // ================= ADD TO CART =================

  const addToCart = (product) => {

    setCartItems((previousItems) => {

      const existingProduct =
        previousItems.find(
          (item) =>
            String(item.id) ===
            String(product.id)
        );


      // Product already exists

      if (existingProduct) {

        return previousItems.map(
          (item) =>
            String(item.id) ===
            String(product.id)
              ? {
                  ...item,
                  quantity:
                    (item.quantity || 1) + 1,
                }
              : item
        );

      }


      // Add new product

      return [

        ...previousItems,

        {
          ...product,
          quantity: 1,
        },

      ];

    });

  };


  // ================= REMOVE FROM CART =================

  const removeFromCart = (id) => {

    setCartItems((previousItems) =>

      previousItems.filter(
        (item) =>
          String(item.id) !==
          String(id)
      )

    );

  };


  // ================= INCREASE QUANTITY =================

  const increaseQuantity = (id) => {

    setCartItems((previousItems) =>

      previousItems.map(
        (item) =>

          String(item.id) ===
          String(id)

            ? {
                ...item,

                quantity:
                  (item.quantity || 1) + 1,
              }

            : item

      )

    );

  };


  // ================= DECREASE QUANTITY =================

  const decreaseQuantity = (id) => {

    setCartItems((previousItems) =>

      previousItems

        .map(
          (item) =>

            String(item.id) ===
            String(id)

              ? {

                  ...item,

                  quantity:
                    (item.quantity || 1) - 1,

                }

              : item

        )

        .filter(
          (item) =>
            item.quantity > 0
        )

    );

  };


  // ================= TOGGLE WISHLIST =================

  const toggleWishlist = (product) => {

    setWishlistItems((previousItems) => {

      const alreadyExists =
        previousItems.some(
          (item) =>
            String(item.id) ===
            String(product.id)
        );


      // Remove from wishlist

      if (alreadyExists) {

        return previousItems.filter(
          (item) =>
            String(item.id) !==
            String(product.id)
        );

      }


      // Add to wishlist

      return [

        ...previousItems,

        product,

      ];

    });

  };


  // ================= CLEAR CART =================

  const clearCart = () => {

    setCartItems([]);

  };


  // ================= CONTEXT PROVIDER =================

  return (

    <CartContext.Provider
      value={{

        // CART

        cartItems,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,


        // WISHLIST

        wishlistItems,

        toggleWishlist,

      }}
    >

      {children}

    </CartContext.Provider>

  );

};


export const useCart = () => {

  return useContext(CartContext);

};