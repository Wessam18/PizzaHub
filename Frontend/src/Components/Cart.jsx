import { useContext, useEffect, useState } from 'react';
import { CartContext } from './tools/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotalPrice, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const { token } = useAuth(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        console.error('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching cart...');
        const response = await axios.get('http://localhost:5000/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Cart fetched:', response.data);
        
        // Extract the items array from the response
        const { items } = response.data;
        
        if (Array.isArray(items)) {
          setCartItems(items);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCartItems, token]);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, size, newQuantity);
    }
  };
  const handleCheckout = async () => {    
    try {
        const response = await axios.post('http://localhost:5000/cart/items',
            cartItems.map((item) => ({
                itemId: item.id,
                quantity: item.quantity,
                size: item.itemType === 'Pizza' ? item.size : null,
                itemType: item.itemType
            })),
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            console.log('Checkout successful:', response.data);
            navigate('/dashboard'); // Navigate to dashboard on successful checkout
        } else {
            console.error('Checkout failed:', response.data);
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
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
                  {item.itemType === 'Pizza' && item.size && (
                    <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
                    )}
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
            onClick={handleCheckout}
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
// comment