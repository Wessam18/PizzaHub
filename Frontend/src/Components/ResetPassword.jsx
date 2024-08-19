import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const  {id, token} = useParams()
  const validatePassword = (password) => {
    const pattern = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&*]).{10,}$/;
    if (!pattern.test(password)) {
      return 'Password must be at least 10 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
    return '';
  };

  const handleForgetPassword = async (event) => {
    event.preventDefault();
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    setLoading(true);
    const data = { password };

    try {
      const response = await axios.post(`http://localhost:5000/users/ResetPassword/${id}/${token}`, data);
      console.log('Response:', response);

      if (response.status === 200) {
        console.log('Password reset successful:', response.data);
        setMessageType('success');
        setMessage('Password reset link has been sent to your email!');
        navigate('/success');
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
        setPasswordError('');
      }, 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleForgetPassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value));
              }}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
            />
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Update'}
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

export default ResetPassword;
