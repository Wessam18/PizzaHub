import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
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
import UserAPI from "./Components/UserAPI";
import CreateUser from './Components/tools/CreateUser';
import ShowUser from './Components/tools/ShowUser';
import DeleteUser from './Components/tools/DeleteUser';
import Account from './Components/Account';
import Test from "./Components/test"
import AuthProvider from "./Components/Context/AuthProvider";
import LoginCallback from "./Components/LoginCallBack";

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chooseus" element={<ChooseUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizzas" element={<Pizzas />} />
          <Route path="appetizers" element={<Appetizers />} />
          <Route path="drinks" element={<Drinks />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="test/:id" element={<Test />} />
          <Route path="account"element={<Account />}/>
          <Route path="userapi" element={<UserAPI />} /> {/* Admin Only */}
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/details/:id" element={<ShowUser />} />
          <Route path="users/delete/:id" element={<DeleteUser />} />
          <Route path="/auth/callback" element={<LoginCallback />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
