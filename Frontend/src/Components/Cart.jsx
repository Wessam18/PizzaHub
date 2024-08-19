import { useContext } from 'react';
import { CartContext } from './tools/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, size, newQuantity);
    }
  };

  return (
    <div className="flex flex-col items-center lg:mx-40 m-[20px] py-20">
      <h2 className="text-4xl title-custom font-semibold mb-20">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="hover:shadow-lg transition-all duration-700 lg:p-5 p-[20px] w-[100%] rounded-3xl bg-white shadow-lg"
            >
              <div className="flex justify-between items-center py-4 border-b">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{item.title || 'Title missing'}</p>
                  <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
                    >
                      -
                    </button>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm">Price per item: ${(item.price).toFixed(2)}</p>
                  <p className="text-sm font-semibold">Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="bg-transparent text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-center mt-10">
          <span className="font-bold">Total Price: ${cartTotalPrice.toFixed(2)}</span>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-10 py-3 bg-gradient-to-r from-orange to-red-500 text-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
