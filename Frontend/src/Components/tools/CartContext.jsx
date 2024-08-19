import { createContext, useState } from 'react';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === item.id && prevItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        console.log(item); // Add this in your Cart component to see the structure of item

        return [...prevItems, { ...item, title: item.title }];
      }
    });
  };

  const updateQuantity = (id, size, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === itemId && item.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
