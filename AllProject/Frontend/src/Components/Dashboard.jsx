import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './tools/CartContext';
import { useAuth } from './Context/AuthContext'; // Import your AuthContext
import axios from 'axios';
const Dashboard = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);
  const { name, token } = useAuth(); // Get user from context
  
  // State to store user information
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  // State to manage confirmation message and errors
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  // Use useEffect to set user name from context when component mounts
  useEffect(() => {
    if (name) {
      setUserInfo((prev) => ({
        ...prev,
        name: name.name || prev.name // Set user name if available
      }));
    }
  }, [name]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      name: userInfo.name ? '' : 'Name is required',
      phone: userInfo.phone ? '' : 'Phone Number is required',
      address: userInfo.address ? '' : 'Address is required'
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };
  
  // Handle form submission
  const navigate = useNavigate()
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Send order data to backend
        const formattedItems = cartItems.map(item => ({
          itemId: item.id,
          title: item.title, // Add title here
          size: item.itemType === 'Pizza' ? item.size : null,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity
        }));
        const response = await axios.post(
          'http://localhost:5000/confirm/order',
          {
            name: userInfo.name,
            email: name,
            phone: userInfo.phone,
            address: userInfo.address,
            items: formattedItems
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status === 200) {
          navigate('/successOrder'); // Correct usage of navigate
          setTimeout(() => {
            navigate('/'); // Navigate to home after 3 seconds
          }, 3000);
        }
        setOrderConfirmed(true);
        setUserInfo({
          name: '',
          phone: '',
          address: ''
        });
      } catch (error) {
        console.error('Failed to confirm order:', error);
        // Handle error
      }
    }
  };

  return (
    <div className="flex flex-col items-center lg:mx-40 m-[20px] py-20">
      <h2 className="title-dash text-4xl font-semibold mb-20">Order Summary</h2>

      {/* User Information Form */}
      <div className="w-full max-w-md mb-10">
        <form onSubmit={handleConfirmOrder} className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div className="mb-4">
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
          </div>
        </form>

        {/* Confirmation Message */}
        {orderConfirmed && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            Your order has been confirmed and is starting its preparation journey!
          </div>
        )}
      </div>

      {/* Order Summary Table */}
      <div className="overflow-x-auto w-full mb-10">
        <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left border-b border-gray-300">Product Name</th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left border-b border-gray-300">Size</th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left border-b border-gray-300">Price/one</th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left border-b border-gray-300">Quantity</th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left border-b border-gray-300">Total Price</th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 text-left border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={`${item.id}-${item.size}`} className="table-row relative hover:bg-gray-100">
                <td className="py-4 px-6 border-b border-gray-300">{item.title}</td>
                <td className="py-4 px-6 border-b border-gray-300">{item.size}</td>
                <td className="py-4 px-6 border-b border-gray-300">${item.price.toFixed(2)}</td>
                <td className="py-4 px-6 border-b border-gray-300">{item.quantity}</td>
                <td className="py-4 px-6 border-b border-gray-300">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="py-4 px-6 border-b border-gray-300 relative">
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="py-3 px-6 text-right font-bold border-t border-gray-300">Total:</td>
              <td className="py-3 px-6 font-bold border-t border-gray-300">${cartTotalPrice.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Confirm Order Button */}
      <div className="w-full max-w-md">
        <button
          onClick={handleConfirmOrder}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors duration-300 ease-in-out">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
