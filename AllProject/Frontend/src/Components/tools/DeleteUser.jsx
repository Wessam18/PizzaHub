import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/users');
      })
      .catch(error => {
        setLoading(false);
        setError('Failed to delete user.');
        console.error(error);
      });
  };

  const handleCancel = () => navigate('/users');

  return (
    <div>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this user?</p>
      <button onClick={handleDelete} disabled={loading}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserDelete;
