import React from 'react';
import ComingSoon from '../assets/Images/Covers/Comming-Soon.jpg';
import './style/email.css';
import { useNavigate } from 'react-router-dom';

const CommingSoon = () => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/signup');
  };

  return (
    <div className="CommingSoon">
      <img src={ComingSoon} alt="Coming Soon" />
      <button className="back-to-signup" onClick={handleNav}>Back to Sign Up</button>
    </div>
  );
}

export default CommingSoon;
