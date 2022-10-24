import './App.css';
import { useEffect, useState} from 'react';
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import LandingPage from './LandingPage';
import Dashbord from './dashbord/Dashbord';
import Login from './Login';
import Register from './Register';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthService from './services/Auth-service';
import Product from './components/Product';
import PaymentConfirmation from './dashbord/user/PaymentConfirmation';
import ViewProduct from './components/ViewProduct';
import { DataProvider } from './helpers/MyContext';
import Category from './components/Category';
import Contact from './components/Contact';
import Basket from './components/Basket';
import Watch from './components/Watch';
import SCategory from './components/SCategory';

function App() {

  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const currentLogin = () => {
    const token = localStorage.accessToken;
    const isMyTokenExpired = isExpired(token);
    
    if(isMyTokenExpired){
      setUser(null);
      setIsLogin(false);
      AuthService.logout();
    }else{
      const localUser = AuthService.getCurrentUser();
      setUser(localUser);
      setIsLogin(true);
    }

  };

  useEffect(() => {
    async function asyncCall() {
      currentLogin();
    }
    asyncCall();
  }, [location.pathname]);

  return (
    <>
    <DataProvider>
    <Header isLogin={isLogin} user={user} />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/s-category/:id" element={<SCategory />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/basket" element={<Basket />} />
        <Route exact path="/watch" element={<Watch />} />
        <Route exact path="/product/:id" element={<ViewProduct />} />
        <Route path="/pay" element={<PaymentConfirmation />} />
        {isLogin && <Route exact path="/dash/*" element={<Dashbord user={user}/>} />}
        {!isLogin &&<Route exact path="/login" element={<Login />} />}
        {!isLogin &&<Route exact path="/register" element={<Register />} />}
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </DataProvider>
      
      
    </>
  );
}

export default App;
