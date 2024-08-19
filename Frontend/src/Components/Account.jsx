import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './tools/Spinner'; // Assuming you have a Spinner component
import { useNavigate } from 'react-router-dom';
import './style/Account.css';
import { useAuth } from './Context/AuthContext';

const Account = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const { token, Login, Logout, isAuth } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/account', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err.response?.data || err.message);
        const errorMessage = err.response?.data?.message || 'Failed to fetch user data';
        setError(errorMessage);
        setLoading(false);
      }
    };
  
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdateData = async () => {
    try {
      const response = await axios.put('http://localhost:5000/users/account', {
        name: formValues.name || undefined,
        email: formValues.email || undefined,
        phoneNumber: formValues.phone || undefined,
        currentPassword: formValues.currentPassword || undefined,
        newPassword: formValues.newPassword || undefined,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Response:', response.data);
  
      if (response.status === 200) {
        const updatedUser = response.data.user;
        const newToken = response.data.token;
        if (newToken) {
          Login(updatedUser.email, newToken);
          setSuccessMessage('Profile updated successfully');
          setTimeout(() => setSuccessMessage(''), 5000);
          setFormValues({
            name: '',
            email: '',
            phone: '',
            currentPassword: '',
            newPassword: '',
          });
        } else {
          console.error('No token returned from server');
          setError('Failed to update profile');
          setTimeout(() => setError(''), 5000);
        }
      }
    } catch (err) {
      console.error('Error updating data:', err);
      const errorMessage = err.response?.data?.message || 'An error occurred while updating settings';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleConfirm = (actionType) => {
    setAction(actionType);
    setShowConfirmDialog(true);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleLogout = async () => {
    Logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/users/account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Logout();
      navigate('/')
    } catch (err) {
      alert('Failed to delete account');
    }
  };

  return (
    <div className="account-page">
      <div className="container">
        <h2>Account Settings</h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {data && (
              <>
                <div className="account-details">
                  <h3 className="text-center">Account Details</h3>
                  <p><span>Name:</span> {data.name}</p>
                  <p><span>Email:</span> {data.email}</p>
                  <p><span>Phone:</span> {data.phoneNumber}</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleUpdateData(); }}>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder="Update Your Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="Update Your Email"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    pattern="^\+20\d{10}$"
                    title="Phone Number Should Start With +20 Then 10 Numbers Exactly"
                    placeholder="Update Your Phone Number"
                  />
                  <input
                    type="password"
                    name="currentPassword"
                    value={formValues.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter Your Current Password"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={formValues.newPassword}
                    onChange={handleInputChange}
                    pattern="(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&*]).{10,}$"
                    title="Minimum ten characters, at least one letter, one number and one special character:[#?!@$&*]"
                    placeholder="Update Your New Password"
                  />
                  <button type="submit">Save</button>
                </form>
              </>
            )}

            <div className="button-container">
              <button className="logout-button" onClick={() => handleConfirm('logout')}>Logout</button>
              <button className="delete-button" onClick={() => handleConfirm('delete')}>Delete Account</button>
            </div>
          </>
        )}

        {showConfirmDialog && (
          <div className={`confirm-dialog ${showConfirmDialog ? 'active' : ''}`}>
            <div className="confirm-box">
              <p>Are you sure you want to {action}?</p>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={action === 'delete' ? handleDeleteAccount : handleLogout}>Confirm</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
