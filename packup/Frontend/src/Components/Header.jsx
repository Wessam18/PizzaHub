import '../index.css';
import { Link } from "react-router-dom";
import { navData } from "../assets/Data";
import { useState, useRef, useEffect, useContext } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from "react-icons/md";
import { CartContext } from './tools/CartContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from './Context/AuthContext'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const[Loading, setLoading] = useState(false)
  const { cartCount } = useContext(CartContext);
  const { name, isAuth } = useAuth();

  const navigate = useNavigate();

  const link = navData.map(([id, title, url]) => (
    <li className="navlink" key={id} onClick={() => setMenuOpen(false)}>
      <Link to={url} style={{ fontWeight: 'bold', fontSize: '22px' }}>{title}</Link>
    </li>
  ));

  const handleProfileMenuToggle = () => {
    if (isAuth) {
      navigate('/account')
    } else {
      navigate('/signup');
    }
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header fade lg:h-[490px] px-16 py-5 text-white">
      <nav className="flex justify-between items-center text-white pb-8">
        <h1 className="text-4xl mb-auto text-white">PizzaHub</h1>
        <ul className="lg:flex gap-6 text-[18px] hidden">
          <li className="navlink">
            <Link to="/" className="home-link">Home</Link>
          </li>
          {link.slice(1)}
        </ul>
        {/* --------- mobile ----------- */}
        <div className="lg:hidden flex items-center relative">
          <div onClick={handleMenuToggle} className="flex flex-col gap-2 z-50">
            <div className={`${menuOpen && 'absolute top-1 rotate-45'} menubar w-6`}></div>
            <div className={`${menuOpen && 'hidden'} menubar w-4`}></div>
            <div className={`${menuOpen && 'absolute top-1 -rotate-45'} menubar w-6`}></div>
          </div>
          <div onClick={handleProfileMenuToggle}>
            <MdAccountCircle size={32} className="cursor-pointer ml-8 icon" />
          </div>
          <div className="relative ml-4">
            <Link to="cart">
            <FaShoppingCart size={32} className="cursor-pointer icon" />
            </Link>
            {cartCount > 0 && (
              <div className="absolute bottom-0 left-0 bg-orange-600 text-white rounded-full text-xs px-1 py-0.5 text-[10px]">
                {cartCount}
              </div>
            )}
          </div>
          <div ref={mobileMenuRef} className={`dropdown-menu ${menuOpen ? 'w-60% visible' : 'invisible'} transition-all duration-700`}>
            <ul className={`flex flex-col gap-6 text-[18px] bg-primary h-[100vh] ${menuOpen ? 'w-[80%] translate-x-0' : 'translate-x-full'} fixed top-0 bottom-0 right-0 z-20 p-20 ${menuOpen ? 'text-center' : 'text-right'}`}>
              {link}
            </ul>
          </div>
        </div>
        {/* --------- profile icon for desktop ----------- */}
        <div className="hidden lg:flex items-center space-x-4 mb-auto">
          <div onClick={handleProfileMenuToggle} className="flex items-center space-x-2">
          <MdAccountCircle size={32} className="cursor-pointer icon" />
          </div>
          <div className="relative">
            {cartCount > 0 && (
              <div className="absolute bottom-0 left-0 bg-orange-600 text-white rounded-full text-xs px-1 py-0.5 text-[10px]">
                {cartCount}
              </div>
            )}
            <Link to="cart">
            <FaShoppingCart size={32} className="cursor-pointer icon" />
            </Link>

          </div>
</div>
      </nav>
      <div className="flex flex-col text-white items-center h-full">
        <h2 className="text-4xl mb-10 text-animation">Welcome To our PizzaHub</h2>
        <p className="text-center text-[18px] text-animation" style={{ fontSize: '25px', fontWeight: 'bold' }}>
          At PizzaHub, we are the pizza experts on a mission to deliver
          perfection <br /> We do not settle for ordinary. We set the standard
          for extraordinary pizza.
        </p>
        <Link to="/menu">
          <button>View Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
