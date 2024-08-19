import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './Context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
//   const [name, Login] = useAuth();
  const navigate = useNavigate();

  const handleForgetPassword = async (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      setLoading(true);
      const data = { email };

      try {
        const response = await axios.post('http://localhost:5000/users/ForgotPassword', data);
        console.log('Response:', response);

        if (response.status === 200) {
          setMessageType('success');
          setMessage('Password reset link has been sent to your email!');
          setTimeout(() => {
            navigate('/signup');
          }, 5000);
        } else {
          setMessageType('error');
          setMessage('An error occurred. Please try again.');
        }
      } catch (error) {
        setMessageType('error');
        console.error('Error during password reset:', error);
        setMessage('An error occurred. Please try again.');
      } finally {
        setLoading(false);
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      }
    } else {
      console.error('Form validation failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleForgetPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
