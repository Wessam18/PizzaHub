import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import ChooseUs from "./Components/ChooseUs";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Menu from "./Components/Menu";
import Signup from "./Components/Signup";
import Cart from "./Components/Cart";
import Pizzas from "./Components/Pizzas";
import Appetizers from "./Components/Appetizers";
import Drinks from "./Components/Drinks";
import Dashboard from "./Components/Dashboard";
import Account from './Components/Account';
import AuthProvider from "./Components/Context/AuthProvider";
//import ProtectedRoutes from "./Components/Context/ProtectedRoutes";
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chooseus" element={<ChooseUs />} />
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="signup" element={<Signup />} />
          <Route path="pizzas" element={<Pizzas />} />
          <Route path="appetizers" element={<Appetizers />} />
          <Route path="drinks" element={<Drinks />} />
          <Route path="account"element={<Account />}/>
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="dashboard" element={<Dashboard />} />          
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
