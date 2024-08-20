import './style/Footer.css'
import '../../src/index.css'
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="custom-bg text-white lg:px-40 p-4">
        <div className="flex justify-center mb-4">
          <p className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <FaFacebook />
          </p>
          <p className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <FaGoogle />
          </p>
          <p className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <FaTwitter />
          </p>
          <p className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <FaInstagramSquare />
          </p>
          <p className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <FaLinkedin />
          </p>
          <p className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <FaGithub />
          </p>
        </div>
        <p className="text-center">&copy; PizzaHub {new Date().getFullYear()}</p>
      </footer>
    );
  };
  
  export default Footer;
