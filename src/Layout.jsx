import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/home_component/Header/Navbar';
import Footer from './components/home_component/Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-dashboard');
  const isLogin = location.pathname.startsWith('/login');

  return (
    <>
      {!isAdminRoute && !isLogin && <Navbar />}
      <div className=' w-full'>{children}</div>
      {!isAdminRoute && !isLogin && <Footer />}
    </>
  );
};

export default Layout;
