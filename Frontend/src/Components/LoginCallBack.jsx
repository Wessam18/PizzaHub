import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

const LoginCallback = () => {
  const { Login } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        if (token && email) {
          const response = await axios.post('http://localhost:5000/users/signin', { token, email });

          if (response.status === 200) {
            const { token: apiToken } = response.data;
            if (apiToken) {
              Login(email, apiToken); // Update auth context with token
              setMessageType('success');
              setMessage('Login successful!');
              navigate('/menu'); // Redirect to the menu page
            } else {
              setMessageType('error');
              setMessage('Token not received. Please try again.');
            }
          } else {
            setMessageType('error');
            setMessage('Login failed. Please try again.');
          }
        } else {
          setMessageType('error');
          setMessage('Token or email is missing.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setMessageType('error');
        setMessage('An error occurred. Please try again.');
      }
    };

    handleLogin();
  }, [Login, navigate]);

  return (
    <div>
      <h1>Logging in...</h1>
      {message && <p className={messageType}>{message}</p>}
    </div>
  );
};

export default LoginCallback;
