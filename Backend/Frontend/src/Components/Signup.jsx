import './style/Signup.css';
import React, { useEffect, useRef, useState } from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './tools/Spinner';
import { useAuth } from './Context/AuthContext';
const Signup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
    const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const {Login} = useAuth();
  const {isAuth} = useAuth();
  const [resendTimer, setResendTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const registerBtn = registerBtnRef.current;
    const loginBtn = loginBtnRef.current;

    const handleRegisterClick = () => {
      container.classList.add('active');
    };

    const handleLoginClick = () => {
      container.classList.remove('active');
    };

    registerBtn.addEventListener('click', handleRegisterClick);
    loginBtn.addEventListener('click', handleLoginClick);

    return () => {
      registerBtn.removeEventListener('click', handleRegisterClick);
      loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, []),
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const resendVerificationEmail = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/users/resend-verification-email', { email });
      return response.data;
    } catch (error) {
      console.error('Error resending verification email:', error);
      return { data: "Server error", statusCode: 500 };
    }
  };


  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
  
    if (event.target.checkValidity()) {
      setLoading(true);
  
      const data = {
        name,
        email,
        phoneNumber,
        password,
      };

      try {
        const response = await axios.post('http://localhost:5000/users/signup', data);
        if (response.status === 200) {
          setIsAuthenticated(true);
          setMessageType('success');
          setMessage('Account created successfully! Please check your email to verify your account.');
          setLoading(false);
          setShowResendButton(true);
          setResendVisible(true);
          loginBtnRef.current.click();
          const token = await response.data;
          if(!token) {
            setMessageType('error');
            setMessage("Error")
          }else {
            Login(email, token)
          }
        }
      } catch (error) {
        setLoading(false);
  
        if (error.response) {
          if (error.response.status === 400) {
            if (error.response.data === "Email Already Exists!") {
              setMessageType('error');
              setMessage('Email Already Exists!');
            } else if (error.response.data === "Phone Number Already Exists!") {
              setMessageType('error');
              setMessage('Phone Number Already Exists!');
            } else {
              setMessageType('error');
              setMessage('Error during creating new user. Please try again later.');
            }
          } else if (error.response.status === 500) {
            setMessageType('error');
            setMessage('Server error occurred. Please try again later.');
          } else {
            setMessageType('error');
            setMessage('An unexpected error occurred. Please try again later.');
          }
        } else {
          setMessageType('error');
          setMessage('An unexpected error occurred. Please check your connection and try again.');
        }
        
      } finally {
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      }
    }
  }
  const handleResendClick = async () => {
    setResendTimer(30);
    setIsResendDisabled(true);

    const result = await resendVerificationEmail(email);

    if (result.statusCode !== 200) {
      setMessage(result.data);
      setMessageType('error');
    } else {
      setMessage(result.data);
      setMessageType('success');
    }

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      setLoading(true);
      const data = {
        email,
        password,
      };
  
      try {
        const response = await axios.post('http://localhost:5000/users/signin', data);        
        if (response.status === 200) {
          const token = response.data;
          
          if (token) {
            setIsAuthenticated(true);
            setMessageType('success');
            setMessage("Login successful!");
            navigate('/menu');
            Login(email, token);
          } else {
            setShowResendButton(true);
            setMessageType('error');
            setMessage("Token not received. Please try again.");
        }
       } else if (response.status === 403) {
        setMessageType('error');
        setMessage("Please verify your email before logging in.");
        
        } else {
          console.error('Unexpected response status:', response.status);
          setMessageType('error');
          setMessage('Login failed. Please check your credentials.');
          setShowResendButton(true);
          setResendVisible(true);
        }
      } catch (error) {
        setMessageType('error');
        setShowResendButton(true);
        setResendVisible(true);
        console.error('Error during login:', error);
        setMessage('Login failed. Please check your credentials.');
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
    <div className="signup-page">
      <div className="Container" id="Container" ref={containerRef}>

        <div className="Form-Container SignUp">
          <form onSubmit={handleSignUpSubmit}>
            <h2>Create Account</h2>
            {loading && <Spinner />}
            <div className="Social-icons">
            <Link to="/CommingSoon" className="icon" id="SigninDiv">
            <FaGoogle className="google-icon" />
            </Link>
              <Link to="/CommingSoon" className="icon">
                <FaFacebook />
              </Link>
              <Link to="/CommingSoon" className="icon">
                <FaTwitter />
              </Link>
            </div>
            <span>Or Use Your Email For Registration</span>
            {message && (
              <p className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
                {message}
                </p>
              )}
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name" 
              required 
              pattern="[A-Za-z]{1,15}" 
              title="Name should be between 1 and 15 alphabetic characters."
            />
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" 
              required 
            />
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number" 
              pattern="^\+20\d{10}$"
              title="Phone Number Should Start With +20 Then 10 Numbers Exactly"
              required 
            />
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              required 
              pattern="(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&*]).{10,}$" 
              title="Minimum ten characters, at least one letter, one number and one special character:[#?!@$&*]"
            />
            <button type="submit" disabled={loading}>Sign Up</button>
          </form>
        </div>
        <div className="Form-Container Signin">
          <form onSubmit={handleSignInSubmit}>
            <h2>Sign In</h2>
            {loading && <Spinner />}
            <div className="Social-icons">
              <Link to="/CommingSoon" className="icon">
                <FaGoogle />
              </Link>
              <Link to="/CommingSoon" className="icon">
                <FaFacebook />
              </Link>
              <Link to="/CommingSoon" className="icon">
                <FaTwitter />
              </Link>
            </div>
            <span>Or Use Your Email & Password</span>
            {message && (
              <p className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
                {message}
                </p>
              )}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password"
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <Link to="/ForgotPassword">Forget Your Password?</Link>
            {showResendButton && (
        <button
          type="button"
          onClick={handleResendClick}
          className="Resend"
          disabled={isResendDisabled}
        >
          {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend'}
        </button>
      )}
            <button type="submit" disabled={loading}>Sign In</button>
          </form>
        </div>
        <div className="Toggle-Container">
          <div className="Toggle">
            <div className="Toggle-Panel Toggle-Left">
              <h2>Welcome Back!</h2>
              <p>Enter Your Personal Details To Use All Of Site Features</p>
              <button ref={loginBtnRef}>Sign In</button>
            </div>
            <div className="Toggle-Panel Toggle-Right">
              <h2>Welcome To PizzaHub!</h2>
              <p>Register With Your Personal Details To Use All Of Site Features</p>
              <button ref={registerBtnRef}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
