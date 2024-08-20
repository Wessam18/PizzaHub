import { createContext, useState } from 'react';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item type is 'Drink' or 'Appetizer' and exclude size if so
      const isDrinkOrAppetizer = item.itemType === 'Drink' || item.itemType === 'Appetizer';
      const itemToAdd = isDrinkOrAppetizer
        ? { ...item, title: item.title || 'Default Title', size: undefined } // Remove size
        : { ...item, title: item.title || 'Default Title' }; // Keep size

      const existingItemIndex = prevItems.findIndex(
        (prevItem) =>
          prevItem.id === item.id &&
          prevItem.size === item.size &&
          prevItem.itemType === item.itemType
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        return [...prevItems, itemToAdd];
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
